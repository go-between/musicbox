import React from 'react'
import { Box, Flex} from 'rebass'

import PasswordUpdate from './PasswordUpdate'
import UserUpdate from './UserUpdate'

const UserSettings: React.FC = () => {
  return (
    <Flex justifyContent="space-between" p={4} width="100%">
      <Box pb={4}>
        <UserUpdate />
      </Box>

      <Box>
        <PasswordUpdate />
      </Box>
    </Flex>
  )
}

export default UserSettings
