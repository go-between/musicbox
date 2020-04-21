import styled from '@emotion/styled'
import css from '@styled-system/css'

export const Table = styled('table')(
  css({
    border: 0,
    borderColor: ['none', 'accent'],
    borderCollapse: 'collapse',
    borderSpacing: '0',
    m: 0,
    p: 0,
    tableLayout: 'fixed',
    width: '100%',
  })
)
