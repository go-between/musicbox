import React, { createRef, useEffect, useState } from 'react'
import { Box, BoxProps } from 'rebass'

type keyHandler = { [k: string]: (i: number) => void }
type Props = {
  keyHandler: keyHandler
} & BoxProps

export const KeyboardSelectable: React.FC<Props> = props => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, css, keyHandler, ...boxProps } = props
  const totalResults = React.Children.count(children)
  const [selectionIndex, setSelectionIndex] = useState(0)
  const resultsRef = createRef<HTMLElement>()
  const selectedRef = createRef<HTMLElement>()

  useEffect(() => {
    const keyboardHandler = (ev: KeyboardEvent): void => {
      switch (ev.key) {
        case 'ArrowUp':
          setSelectionIndex(Math.max(selectionIndex - 1, 0))
          return
        case 'ArrowDown':
          setSelectionIndex(Math.min(selectionIndex + 1, totalResults - 1))
          return
        default:
          const handler = keyHandler[ev.key]
          if (!handler) {
            return
          }
          handler(selectionIndex)
          return
      }
    }

    window.addEventListener('keydown', keyboardHandler)
    return () => window.removeEventListener('keydown', keyboardHandler)
  }, [keyHandler, selectionIndex, totalResults])

  useEffect(() => {
    if (!resultsRef?.current || !selectedRef?.current) {
      return
    }

    const results = resultsRef.current
    const resultsHeight = parseInt(window.getComputedStyle(results).getPropertyValue('height'))
    const selected = selectedRef.current
    const selectedHeight = parseInt(window.getComputedStyle(selected).getPropertyValue('height'))

    if (selected.offsetTop > resultsHeight + results.scrollTop - selectedHeight) {
      results.scrollTop = selected.offsetTop
    } else if (selected.offsetTop < results.scrollTop) {
      results.scrollTop = results.scrollTop - resultsHeight
    }
  }, [resultsRef, selectedRef, selectionIndex])

  const wrappedChildren = React.Children.map(children, (c, i) => {
    const selected = i === selectionIndex
    return (
      <Box
        ref={selected ? selectedRef : null}
        sx={{ bg: `${selected ? '#4A5568' : 'initial'}`, '&:hover': { bg: '#4A5568' } }}
      >
        {c}
      </Box>
    )
  })

  return (
    <Box ref={resultsRef} {...boxProps}>
      {wrappedChildren}
    </Box>
  )
}
