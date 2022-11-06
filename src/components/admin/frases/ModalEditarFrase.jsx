import { Icon, IconButton } from '@chakra-ui/react'
import React from 'react'
import { VscEdit } from 'react-icons/vsc'

export const ModalEditarFrase = () => {
    return (
        <>
            <IconButton
                colorScheme="green"
                _dark={{ bg: "green.600", color: "white", _hover: { bg: "green.800" } }}
                aria-label="Editar"
                icon={<Icon as={VscEdit}
                    fontSize="2xl" />}
                variant="solid"
                // onClick={() => handleModalOpen(row)}
                ml={2}
            />
        </>
    )
}
