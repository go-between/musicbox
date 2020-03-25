import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Flex } from 'rebass'
import { Input } from '@rebass/forms'
import { useToasts } from 'react-toast-notifications'

import { setString } from 'lib/setters'
import { usePlaylistRecordContext } from 'Room'

import { SongCreateMutation, SONG_CREATE } from './graphql'

export const YoutubeAdd: React.FC = () => {
  const { addToast } = useToasts()
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [youtubeId, setYoutubeId] = useState('')
  const { addRecord } = usePlaylistRecordContext()
  const [createSong] = useMutation<SongCreateMutation['data'], SongCreateMutation['vars']>(SONG_CREATE, {
    onCompleted: ({ songCreate: { song } }) => {
      addRecord(song.id)
      setYoutubeId('')
      setYoutubeUrl('')
      addToast(`Successfully added ${song.name}`, { appearance: 'success', autoDismiss: true })
    },
  })

  useEffect(() => {
    if (!youtubeUrl) {
      return
    }

    try {
      const vParam = new URL(youtubeUrl).searchParams.get('v')
      if (!!vParam) {
        setYoutubeId(vParam)
      }
    } catch (TypeError) {}
  }, [youtubeUrl])

  useEffect(() => {
    if (!youtubeId) {
      return
    }

    createSong({ variables: { youtubeId } })
  }, [createSong, youtubeId])

  return (
    <Flex
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 4,
        mb: 4,
        flexDirection: 'column',
      }}
    >
      <Flex
        sx={{ borderRadius: 6 }}
        bg="accent"
        width="100%"
        px={3}
        py={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Input
          type="text"
          value={youtubeUrl}
          onChange={setString(setYoutubeUrl)}
          placeholder="Paste a complete youtube url here"
          sx={{
            bg: 'accent',
            boxShadow: 'none',
          }}
        />
      </Flex>
    </Flex>
  )
}

export default YoutubeAdd
