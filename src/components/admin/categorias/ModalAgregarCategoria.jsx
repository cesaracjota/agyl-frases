import React, { useState } from 'react'
import { 
    Button,
    FormControl, 
    FormLabel, 
    Icon, 
    IconButton, 
    Input, 
    Modal, 
    ModalBody, 
    ModalCloseButton, 
    ModalContent, 
    ModalFooter, 
    ModalHeader, 
    ModalOverlay, 
    Stack,
    Textarea 
} from '@chakra-ui/react'
import { VscAdd } from 'react-icons/vsc'
import { useDispatch } from 'react-redux';
import { createCategory } from '../../../features/categorias/categoriaSlice';

const ModalAgregarCategoria = () => {

    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const initialValues = {
        nombre: '',
        descripcion: '',
    }

    const [indice, setIndice] = useState(initialValues);

    const handleModalOpen = () => {
        setIsModalOpen(!isModalOpen)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
        setIndice(initialValues)
    }

    const handleSave = () => {
        dispatch(createCategory(indice));
        setIsModalOpen(false)
        setIndice(initialValues)
    }

    return (
        <>
            <IconButton
                colorScheme="purple"
                _dark={{ bg: "purple.600", color: "white", _hover: { bg: "purple.800" }}}
                aria-label="Agregar"
                icon={<Icon as={VscAdd}
                    fontSize="2xl" />}
                variant="solid"
                onClick={handleModalOpen}
            />
            <Modal isOpen={isModalOpen} onClose={handleModalClose} size="4xl">
                <ModalOverlay/>
                    <ModalContent _dark={{ bg: "#1b1d1e" }}>
                        <ModalHeader textAlign="center">ADD NEW CATEGORY</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Stack spacing={4} direction="column" justifyContent="space-between" p={4}>
                                <FormControl isRequired>
                                    <FormLabel>NAME</FormLabel>
                                    <Input
                                        placeholder="Write name of the category"
                                        type="text"
                                        onChange={(e) => setIndice({ ...indice, nombre: e.target.value })}
                                        textTransform="uppercase"
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>DESCRIPTION</FormLabel>
                                    <Textarea
                                        placeholder="Write a description"
                                        type="text"
                                        onChange={(e) => setIndice({ ...indice, descripcion: e.target.value })}
                                        textTransform="uppercase"
                                    />
                                </FormControl>
                            </Stack>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="gray" size="lg" mr={3} onClick={handleModalClose} variant="outline">
                                CANCEL
                            </Button>
                            <Button colorScheme="purple" _dark={{ bg: "purple.600", color: "white", _hover: { bg: "purple.800" }}} size="lg" mr={3} onClick={handleSave}>
                                SAVE
                            </Button>
                        </ModalFooter>
                    </ModalContent>
            </Modal>
        </>
    )
}

export default ModalAgregarCategoria