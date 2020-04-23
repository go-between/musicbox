import React from 'react'
import { Flex } from 'rebass'

import PasswordUpdate from './PasswordUpdate'
import UserUpdate from './UserUpdate'

const UserSettings: React.FC = () => {
  return (
    <Flex p={4}>
      <PasswordUpdate />
      <UserUpdate />
    </Flex>
  )
}

export default UserSettings
