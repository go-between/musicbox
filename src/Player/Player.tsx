import React, { useState, useEffect } from 'react'

type Props = {
  currentRecord?: {
    playedAt: string
    song: {
      name: string
      youtubeId: string
    }
  }
}
const Player: React.FC<Props> = ({ currentRecord }) => {
  const [query, setQuery] = useState('')

  if (!currentRecord) {
    return <p>Nothing Playing!</p>
  }

  return (
    <>
      <p>Now Playing {currentRecord.song.name}</p>
    </>
  )
}

export default Player
