import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const Frases = () => {
  return (
    <>
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Text as="h1" fontSize="xl" fontWeight={'bold'}>
                FRASES
            </Text>
        </Box>
    </>
  )
}

export default Frases