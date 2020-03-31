import gql from 'graphql-tag'

export type TeamActivate = {
  data: {
    teamActivate: {
      team: {
        rooms: Room[]
      }
    }
  }
  vars: {
    teamId: string
  }
}

export const TEAM_ACTIVATE = gql`
  mutation TeamActivate($teamId: ID!) {
    teamActivate(input: { teamId: $teamId }) {
      team {
        rooms {
          id
          name
          currentSong {
            name
          }
        }
      }
      errors
    }
  }
`

type Room = {
  id: string
  name: string
  currentSong: {
    name: string
  } | null
}
