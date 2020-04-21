import styled from '@emotion/styled'
import css from '@styled-system/css'

export const Td = styled('td')(
  css({
    borderBottom: 0,
    display: ['block', 'table-cell'],
    fontSize: 1,
    textAlign: ['right', 'left'],
    m: 0,
    py: [3],
    px: 3,
    '&:before': {
      content: ['attr(data-label)', 'none'],
      float: 'left',
      fontWeight: 600,
      mr: 4,
      textTransform: 'uppercase'
    },
    '&:last-child': {
      borderBottom: 0
    }
  })
)
