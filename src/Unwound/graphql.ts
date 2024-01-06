import { gql } from "apollo-boost"

export type UnwoundQuery = {
  data: {
    unwound: {
      songPlays: Array<{
        count: number
        label: string
        length: number
      }>
      songPlaysOverTime: Array<{
        label: string
        plays: Array<{
          count: number
          label: string
          length: number
        }>
      }>
      teamApprovals: Array<{
        count: number
        label: string
        length: number
      }>
      teamPlays: Array<{
        count: number
        label: string
        length: number
      }>
      topApprovals: Array<{
        count: number
        label: string
        length: number
      }>
      topPlays: Array<{
        count: number
        label: string
        length: number
      }>
      topPlaysOverTime: Array<{
        label: string
        plays: Array<{
          count: number
          label: string
          length: number
        }>
      }>
    }
  }
  vars: {
    year: number | null
    teamId: string
    songName: string | null
    week: number | null
    userId: string | null
  }
}

export const UNWOUND_QUERY = gql`
query Unwound($year: Int!, $teamId: ID!, $songName: String, $week: Int, $userId: ID) {
  unwound(year: $year, teamId: $teamId, songName: $songName, week: $week, userId: $userId) {
    songPlays {
      count
      label
      length
    }
    songPlaysOverTime {
      label
      plays {
        count
        label
        length
      }
    }
    teamApprovals {
      count
      label
      length
    }
    teamPlays {
      count
      label
      length
    }
    topApprovals {
      count
      label
      length
    }
    topPlays {
      count
      label
      length
    }
    topPlaysOverTime {
      label
      plays {
          count
          label
          length
      }
    }
  }
}
`
