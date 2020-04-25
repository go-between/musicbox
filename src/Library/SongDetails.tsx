import React, { useEffect, useState } from 'react'
import { Box, Button, Flex, Link, Text } from 'rebass'
import { Label, Select } from '@rebass/forms'
import { useLazyQuery, useQuery, useMutation } from '@apollo/react-hooks'

import { useUserContext } from 'Context'
import { RecommendationCreate, RECOMMENDATION_CREATE, SongQuery, SONG_QUERY, TeamQuery, TEAM_QUERY } from './graphql'
import { useSearchContext } from './SearchContextProvider'

const SongDetails: React.FC = () => {
  const { activeSongId } = useSearchContext()
  const [selectedTeamMember, setSelectedTeamMember] = useState('')
  const { activeTeam, id: userID } = useUserContext()
  const [retrieveSong, { data }] = useLazyQuery<SongQuery['data'], SongQuery['vars']>(SONG_QUERY, {
    fetchPolicy: 'network-only',
  })

  const [recommendationCreateMutation] = useMutation<RecommendationCreate['data'], RecommendationCreate['vars']>(
    RECOMMENDATION_CREATE,
  )

  const { data: teamData } = useQuery<TeamQuery['data'], TeamQuery['vars']>(TEAM_QUERY, {
    fetchPolicy: 'network-only',
    variables: { id: activeTeam?.id },
    skip: !activeTeam,
  })

  const recommendSong = (): void => {
    if (!data) {
      return
    }
    recommendationCreateMutation({ variables: { youtubeId: data.song.youtubeId, recommendToUser: selectedTeamMember } })
  }

  const teamMembers = teamData?.team.users.filter(teamMember => userID !== teamMember.id)

  const teamMemberOptions = teamMembers?.map(teamMember => (
    <option key={teamMember.id} value={teamMember.id}>
      {teamMember.name}
    </option>
  ))

  const selectTeamMember = (ev: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedTeamMember(ev.target.value)
  }

  useEffect(() => {
    if (!activeSongId) {
      return
    }

    retrieveSong({ variables: { id: activeSongId } })
  }, [activeSongId, retrieveSong])

  if (!activeSongId || !data) {
    return (
      <Flex
        as="aside"
        sx={{
          borderLeft: '1px solid',
          borderColor: 'accent',
          color: 'text',
          flexDirection: 'column',
          height: '100%',
          overflow: 'scroll',
          p: 4,
          width: ['100%', '30%'],
        }}
      >
        Select a Song
      </Flex>
    )
  }

  return (
    <Flex
      as="aside"
      sx={{
        borderLeft: '1px solid',
        borderColor: 'accent',
        color: 'text',
        flexDirection: 'column',
        height: '100%',
        overflow: 'scroll',
        p: 4,
        width: ['100%', '30%'],
      }}
    >
      <Box pb={4}>
        <Text>{data.song.name}</Text>
        <Box>Duration: {data.song.durationInSeconds}</Box>
        <Box>
          <Link color="text" href={`https://youtube.com/watch?v=${data.song.youtubeId}`} target="_blank">
            Youtube
          </Link>
        </Box>
        <Box>
          Tags
          <Box as="ul">
            {data.song.tags.map(t => (
              <Box key={t.id} as="li">
                {t.name}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box>
        <Box pb={3}>
          <Label htmlFor="team-members">Recommend this song to someone on your team!</Label>
          <Select id="team-members" name="team members" defaultValue="select-team-member" onChange={selectTeamMember}>
            <option id="select-team-member">Select a Team Member</option>
            {teamMemberOptions}
          </Select>
        </Box>
        <Button onClick={recommendSong}>Recommend Song</Button>
      </Box>
    </Flex>
  )
}

export default SongDetails
