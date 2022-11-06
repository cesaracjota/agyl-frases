import { Search2Icon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
import React from 'react'

export const ModalDetallesFrase = () => {
  return (
    <>
         <IconButton
            aria-label="Ver"
            icon={<Search2Icon />}
            fontSize="xl"
            _dark={{ bg: "blue.600", color: "white", _hover: { bg: "blue.800" } }}
            colorScheme="blue"
            // onClick={handleOpenDrawer}
        />
    </>
  )
}
