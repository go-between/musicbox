import React from 'react'
import { Box, Flex, Image } from 'rebass'
import { Image as ImageIcon } from 'react-feather'

type Props = {
  alignment?: string
  imageUrl: string
  placeholderImageColor?: string
}

export const MediaObject: React.FC<Props> = ({ alignment, children, imageUrl, placeholderImageColor }) => {
  const renderThumbnail = (imageUrl: string) => {
    if (!imageUrl) {
      return(
        <Flex
          sx={{
            alignItems: 'center',
            border: '1px solid',
            borderColor: placeholderImageColor === 'accent' ? 'muted' : 'accent',
            borderRadius: 3,
            boxShadow: 'xl',
            height: '100%',
            justifyContent: 'center',
            p: 2,
            width: '50px',
          }}
        >
         <Box as={ImageIcon} size={20} color={placeholderImageColor === 'accent' ? 'gray600' : 'muted'} />
        </Flex>
      )
    }
    return (
      <Image
          src={imageUrl}
          sx={{
            borderRadius: 3,
            boxShadow: 'xl',
            height: '100%',
            width: '100%'
          }}
      />
    )
  }

  return (
    <Flex>
      <Box
        sx={{
          mr: 3,
          width: '50px',
        }}
      >
        {renderThumbnail(imageUrl)}
      </Box>

      <Flex
        sx={{
          alignItems: alignment,
          flex: 1,
        }}
      >
        {children}
      </Flex>
    </Flex>
  )
}
