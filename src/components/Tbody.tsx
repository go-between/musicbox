import styled from '@emotion/styled'
import css from '@styled-system/css'

export const Tbody = styled('tbody')(
  css({
    'tr': {
      borderBottom: ['1px solid', '1px solid'],
      borderLeft: ['1px solid', 0],
      borderRight: ['1px solid', 0],
      borderTop: ['1px solid', 0],
      borderColor: ['accent', 'accent'],
      borderRadius: [6, 0],
      '&:last-child': {
        borderBottom: ['1px solid', 0],
        borderColor: ['accent', 'transparent'],
      }
    }
  })
)