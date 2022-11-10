import React, { useState } from 'react';
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
} from '@chakra-ui/react'
import { VscAdd } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { createPersona } from '../../../features/personas/personaSlice';

export const ModalAgregarPersona = () => {
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const initialValues = {
        nombre: '',
        correo: '',
        password: '',
        rol: '',
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
        dispatch(createPersona(indice));
        setIsModalOpen(false)
        setIndice(initialValues)
    }

    return (
        <>
            <IconButton
                colorScheme="messenger"
                _dark={{ bg: "messenger.500", color: "white", _hover: { bg: "messenger.600" } }}
                aria-label="Agregar"
                icon={<Icon as={VscAdd} fontSize="2xl" />}
                variant="solid"
                rounded="full"
                onClick={handleModalOpen}
            />
            <Modal isOpen={isModalOpen} onClose={handleModalClose} size="4xl">
                <ModalOverlay />
                <ModalContent _dark={{ bg: "primary.900" }}>
                    <ModalHeader textAlign="center">AGREGAR NUEVA PERSONA</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={4} direction={{ base: "column", lg: "row"}} justifyContent="space-between" p={4}>
                            <FormControl>
                                <FormLabel>NOMBRES</FormLabel>
                                <Input
                                    placeholder="Escribe los nombres"
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, nombre: e.target.value })}
                                />
                            </FormControl>
                        </Stack>
                        <Stack spacing={4} direction={{ base: "column", lg: "row"}} justifyContent="space-between" p={4}>
                            <FormControl>
                                <FormLabel>CORREO</FormLabel>
                                <Input
                                    placeholder="Escribe el correo"
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, correo: e.target.value })}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>PASSWORD</FormLabel>
                                <Input
                                    placeholder="Escribe el password"
                                    type="password"
                                    onChange={(e) => setIndice({ ...indice, password: e.target.value })}
                                />
                            </FormControl>
                        </Stack>
                        <Stack spacing={4} direction={{ base: "column", lg: "row"}} justifyContent="space-between" p={4}>
                            <FormControl>
                                <FormLabel>ROL</FormLabel>
                                <Select
                                    onChange={(e) => setIndice({ ...indice, rol: e.target.value })}
                                    defaultValue={indice.rol = 'USER_ROLE'}
                                >
                                    <option value={'ADMIN_ROLE'}>ADMINISTRADOR</option>
                                    <option value={'USER_ROLE'}>USUARIO</option>
                                </Select>
                            </FormControl>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" _dark={{ bg: "red.500", color: "white", _hover: { bg: "red.600" } }} size="lg" mr={3} onClick={handleModalClose}>
                            CANCELAR
                        </Button>
                        <Button
                            colorScheme="messenger"
                            _dark={{ bg: "messenger.500", color: "white", _hover: { bg: "messenger.600" } }}
                            size="lg"
                            mr={3}
                            onClick={handleSave}
                            disabled={indice.nombre === '' || indice.correo === '' || indice.password === '' || indice.rol === ''}
                        >
                            GUARDAR
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
