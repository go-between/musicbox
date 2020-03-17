export const retrieveToken = (): string => {
  return localStorage.getItem('musicbox-token') || ''
}

export const persistToken = (token: string): void => {
  localStorage.setItem('musicbox-token', token)
}
