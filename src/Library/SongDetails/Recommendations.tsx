import React, { useState } from 'react'
import { Box, Button, Flex, Text } from 'rebass'
import { Select } from '@rebass/forms'
import { useQuery, useMutation } from '@apollo/react-hooks'

import { useUserContext } from 'Context'
import { RecommendationCreate, RECOMMENDATION_CREATE, TeamQuery, TEAM_QUERY } from './graphql'

type Props = {
  songId: string
  youtubeId: string
}

const Recommendations: React.FC<Props> = ({ songId, youtubeId }) => {
  const { activeTeam, id: userID } = useUserContext()

  const [selectedTeamMember, setSelectedTeamMember] = useState('')
  const [recommendationCreateMutation] = useMutation<RecommendationCreate['data'], RecommendationCreate['vars']>(
    RECOMMENDATION_CREATE,
  )

  const { data } = useQuery<TeamQuery['data'], TeamQuery['vars']>(TEAM_QUERY, {
    fetchPolicy: 'network-only',
    variables: { id: activeTeam?.id },
    skip: !activeTeam,
  })

  const recommendSong = (): void => {
    if (!data) {
      return
    }
    recommendationCreateMutation({ variables: { youtubeId: youtubeId, recommendToUser: selectedTeamMember } })
  }

  const teamMembers = data?.team.users.filter(teamMember => userID !== teamMember.id)

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
    </>
  )
}

export default Recommendations
