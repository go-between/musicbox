import styled from '@emotion/styled'
import css from '@styled-system/css'

export const Thead = styled('thead')(
  css({
    border: 'none',
    clip: ['rect(0 0 0 0)', 'auto'],
    height: ['1px', 'auto'],
    margin: ['-1px', 0],
    overflow: 'hidden',
    padding: 0,
    position: ['absolute', 'relative'],
    width: ['1px', 'auto'],
    'tr': {
      borderBottom: [0, '1px solid'],
      borderColor: ['transparent', 'accent']
    }
  })
)