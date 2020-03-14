import { YOUTUBE_API, YOUTUBE_KEY } from 'lib/constants'
import { Result, YoutubeResults } from './types'

export const deserialize = (results: YoutubeResults): Result[] => {
  return results.items.map(result => ({
    id: result.id.videoId,
    name: result.snippet.title,
    resultType: 'youtube',
  }))
}

export const search = (query: string): Promise<Response> => {
  const formData = new URLSearchParams()
  formData.append('q', query)
  formData.append('part', 'snippet')
  formData.append('type', 'video')
  formData.append('key', YOUTUBE_KEY)

  return fetch(`${YOUTUBE_API}?${formData.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
