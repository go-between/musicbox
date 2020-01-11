export type ParsedResult = {
  id: string
  description: string
  title: string
  image: string
}

export type Results = {
  kind: 'youtube#searchListResponse'
  etag: string
  nextPageToken: string
  regionCode: string
  pageInfo: {
    totalResults: number
    resultsPerPage: number
  }
  items: Result[]
}

export type Result = {
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
