import styled from '@emotion/styled'
import css from '@styled-system/css'

export const Td = styled('td')(
  css({
    alignItems: ['center', 'normal'],
    borderBottom: ['1px solid', 0],
    borderColor: ['accent', 'transparent'],
    display: ['flex', 'table-cell'],
    fontSize: 1,
    justifyContent: ['space-between', 'normal'],
    textAlign: ['right', 'left'],
    m: 0,
    py: [3],
    px: 3,
    '&:before': {
      content: ['attr(data-label)', 'none'],
      float: 'left',
      fontWeight: 600,
      mr: 4,
      textTransform: 'uppercase',
    },
    '&:last-child': {
      borderBottom: 0,
    },
  }),
)
