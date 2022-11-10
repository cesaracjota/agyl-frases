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
  Textarea 
} from '@chakra-ui/react'
import { VscAdd } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { createFrase } from '../../../features/frases/fraseSlice';
import ModalAgregarCategoria from '../categorias/ModalAgregarCategoria';

export const ModalAgregarFrase = ({ categorias }) => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues = {
    contenido: '',
    autor: '',
    categoria: '',
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
    dispatch(createFrase(indice));
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
          <ModalHeader textAlign="center">AGREGAR NUEVA FRASE</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4} direction="column" justifyContent="space-between" p={4}>
              <FormControl isRequired>
                <FormLabel>CONTENIDO FRASE</FormLabel>
                <Textarea
                  placeholder="Escribe el contenido de la frase"
                  type="text"
                  onChange={(e) => setIndice({ ...indice, contenido: e.target.value })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>AUTOR</FormLabel>
                <Input
                  placeholder="Escribe el nombre del autor"
                  type="text"
                  onChange={(e) => setIndice({ ...indice, autor: e.target.value })}
                />
              </FormControl>
                <FormControl isRequired>
                  <FormLabel>CATEGORIAS</FormLabel>
              <Stack direction="row" justifyContent="space-between" w="full">
                  <Select 
                    placeholder="SELECCIONE UNA CATEGORIA" 
                    onChange={(e) => setIndice({ ...indice, categoria: e.target.value })}
                  >
                    { categorias.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.nombre}
                      </option>
                    ))}
                  </Select>
                <ModalAgregarCategoria />
              </Stack>
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
              disabled={indice.contenido === '' || indice.autor === '' || indice.categoria === ''}
            >
              GUARDAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
