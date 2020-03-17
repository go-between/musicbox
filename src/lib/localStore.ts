export const retrieveShowVideo = (): boolean => {
  const showVideo = localStorage.getItem('musicbox-showVideo') || 'true'

  return showVideo === 'true'
}

export const persistShowVideo = (showVideo: boolean): void => {
  localStorage.setItem('musicbox-showVideo', showVideo ? 'true' : 'false')
}

export const retrieveToken = (): string => {
  return localStorage.getItem('musicbox-token') || ''
}

export const persistToken = (token: string): void => {
  localStorage.setItem('musicbox-token', token)
}

export const retrieveVolume = (): number => {
  const volume = localStorage.getItem('musicbox-volume')
  if (!volume) {
    return 100
  }

  return parseInt(volume, 10)
}

export const persistVolume = (volume: number): void => {
  localStorage.setItem('musicbox-volume', volume.toString())
}
