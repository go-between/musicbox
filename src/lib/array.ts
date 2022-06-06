// https://en.wikipedia.org/wiki/Schwartzian_transform
export const shuffle = <T>(originalArray: T[]): T[] => {
  return originalArray
    .map(value => ({ sort: Math.random(), value }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}
