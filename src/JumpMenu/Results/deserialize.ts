import { LibraryRecord, Song, YoutubeResult, SearchResult } from '../graphql'

export type Result = {
  type: 'LibraryRecord' | 'Song' | 'YoutubeResult'
  id: string
  songId: string
  youtubeId: string
  name: string
  thumbnailUrl: string
  durationInSeconds: number
}

const resultFromLibraryRecord = (libraryRecord: LibraryRecord): Result => ({
  type: 'LibraryRecord',
  id: libraryRecord.id,
  songId: libraryRecord.song.id,
  youtubeId: libraryRecord.song.youtubeId,
  name: libraryRecord.song.name,
  thumbnailUrl: libraryRecord.song.thumbnailUrl,
  durationInSeconds: libraryRecord.song.durationInSeconds,
})

const resultFromSong = (song: Song): Result => ({
  type: 'Song',
  id: song.id,
  songId: song.id,
  youtubeId: song.youtubeId,
  name: song.name,
  thumbnailUrl: song.thumbnailUrl,
  durationInSeconds: song.durationInSeconds,
})

const resultFromYoutubeResult = (youtubeResult: YoutubeResult): Result => ({
  type: 'YoutubeResult',
  id: youtubeResult.id,
  songId: '',
  youtubeId: youtubeResult.id,
  name: youtubeResult.title,
  thumbnailUrl: youtubeResult.thumbnailUrl,
  durationInSeconds: youtubeResult.duration,
})

export const deserialize = (result: SearchResult): Result => {
  switch (result.__typename) {
    case 'LibraryRecord':
      return resultFromLibraryRecord(result)
    case 'Song':
      return resultFromSong(result)
    case 'YoutubeResult':
      return resultFromYoutubeResult(result)
  }
}
