export type RoomType = {
  id: string
  name: string
  users: UserType[]
}

export type TeamType = {
  id: string
  name: string
}

export type UserType = {
  id: string
  email: string
  name: string
  activeRoom?: RoomType
  activeTeam?: TeamType
  teams: TeamType[]
}
