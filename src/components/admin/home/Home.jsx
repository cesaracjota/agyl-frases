import React from 'react'
import { Box } from '@chakra-ui/react'
import { useSelector } from 'react-redux';

const Home = () => {
  
  const user = useSelector(state => state.auth.user);

  const usuario = user ? user?.usuario?.nombre : '';

  return (
    <>
        <Box as="h1" fontSize="xl" fontWeight={'bold'}>
          BIENVENIDO(A) <span style={{fontWeight: 'normal'}}>{usuario}</span>
        </Box>
    </>
  )
}

export default Home