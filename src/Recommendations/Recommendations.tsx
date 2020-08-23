import React, { useState } from 'react'
import { Box, Button, Flex, Text } from 'rebass'
import { useMutation, useQuery } from '@apollo/react-hooks'
import Gravatar from 'react-gravatar'

import { MediaObject, Modal, Table, TableWrapper, Tbody, Thead, Tr, Td, Th } from 'components'
import PlayerPrimitive from 'Player/PlayerPrimitive'
import { useVolumeContext, PLAYERS } from 'Player/VolumeContextProvider'
import {
  RecommendationAccept,
  RECOMMENDATION_ACCEPT,
  Recommendation,
  RecommendationsQuery,
  RECOMMENDATIONS_QUERY,
  RecommendatioReject,
  RECOMMENDATION_REJECT,
} from './graphql'

type RecommendedSongProps = {
  recommendedSong: Recommendation
}

const RecommendedSong: React.FC<RecommendedSongProps> = ({ recommendedSong }) => {
  const { setUnmutedPlayer } = useVolumeContext()
  const [showModal, setShowModal] = useState(false)
  const openModal = (ev: React.MouseEvent): void => {
    ev.stopPropagation()
    setShowModal(true)
    setUnmutedPlayer(PLAYERS.preview)
  }
  const closeModal = (ev?: React.MouseEvent): void => {
    if (ev) {
      ev.stopPropagation()
    }
    setShowModal(false)
    setUnmutedPlayer(PLAYERS.main)
  }

  const [recommendationAcceptMutation] = useMutation<RecommendationAccept['data'], RecommendationAccept['vars']>(
    RECOMMENDATION_ACCEPT,
    {
      refetchQueries: ['Recommendations'],
    },
  )

  const acceptRecommendation = (): void => {
    recommendationAcceptMutation({ variables: { libraryRecordId: recommendedSong.id } })
  }

  const [recommendationRejectMutation] = useMutation<RecommendatioReject['data'], RecommendatioReject['vars']>(
    RECOMMENDATION_REJECT,
    {
      refetchQueries: ['Recommendations'],
    },
  )

  const rejectRecommendation = (): void => {
    recommendationRejectMutation({ variables: { id: recommendedSong.id } })
  }

  return (
    <>
      <Tr>
        <Td data-label="Song">
          <Flex alignItems="center" justifyContent={['flex-end', 'flex-start']}>
            <MediaObject imageUrl={recommendedSong.song.thumbnailUrl} imageSize={['24px', '50px']} alignment="center">
              <Box>
                <Text
                  sx={{
                    fontSize: 1,
                    fontWeight: 600,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {recommendedSong.song.name}
                </Text>
              </Box>
            </MediaObject>
          </Flex>
        </Td>

        <Td data-label="Team Member">
          <Flex alignItems="center">
            <Gravatar email={recommendedSong.fromUser.email} size={32} style={{ borderRadius: '100%' }} />
            <Box mx={2}>{recommendedSong.fromUser.name}</Box>
          </Flex>
        </Td>

        <Td data-label="Actions">
          <Flex alignItems="center" justifyContent={['flex-end', 'flex-start']}>
            <Box
              onClick={openModal}
              sx={{
                cursor: 'pointer',
                color: 'gray400',
                fontSize: 1,
                textAlign: 'center',
                textDecoration: 'underline',
                width: '100%',
              }}
            >
              Preview
            </Box>

            <Box
              onClick={rejectRecommendation}
              sx={{
                cursor: 'pointer',
                color: 'gray400',
                fontSize: 1,
                textAlign: 'center',
                textDecoration: 'underline',
                width: '100%',
              }}
            >
              Reject!
            </Box>

            <Box
              onClick={acceptRecommendation}
              sx={{
                cursor: 'pointer',
                color: 'gray400',
                fontSize: 1,
                textAlign: 'center',
                textDecoration: 'underline',
                width: '100%',
              }}
            >
              Add To Library
            </Box>
          </Flex>
        </Td>
      </Tr>
      <Modal showModal={showModal} closeModal={closeModal} title="Preview Song">
        <PlayerPrimitive
          playedAt=""
          youtubeId={recommendedSong.song.youtubeId}
          controls={true}
          playerIdentifier={PLAYERS.preview}
        />
        <Button onClick={closeModal}>close</Button>
      </Modal>
    </>
  )
}

const Recommendations: React.FC = () => {
  const { data } = useQuery<RecommendationsQuery['data'], RecommendationsQuery['vars']>(RECOMMENDATIONS_QUERY, {
    fetchPolicy: 'network-only',
  })

  if (!data) {
    return <Box>Loading</Box>
  }

  const recommendedSongPlaceholder = (
    <Tr>
      <Td>There are no recommendations to review at this time.</Td>
    </Tr>
  )

  const recommendedSongs = data.recommendations.map(r => <RecommendedSong key={r.id} recommendedSong={r} />)

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        p: 4,
      }}
    >
      <TableWrapper>
        <Table>
          <Thead>
            <Tr>
              <Th width={['auto', 'auto']}>Song</Th>
              <Th width={['auto', 'auto']}>Team Member</Th>
              <Th width={['auto', 'auto']}></Th>
            </Tr>
          </Thead>
          <Tbody>{recommendedSongs.length > 0 ? recommendedSongs : recommendedSongPlaceholder}</Tbody>
        </Table>
      </TableWrapper>
    </Flex>
  )
}

export default Recommendations
