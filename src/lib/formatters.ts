import { Duration } from 'moment'
export const duration = (d: Duration): string => {
  if (d.hours() === 0) {
    return `${d.minutes().toString()}:${d
      .seconds()
      .toString()
      .padStart(2, '0')}`
  }

  return `${d.hours().toString()}:${d
    .minutes()
    .toString()
    .padStart(2, '0')}:${d
    .seconds()
    .toString()
    .padStart(2, '0')}`
}
