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
    Switch, 
    Text, 
    Textarea 
} from '@chakra-ui/react'
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
                colorScheme="green" 
                _dark={{ bg: "green.600", color: "white", _hover: { bg: "green.800" }}}
                aria-label="Editar" 
                icon={<Icon as={VscEdit} 
                fontSize="2xl" />} 
                variant="solid"
                onClick={() => handleModalOpen(row)}
                ml={2}
            />
            <Modal isOpen={isModalOpen} onClose={handleModalClose} size="4xl">
                <ModalOverlay/>
                    <ModalContent _dark={{ bg: "primary.900" }}>
                        <ModalHeader textAlign="center">ACTUALIZAR CATEGORIA</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Stack spacing={4} direction="column" justifyContent="space-between" p={4}>
                                <FormControl>
                                    <FormLabel>ID</FormLabel>
                                    <Input
                                        defaultValue={indice ? indice._id : ''}
                                        type="text"
                                        readOnly={true}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>NOMBRE</FormLabel>
                                    <Input
                                        defaultValue={indice ? indice.nombre : ''}
                                        placeholder="Escribe el nombre de la categoria"
                                        type="text"
                                        onChange={(e) => setIndice({ ...indice, nombre: e.target.value })}
                                        textTransform="uppercase"
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>DESCRIPCIÓN</FormLabel>
                                    <Textarea
                                        defaultValue={indice ? indice.descripcion : ''}
                                        placeholder="Escribe la descripcion de la categoria"
                                        type="text"
                                        onChange={(e) => setIndice({ ...indice, descripcion: e.target.value })}
                                        textTransform="uppercase"
                                    />
                                </FormControl>
                                <Stack direction="row" justifyContent="space-between" w="full">
                                    <Text>ESTADO</Text>
                                    <Switch onChange={(e) => setIndice({ ...indice, estado: e.target.checked })} value={ indice ? indice.estado : null } colorScheme="purple" isChecked = {indice.estado === true ? true : false} size='lg' />
                                </Stack>
                            </Stack>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="red" _dark={{ bg: "red.500", color: "white", _hover: { bg: "red.600" }}} size="lg" mr={3} onClick={handleModalClose}>
                                CANCELAR
                            </Button>
                            <Button colorScheme="green" _dark={{ bg: "green.600", color: "white", _hover: { bg: "green.800" }}} size="lg" mr={3} onClick={handleUpdate}>
                                ACTUALIZAR
                            </Button>
                        </ModalFooter>
                    </ModalContent>
            </Modal>
        </>
    )
}

export default ModalEditarCategoria