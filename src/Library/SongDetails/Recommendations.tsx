import React, { useState } from 'react'
import { Box, Button, Flex, Text } from 'rebass'
import { Select } from '@rebass/forms'
import { useQuery, useMutation } from '@apollo/react-hooks'

import { useUserContext } from 'Context'
import {
  RecommendationCreate,
  RECOMMENDATION_CREATE,
  RecommendationsQuery,
  RECOMMENDATIONS_QUERY,
  TeamQuery,
  TEAM_QUERY,
  Recommendation,
} from './graphql'

const YourRecommendations: React.FC<{ recommendations?: Recommendation[] }> = ({ recommendations }) => {
  if (!recommendations || recommendations.length === 0) {
    return <></>
  }

  /* eslint-disable @typescript-eslint/camelcase */
  const sourceMap: { [k: string]: string } = {
    pending_recommendation: 'pending',
    accepted_recommendation: 'accepted',
  }
  /* eslint-enable @typescript-eslint/camelcase */

  const recommendationItems = recommendations.map(r => {
    return (
      <Box
        key={r.user.id}
        as="li"
        sx={{
          listStyle: 'none',
          pb: 2,
          width: '100%',
        }}
      >
        <Text>
          {r.user.name} ({sourceMap[r.source]})
        </Text>
      </Box>
    )
  })

  return (
    <>
      <Text fontSize={2} color="gray400">
        You&apos;ve recommended this song to:
      </Text>

      <Box my={1} />

      <Box
        as="ul"
        sx={{
          m: 0,
          p: 0,
        }}
      >
        {recommendationItems}
      </Box>
    </>
  )
}

type Props = {
  songId: string
  youtubeId: string
}

const Recommendations: React.FC<Props> = ({ songId, youtubeId }) => {
  const { activeTeam, id: userID } = useUserContext()

  const [selectedTeamMember, setSelectedTeamMember] = useState('')
  const [recommendationCreateMutation] = useMutation<RecommendationCreate['data'], RecommendationCreate['vars']>(
    RECOMMENDATION_CREATE,
    { refetchQueries: ['RecommendedToQuery'] },
  )

  const { data: teamData } = useQuery<TeamQuery['data'], TeamQuery['vars']>(TEAM_QUERY, {
    fetchPolicy: 'network-only',
    variables: { id: activeTeam?.id },
    skip: !activeTeam,
  })

  const { data: recommendationsData } = useQuery<RecommendationsQuery['data'], RecommendationsQuery['vars']>(
    RECOMMENDATIONS_QUERY,
    {
      fetchPolicy: 'network-only',
      variables: { songId },
    },
  )

  const recommendSong = (): void => {
    recommendationCreateMutation({ variables: { youtubeId: youtubeId, recommendToUser: selectedTeamMember } })
  }

  const teamMembers = teamData?.team.users.filter(teamMember => {
    const hasRecommendation = recommendationsData?.recommendations.find(r => r.user.id === teamMember.id)
    return userID !== teamMember.id && !hasRecommendation
  })

  const teamMemberOptions = teamMembers?.map(teamMember => (
    <option key={teamMember.id} value={teamMember.id}>
      {teamMember.name}
    </option>
  ))

  const selectTeamMember = (ev: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedTeamMember(ev.target.value)
  }

  return (
    <>
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

      <Box my={2} />
      <YourRecommendations recommendations={recommendationsData?.recommendations} />
    </>
  )
}

export default Recommendations
