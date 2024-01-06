import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/react-hooks'
import { UnwoundQuery, UNWOUND_QUERY } from 'Unwound/graphql'
import { useUserContext } from 'Context'
import { TeamQuery, TEAM_QUERY } from 'Library/SongDetails/graphql'
import { Box, Flex, Text } from 'rebass'
import { Input, Label, Select } from '@rebass/forms'
import { setString, setNumber, setNumberNull, setStringNull } from 'lib/setters'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useDebounce } from 'use-debounce/lib'

const Unwound: React.FC = () => {
  const defaultUnwound = {
    songPlays: [],
    songPlaysOverTime: [],
    teamApprovals: [],
    teamPlays: [],
    topApprovals: [],
    topPlays: [],
    topPlaysOverTime: [],
  }
  const [unwoundData, setUnwoundData] = useState<UnwoundQuery['data']['unwound']>(defaultUnwound)
  const [loadUnwoundData] = useLazyQuery<UnwoundQuery['data'], UnwoundQuery['vars']>(
    UNWOUND_QUERY,
    { fetchPolicy: 'network-only', onCompleted: data => setUnwoundData(data.unwound) },
  )

  const { activeTeam } = useUserContext()
  const { data: teamData } = useQuery<TeamQuery['data'], TeamQuery['vars']>(TEAM_QUERY, {
    fetchPolicy: 'network-only',
    variables: { id: activeTeam.id }
  })

  const [year, setYear] = useState<number | null>(2023)
  const [teamId, setTeamId] = useState(activeTeam.id)
  const [songName, setSongName] = useState<string | null>(null)
  const [week, setWeek] = useState<number | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  const teamMemberOptions = teamData?.team.users?.map(teamMember => (
    <option key={teamMember.id} value={teamMember.id}>
      {teamMember.name}
    </option>
  ))

  const [debouncedSongName] = useDebounce(songName, 500)

  useEffect(() => {
    loadUnwoundData({ variables: { year, teamId, songName: debouncedSongName, week, userId } })
  }, [activeTeam, year, teamId, debouncedSongName, week, userId])

  const data: any[] = []
  unwoundData.topPlaysOverTime.forEach(playOverTime => {
    playOverTime.plays.forEach(play => {
      let datum = data.find(d => d.name === play.label)
      if(datum === undefined) {
        data.push({ name: play.label, [playOverTime.label]: play.count })
      } else {
        datum[playOverTime.label] = play.count
      }
    })
  })

  const songData: any[] = []
  unwoundData.songPlaysOverTime.forEach(playOverTime => {
    playOverTime.plays.forEach(play => {
      let datum = songData.find(d => d.name === play.label)
      if(datum === undefined) {
        songData.push({ name: play.label, [playOverTime.label]: play.count })
      } else {
        datum[playOverTime.label] = play.count
      }
    })
  })

  return (
    <Flex flexDirection="column" width={1}>
      <Flex justifyContent="space-between" width={1}>
        <Box width={1/3} pr={4}>
          <Label>Year</Label>
          <Input
            type="text"
            value={year || ''}
            onChange={setNumberNull(setYear)}
            placeholder="Four digit year"
            sx={{
              bg: 'accent',
              boxShadow: 'none',
            }}
            mb={2}
          />
          <Label>Week Number</Label>
          <Input
            type="text"
            value={week || ''}
            onChange={setNumberNull(setWeek)}
            placeholder="Week number 1 - 53"
            sx={{
              bg: 'accent',
              boxShadow: 'none',
            }}
            mb={2}
          />
          <Label>User</Label>
          <Select
            id="team-members"
            name="team members"
            defaultValue="select-team-member"
            onChange={setStringNull(setUserId)}
            sx={{ fontSize: 2 }}
          >
            <option id="" value="">Whole team</option>
            {teamMemberOptions}
          </Select>
        </Box>
        <Box width={1/3}>
          <Flex flexDirection="column">
            <Text fontSize={4} mb={2}>Plays</Text>
            {
              unwoundData.teamPlays.map(play => <Text>
                {play.label} - {play.count} ({play.length} minutes)
              </Text>)
            }
          </Flex>
        </Box>
        <Box width={1/3}>
          <Flex flexDirection="column">
            <Text fontSize={4} mb={2}>Approval</Text>
            {
              unwoundData.teamApprovals.map(play => <Text>
                {play.label} - {play.count} given ({play.length} received)
              </Text>)
            }
          </Flex>
        </Box>
      </Flex>
      <Flex width={1} mt={4}>
        <ResponsiveContainer width="100%" aspect={1}>
          <LineChart data={data}>
            {unwoundData.topPlaysOverTime.map(playOverTime => {
              return <Line type="monotone" dataKey={playOverTime.label} stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
            })}

            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip filterNull={true} />
          </LineChart>
        </ResponsiveContainer>
      </Flex>
      <Flex justifyContent="space-between" width={1} mt={4}>
        <Box width={1/2}>
          <Flex flexDirection="column">
            <Text fontSize={4} mb={2}>Top Plays</Text>
            {
              unwoundData.topPlays.map(play => <Flex alignItems='center' mb={2}>
                <Box fontSize={6} sx={{ bg: 'accent', boxShadow: 'none', fontFamily: 'monospace' }} p={2} mr={2}>{play.count}</Box>
                <Box>{play.label}</Box>
              </Flex>)
            }
          </Flex>
        </Box>
        <Box width={1/2}>
          <Flex flexDirection="column">
            <Text fontSize={4} mb={2}>Top Approvals</Text>
            {
              unwoundData.topApprovals.map(play => <Flex alignItems='center' mb={2}>
                <Box fontSize={6} sx={{ bg: 'accent', boxShadow: 'none', fontFamily: 'monospace' }} p={2} mr={2}>{play.count}</Box>
                <Box>{play.label}</Box>
              </Flex>)
            }
          </Flex>
        </Box>
      </Flex>
      <Flex width={1} mt={4}>
        <Box width={1}>
          <Label>Song Search</Label>
          <Input
            type="text"
            value={songName || ''}
            onChange={setStringNull(setSongName)}
            placeholder='Like "Jai Wolf"'
            sx={{
              bg: 'accent',
              boxShadow: 'none',
            }}
            mb={2}
            width={1}
          />
        </Box>
      </Flex>
      <Flex width={1} mt={4} flexDirection="column">
        <Text fontSize={4} mb={2}>Plays</Text>
        {
          unwoundData.songPlays.map(play => <Flex alignItems='center' mb={2}>
            <Box fontSize={6} sx={{ bg: 'accent', boxShadow: 'none', fontFamily: 'monospace' }} p={2} mr={2}>{play.count}</Box>
            <Box>{play.label}</Box>
          </Flex>)
        }
      </Flex>
      <Flex width={1} mt={4}>
        <ResponsiveContainer width="100%" aspect={1}>
          <LineChart data={songData}>
            {unwoundData.songPlaysOverTime.map(playOverTime => {
              return <Line type="monotone" dataKey={playOverTime.label} stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
            })}

            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip filterNull={true} />
          </LineChart>
        </ResponsiveContainer>
      </Flex>
    </Flex>
  )
}

export default Unwound
