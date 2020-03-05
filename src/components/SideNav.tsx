import React from 'react'
import { Flex, Link } from 'rebass'
import { useHistory } from 'react-router-dom'

export const SideNav: React.FC = () => {
  const history = useHistory()
  const navigate = (to: string) => (ev: React.MouseEvent) => {
    ev.preventDefault()
    history.push(to)
  }

  return (
    <Flex
      as="aside"
      sx={{
        bg: 'background',
        borderRight: '1px solid',
        borderColor: 'muted',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
        p: 4,
        width: ['100%', '200px'],
      }}
    >
      <Link color="text" onClick={navigate('/invitations')} href="#">
        Invitations
      </Link>
      <Link color="text" onClick={navigate('/signup')} href="#">
        Sign Up
      </Link>
      <Link color="text" onClick={() => alert('lol')} href="#">
        Library
      </Link>
    </Flex>
  )
}
