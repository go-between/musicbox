export const duration = (d: number): string => {
  const hours = Math.floor(d / 3600).toString()
  const minutes = Math.floor((d % 3600) / 60).toString()
  const seconds = Math.floor(d % 60).toString()

  if (hours === '0') {
    return `${minutes}:${seconds.padStart(2, '0')}`
  }

  return `${hours}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`
}
