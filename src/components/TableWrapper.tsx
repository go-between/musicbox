import styled from '@emotion/styled'
import css from '@styled-system/css'

export const TableWrapper = styled('div')(
  css({
    border: [0, '1px solid'],
    borderColor: ['transparent', 'accent'],
    borderRadius: [0, 6],
    boxShadow: ['none', 'xl'],
    overflowX: ['none', 'auto'],
  })
)
