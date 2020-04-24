import React from 'react'
import { Box, Flex, Text } from 'rebass'

import { Table, TableWrapper, Tbody, Thead, Tr, Td, Th, MediaObject } from 'components'

type RecommendedSongProps = {

}

const RecommendedSong: React.FC<RecommendedSongProps> = ({ recommendedSong }) => {
  return (
    <Tr>
      <Td data-label="Song">
        <Flex alignItems="center" justifyContent={['flex-end', 'flex-start']}>
          <MediaObject imageUrl={recommendedSong.thumbnailUrl} imageSize={['24px', '50px']} alignment="center">
            <Box>
              <Text
                sx={{
                  fontSize: 1,
                  fontWeight: 600,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {recommendedSong.name}
              </Text>
            </Box>
          </MediaObject>
        </Flex>
      </Td>

      <Td data-label="Team Member">
        <Box>
          {/* {user} */}
        </Box>
      </Td>

      <Td data-label="Actions">
        <Flex alignItems="center" justifyContent={['flex-end', 'flex-start']}>
          <Box
            // onClick={selectSong}
            sx={{
              cursor: 'pointer',
              color: 'gray400',
              fontSize: 1,
              textAlign: 'center',
              textDecoration: 'underline',
              width: '100%',
            }}
          >
            Reject!
          </Box>

          <Box
            // onClick={removeFromLibrary}
            sx={{
              cursor: 'pointer',
              color: 'gray400',
              fontSize: 1,
              textAlign: 'center',
              textDecoration: 'underline',
              width: '100%',
            }}
          >
            Add To Library
          </Box>
        </Flex>
      </Td>
    </Tr>
  )
}

const Recommendations: React.FC = () => {
  // const recommendedSongs =

  return (
    <TableWrapper>
      <Table>
        <Thead>
          <Tr>
            <Th width={['auto', 'auto']}>Song</Th>
            <Th width={['auto', 'auto']}>Team Member</Th>
            <Th width={['auto', 'auto']}></Th>
          </Tr>
        </Thead>
        <Tbody>{recommendedSongs}</Tbody>
      </Table>
    </TableWrapper>
  )
}

export default Recommendations
