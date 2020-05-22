import { LibraryRecord, Song, YoutubeResult, SearchResult } from './graphql'

type Result = {
  libraryRecordId?: string
  name: string
  thumbnailUrl: string
  durationInSeconds: number
  youtubeId: string
}

const resultFromLibraryRecord = (libraryRecord: LibraryRecord): Result => ({
  libraryRecordId: libraryRecord.id,
  name: libraryRecord.song.name,
  thumbnailUrl: libraryRecord.song.thumbnailUrl,
  durationInSeconds: libraryRecord.song.durationInSeconds,
  youtubeId: libraryRecord.song.youtubeId,
})

const resultFromSong = (song: Song): Result => ({
  ...song,
})

const resultFromYoutubeResult = (youtubeResult: YoutubeResult): Result => ({
  name: youtubeResult.title,
  thumbnailUrl: youtubeResult.thumbnailUrl,
  durationInSeconds: youtubeResult.duration,
  youtubeId: youtubeResult.id,
})

const deserialize = (result: SearchResult): Result => {
  switch (result.__typename) {
    case 'LibraryRecord':
      return resultFromLibraryRecord(result)
    case 'Song':
      return resultFromSong(result)
    case 'YoutubeResult':
      return resultFromYoutubeResult(result)
  }
}

export default deserialize
