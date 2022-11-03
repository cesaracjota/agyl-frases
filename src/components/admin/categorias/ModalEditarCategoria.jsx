import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Icon, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Switch, Text, Textarea } from '@chakra-ui/react'
import { VscEdit } from 'react-icons/vsc'
import { useDispatch } from 'react-redux';
import { updateCategories } from '../../../features/categorias/categoriaSlice';

const ModalEditarCategoria = ({ row }) => {

    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const initialValues = {
        _id: null,
        nombre: '',
        descripcion: '',
        estado: null,
    }

    const [indice, setIndice] = useState(initialValues);

    const handleModalOpen = (data) => {
        setIsModalOpen(true);
        setIndice(data);
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
    }

    const handleUpdate = () => {
        dispatch(updateCategories(indice));
        setIsModalOpen(false)
    }

    return (
        <>
            <IconButton 
                colorScheme="purple" 
                _dark={{ bg: "purple.600", color: "white", _hover: { bg: "purple.800" }}}
                aria-label="Editar" 
                icon={<Icon as={VscEdit} 
                fontSize="2xl" />} 
                variant="solid"
                onClick={() => handleModalOpen(row)}
            />
            <Modal isOpen={isModalOpen} onClose={handleModalClose} size="4xl">
                <ModalOverlay/>
                    <ModalContent _dark={{ bg: "#1b1d1e" }}>
                        <ModalHeader textAlign="center">UPDATE CATEGORY</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Stack spacing={4} direction="column" justifyContent="space-between" p={4}>
                                <FormControl>
                                    <FormLabel>ID</FormLabel>
                                    <Input
                                        defaultValue={indice ? indice._id : ''}
                                        placeholder="Write name of the category"
                                        type="text"
                                        readOnly={true}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>NAME</FormLabel>
                                    <Input
                                        defaultValue={indice ? indice.nombre : ''}
                                        placeholder="Write name of the category"
                                        type="text"
                                        onChange={(e) => setIndice({ ...indice, nombre: e.target.value })}
                                        textTransform="uppercase"
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>DESCRIPTION</FormLabel>
                                    <Textarea
                                        defaultValue={indice ? indice.descripcion : ''}
                                        placeholder="Write a description"
                                        type="text"
                                        onChange={(e) => setIndice({ ...indice, descripcion: e.target.value })}
                                        textTransform="uppercase"
                                    />
                                </FormControl>
                                <Stack direction="row" justifyContent="space-between" w="full">
                                    <Text>STATUS</Text>
                                    <Switch onChange={(e) => setIndice({ ...indice, estado: e.target.checked })} value={ indice ? indice.estado : null } colorScheme="purple" isChecked = {indice.estado === true ? true : false} size='lg' />
                                </Stack>
                            </Stack>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="gray" size="lg" mr={3} onClick={handleModalClose} variant="outline">
                                CANCEL
                            </Button>
                            <Button colorScheme="purple" _dark={{ bg: "purple.600", color: "white", _hover: { bg: "purple.800" }}} size="lg" mr={3} onClick={handleUpdate}>
                                UPDATE
                            </Button>
                        </ModalFooter>
                    </ModalContent>
            </Modal>
        </>
    )
}

export default ModalEditarCategoria