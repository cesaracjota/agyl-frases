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
    Select, 
    Stack, 
    Switch, 
    Text, 
    Textarea 
} from '@chakra-ui/react'
import { VscEdit } from 'react-icons/vsc'
import { useDispatch } from 'react-redux';
import { updateFrase } from '../../../features/frases/fraseSlice';

export const ModalEditarFrase = ({ row, categorias }) => {

    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const initialValues = {
        _id: null,
        contenido: '',
        autor: '',
        categoria: '',
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
        dispatch(updateFrase(indice));
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
                                    <FormLabel>DESCRIPTION</FormLabel>
                                    <Textarea
                                        defaultValue={indice ? indice.contenido : ''}
                                        placeholder="Write a description"
                                        type="text"
                                        onChange={(e) => setIndice({ ...indice, contenido: e.target.value })}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>AUTOR</FormLabel>
                                    <Input
                                        defaultValue={indice ? indice.autor : ''}
                                        placeholder="Write name of the category"
                                        type="text"
                                        onChange={(e) => setIndice({ ...indice, autor: e.target.value })}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>CATEGORÍA</FormLabel>
                                    <Select
                                        defaultValue={indice ? indice.categoria : ''}
                                        onChange={(e) => setIndice({...indice, categoria: e.target.value})}
                                    >
                                    {categorias.map((categoria, index) => (
                                        <option key={index} value={categoria?._id}>
                                            {categoria?.nombre}
                                        </option>
                                    ))}
                                    </Select>
                                </FormControl>
                                <Stack direction="row" justifyContent="space-between" w="full">
                                    <Text>ESTADO</Text>
                                    <Switch onChange={(e) => setIndice({ ...indice, estado: e.target.checked })} value={ indice ? indice.estado : null } colorScheme="purple" isChecked = {indice.estado === true ? true : false} size='lg' />
                                </Stack>
                            </Stack>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="red" _dark={{ bg: "red.500", color: "white", _hover: { bg: "red.600" }}} size="lg" mr={3} onClick={handleModalClose}>
                                CANCEL
                            </Button>
                            <Button colorScheme="green" _dark={{ bg: "green.600", color: "white", _hover: { bg: "green.800" }}} size="lg" mr={3} onClick={handleUpdate}>
                                UPDATE
                            </Button>
                        </ModalFooter>
                    </ModalContent>
            </Modal>
        </>
    )
}
