import { Icon, IconButton } from '@chakra-ui/react';
import React from 'react';
import { VscAdd } from 'react-icons/vsc';

export const ModalAgregarFrase = () => {
  return (
    <>
        <IconButton
            colorScheme="messenger"
            _dark={{ bg: "messenger.500", color: "white", _hover: { bg: "messenger.600" }}}
            aria-label="Agregar"
            icon={<Icon as={VscAdd} fontSize="2xl" />}
            variant="solid"
            rounded="full"
            // onClick={handleModalOpen}
        />
    </>
  )
}
