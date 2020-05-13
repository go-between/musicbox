import React from 'react'
import { Box, Flex } from 'rebass'
import { Image as ImageIcon } from 'react-feather'

type Props = {
  alignment?: string
  imageUrl: string
  placeholderImageColor?: string
  imageSize?: string | Array<string>
}

const ImagePlaceholder: React.FC<{ placeholderImageColor: string }> = ({ placeholderImageColor }) => {
  return (
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

export const MediaObject: React.FC<Props> = ({
  alignment = 'initial',
  children,
  imageUrl,
  placeholderImageColor = 'accent',
  imageSize,
}) => {
  const image = !imageUrl ? (
    <ImagePlaceholder placeholderImageColor={placeholderImageColor} />
  ) : (
    <Box
      sx={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: 3,
        boxShadow: 'xl',
        height: imageSize,
        width: imageSize,
      }}
    />
  )

  return (
    <Flex>
      <Box
        sx={{
          mr: 3,
        }}
      >
        {image}
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
