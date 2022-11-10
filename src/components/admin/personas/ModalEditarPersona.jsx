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
} from '@chakra-ui/react'
import { VscEdit } from 'react-icons/vsc'
import { useDispatch } from 'react-redux';
import { updatePersona } from '../../../features/personas/personaSlice';

export const ModalEditarPersona = ({ row }) => {

    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const initialValues = {
        uid: null,
        nombre: '',
        correo: '',
        password: '',
        rol: '',
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
        dispatch(updatePersona(indice));
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
                ml={1}
            />
            <Modal isOpen={isModalOpen} onClose={handleModalClose} size="4xl">
                <ModalOverlay/>
                    <ModalContent _dark={{ bg: "primary.900" }}>
                        <ModalHeader textAlign="center">ACTUALIZAR PERSONA</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Stack spacing={4} direction="column" justifyContent="space-between" p={4}>
                                <FormControl>
                                    <FormLabel>ID</FormLabel>
                                    <Input
                                        defaultValue={indice ? indice.uid : ''}
                                        type="text"
                                        readOnly={true}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>NOMBRES</FormLabel>
                                    <Input
                                        defaultValue={indice? indice.nombre : ''}
                                        placeholder="Escribe los nombres"
                                        type="text"
                                        onChange={(e) => setIndice({ ...indice, nombre: e.target.value })}
                                    />
                                </FormControl>
                                <Stack spacing={4} direction={{ base: "column", md: "row", lg: "row"}} mt={4}>
                                    <FormControl>
                                        <FormLabel>CORREO</FormLabel>
                                        <Input
                                            defaultValue={indice ? indice.correo : ''}
                                            placeholder="Escribe el correo"
                                            type="text"
                                            onChange={(e) => setIndice({ ...indice, correo: e.target.value })}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>PASSWORD</FormLabel>
                                        <Input
                                            placeholder='Si desea, puede modificar el password'
                                            type="password"
                                            onChange={(e) => setIndice({ ...indice, password: e.target.value })}
                                        />
                                    </FormControl>
                                </Stack>
                                <Stack spacing={4} direction={{ base: "column", lg: "row"}} alignItems="center" mt={4}>
                                    <FormControl>
                                        <FormLabel>ROL</FormLabel>
                                        <Select
                                            defaultValue={indice ? indice.rol : ''}
                                            onChange={(e) => setIndice({...indice, rol: e.target.value})}
                                        >
                                            <option value={'ADMIN_ROLE'}>ADMINISTRADOR</option>
                                            <option value={'USER_ROLE'}>USUARIO</option>
                                        </Select>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>ESTADO</FormLabel>
                                        <Switch 
                                            onChange={(e) => setIndice({ ...indice, estado: e.target.checked })} 
                                            value={ indice ? indice.estado : null } 
                                            colorScheme="purple" 
                                            isChecked = {indice.estado === true ? true : false}
                                            size='lg'
                                            
                                        />
                                    </FormControl>
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
