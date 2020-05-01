import React, { useEffect, useState } from 'react'
import { Box, Button, Flex, Text } from 'rebass'
import { Select } from '@rebass/forms'
import { useLazyQuery, useQuery, useMutation } from '@apollo/react-hooks'
import { XCircle } from 'react-feather'
import ReactPlayer from 'react-player'

import { duration } from 'lib/formatters'
import { useUserContext } from 'Context'
import { RecommendationCreate, RECOMMENDATION_CREATE, SongQuery, SONG_QUERY, TeamQuery, TEAM_QUERY } from './graphql'
import { useSearchContext } from './SearchContextProvider'

const SongDetails: React.FC = () => {
  const { activeSongId, setActiveSongId } = useSearchContext()
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

  const closeSongDetails = (): void => setActiveSongId('')

  useEffect(() => {
    if (!activeSongId) {
      return
    }

    retrieveSong({ variables: { id: activeSongId } })
  }, [activeSongId, retrieveSong])

  if (!activeSongId || !data) {
    return <></>
  }

  return (
    <Flex
      as="aside"
      sx={{
        bg: 'background',
        border: '1px solid',
        borderColor: 'accent',
        boxShadow: 'xl',
        color: 'text',
        flexDirection: 'column',
        height: '100%',
        overflow: 'scroll',
        p: 4,
        position: 'absolute',
        right: 0,
        width: '400px',
      }}
    >
      <Box
        onClick={closeSongDetails}
        sx={{
          textAlign: 'right',
          mb: 3,
        }}
      >
        <Text
          sx={{
            alignItems: 'center',
            cursor: 'pointer',
            display: 'inline-flex',
            py: 1,
            px: 2,
            mr: 2,
            '&:hover': {
              bg: 'accent',
              borderRadius: 6,
            },
          }}
        >
          Close
          <Box as={XCircle} ml={2} />
        </Text>
      </Box>

      <Flex
        sx={{
          border: '1px solid',
          borderColor: 'accent',
          borderRadius: 6,
          boxShadow: 'xxl',
          height: '250px',
          mb: 3,
          overflow: 'hidden',
        }}
      >
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${data.song.youtubeId}`}
          playing={false}
          height="100%"
          width="100%"
          style={{ display: 'flex' }}
        />
      </Flex>

      <Flex alignItems="center" justifyContent="space-between" mb={3}>
        <Text
          sx={{
            fontSize: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {data.song.name}
        </Text>

        <Box sx={{ fontSize: 2, minWidth: 'auto' }}>{duration(data.song.durationInSeconds)}</Box>
      </Flex>

      <Flex
        as="ul"
        sx={{
          alignItems: 'center',
          flexWrap: 'wrap',
          mb: 3,
          p: 0,
          width: '100%',
        }}
      >
        {data.song.tags.map(t => (
          <Box
            key={t.id}
            as="li"
            sx={{
              bg: 'accent',
              borderRadius: 3,
              fontSize: 1,
              fontWeight: 600,
              p: 1,
              mb: 2,
              listStyle: 'none',
              '&:not(:last-child)': {
                mr: 2,
              },
            }}
          >
            {t.name}
          </Box>
        ))}
      </Flex>

      <Box mb={2}>
        <Text fontSize={2} color="gray400">
          Recommend this song to someone on your team!
        </Text>
      </Box>

      <Flex alignItems="center" justifyContent="space-between" width="100%">
        <Box sx={{ flex: 1, mr: 2 }}>
          <Select
            id="team-members"
            name="team members"
            defaultValue="select-team-member"
            onChange={selectTeamMember}
            sx={{ fontSize: 2 }}
          >
            <option id="select-team-member">Select a Team Member</option>
            {teamMemberOptions}
          </Select>
        </Box>

        <Button
          onClick={recommendSong}
          sx={{
            fontSize: 2,
            p: 2,
          }}
        >
          Recommend
        </Button>
      </Flex>
    </Flex>
  )
}

export default SongDetails
