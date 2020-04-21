import styled from '@emotion/styled'
import css from '@styled-system/css'

export const Th = styled('th')(
  css({
    p: 3,
    textAlign: 'left',
    fontSize: 1,
    letterSpacing: '.1em',
    textTransform: 'uppercase',
    width: 'auto',
    '&:first-child': {
      width: '10%'
    },
    '&:last-child': {
      width: '10%'
    }
  }),
)
