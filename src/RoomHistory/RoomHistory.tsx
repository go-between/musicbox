import React from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { Box, Flex, Image, Text } from 'rebass'
import moment from 'moment'
import { useToasts } from 'react-toast-notifications'
import { Image as ImageIcon, Plus } from 'react-feather'

import { useUserContext } from 'Context'

import { ROOM_HISTORY_QUERY, SONG_CREATE, RoomHistoryQuery, SongCreateMutation } from './graphql'

const recordsFrom = moment()
  .subtract(2, 'days')
  .toISOString()

const RoomHistory: React.FC = () => {
  const user = useUserContext()
  const { data, loading } = useQuery<RoomHistoryQuery['data'], RoomHistoryQuery['vars']>(ROOM_HISTORY_QUERY, {
    variables: { roomId: user.activeRoom.id, from: recordsFrom },
    fetchPolicy: 'no-cache',
  })

  const { addToast } = useToasts()
  const [createSong] = useMutation<SongCreateMutation['data'], SongCreateMutation['vars']>(SONG_CREATE, {
    onCompleted: ({ songCreate: { song } }) => {
      addToast(`Successfully added ${song.name} to your library`, { appearance: 'success', autoDismiss: true })
    },
  })

  if (loading || !data) {
    return <p>Loading...</p>
  }

  const records = data.roomPlaylist.map(record => {
    const playDate = moment(record.playedAt)
    const addSong = (): void => {
      createSong({ variables: { youtubeId: record.song.youtubeId } })
    }

    const renderThumbnail = (thumbnailUrl: string) => {
      if (!thumbnailUrl) {
        return(
          <Flex
            sx={{
              alignItems: 'center',
              border: '1px solid',
              borderColor: 'accent',
              borderRadius: 3,
              boxShadow: 'xl',
              height: '100%',
              justifyContent: 'center',
              p: 2,
              width: '50px'
            }}
          >
           <Box as={ImageIcon} size={20} color="muted" />
          </Flex>
        )
      }
      return (
        <Image
            src={thumbnailUrl}
            sx={{
              borderRadius: 3,
              boxShadow: 'xl',
              height: '100%',
              width: '100%'
            }}
        />
      )
    }

    return (
      <Box
        as="li"
        key={record.id}
        sx={{
          alignItems: 'center',
          borderBottom: '1px solid',
          borderColor: 'accent',
          display: 'flex',
          listStyle: 'none',
          mx: 0,
          my: 3,
          pb: 3,
          width: '100%'
        }}
      >
        <Box
          sx={{
            width: '50px',
          }}
        >
          {renderThumbnail(record.song.thumbnailUrl)}
        </Box>

        <Flex
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            mx: 3,
            width: '100%'
          }}
        >
          <Box
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              mx: 3,
            }}
          >
            <Text
              sx={{
                color: 'gray300',
                fontSize: 1,
              }}
            >
              On {playDate.format('MMMM Do YYYY, h:mm:ss a')}, {record.user.name} played
            </Text>

            <Text
              sx={{
                color: 'gray300',
                fontSize: 1,
              }}
            >
              {record.song.name}
            </Text>

            <Flex
              sx={{
                color: 'gray300',
                fontSize: 1,
              }}
            >
              {record.recordListens.map(l => {
                return (
                  <Text key={l.id} mr={1}>
                    {l.user.name}: {l.approval}
                  </Text>
                )
              })}
            </Flex>
          </Box>

          {record.user.id !== user.id && (
            <Box onClick={addSong}
              sx={{
                alignItems: 'center',
                color: 'text',
                cursor: 'pointer',
                display: 'flex',
                height: '24px',
                widht: '24px',
                '&:hover': {
                  bg: 'muted',
                  borderRadius: 4,
                },
              }}
            >
              <Plus size={20} />
            </Box>
          )}
        </Flex>
      </Box>
    )
  })
  return (
    <Box
      width="100%"
      as="ul"
      sx={{
        m: 0,
        p: 0,
      }}
    >
      {records}
    </Box>
  )
}

export default RoomHistory
