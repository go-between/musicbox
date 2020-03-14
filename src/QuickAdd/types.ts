export type Result = {
  id: string
  name: string
  resultType: 'youtube' | 'library'
}

export type YoutubeResults = {
  kind: 'youtube#searchListResponse'
  etag: string
  nextPageToken: string
  regionCode: string
  pageInfo: {
    totalResults: number
    resultsPerPage: number
  }
  items: YoutubeResult[]
}

export type YoutubeResult = {
  kind: 'youtube#searchResult'
  etag: string
  id: {
    kind: string
    videoId: string
    channelId: string
    playlistId: string
  }
  snippet: {
    publishedAt: string
    channelId: string
    title: string
    description: string
    thumbnails: {
      [k: string]: {
        url: string
        width: number
        height: number
      }
    }
    channelTitle: string
    liveBroadcastContent: string
  }
}
