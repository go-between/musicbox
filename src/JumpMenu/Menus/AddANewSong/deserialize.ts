import { Song, YoutubeResult, SearchResult } from './graphql'

export type Result = {
  type: 'Song' | 'YoutubeResult'
  id: string
  youtubeId: string
  name: string
  thumbnailUrl: string
}

const resultFromSong = (song: Song): Result => ({
  type: 'Song',
  id: song.id,
  youtubeId: song.youtubeId,
  name: song.name,
  thumbnailUrl: song.thumbnailUrl,
})

const resultFromYoutubeResult = (youtubeResult: YoutubeResult): Result => ({
  type: 'YoutubeResult',
  id: youtubeResult.id,
  youtubeId: youtubeResult.id,
  name: youtubeResult.name,
  thumbnailUrl: youtubeResult.thumbnailUrl,
})

export const deserialize = (result: SearchResult): Result => {
  switch (result.__typename) {
    case 'Song':
      return resultFromSong(result)
    case 'YoutubeResult':
      return resultFromYoutubeResult(result)
  }
}
