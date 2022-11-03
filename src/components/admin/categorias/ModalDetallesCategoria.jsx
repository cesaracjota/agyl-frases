import React, { useState, useRef } from 'react'
import { 
    Drawer, 
    DrawerBody,
    DrawerContent, 
    DrawerFooter, 
    DrawerHeader, 
    DrawerOverlay,
    IconButton,
    Button,
    Stack,
    Text,
    Divider,
    Badge,
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';

const ModalDetallesCategoria = ({ categoria }) => {

    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const btnRef = useRef()

    const handleOpenDrawer = () => {
        setIsOpenDrawer(true);
    }

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
    }

    return (
        <>
            <IconButton
                aria-label="Ver"
                icon={<Search2Icon />}
                fontSize="xl"
                _dark={{ bg: "blue.600", color: "white", _hover: { bg: "blue.800" } }}
                colorScheme="blue"
                onClick={handleOpenDrawer}
            />
            <Drawer
                isOpen={isOpenDrawer}
                placement='bottom'
                onClose={handleCloseDrawer}
                finalFocusRef={btnRef}
                size="xl"
            >
                <DrawerOverlay />
                <DrawerContent _dark={{ bg: "#1b1d1e" }}>
                    <DrawerHeader fontWeight="bold" bg="purple.600" color="gray.200" textAlign="center">INFORMACIÓN BASICA DE LA CATEGORÍA SELECCIONADA</DrawerHeader>
                    <DrawerBody>
                        <Stack direction="column" mt={6} justifyContent="center" justify="center">
                            <Stack spacing={4} direction={["column", "row", "row", "row"]} justifyContent="space-between">
                                <Text fontWeight="bold">ID:</Text>
                                <Text>{ categoria?._id }</Text>
                            </Stack>
                            <Divider />
                            <Stack spacing={4} direction={["column", "row", "row", "row"]} justifyContent="space-between">
                                <Text fontWeight="bold">NOMBRE:</Text>
                                <Text>{ categoria?.nombre }</Text>
                            </Stack>
                            <Divider />
                            <Stack spacing={4} direction={["column", "row", "row", "row"]} justifyContent="space-between">
                                <Text fontWeight="bold">DESCRIPCIÓN:</Text>
                                <Text>{ categoria?.descripcion }</Text>
                            </Stack>
                            <Divider />
                            <Stack spacing={4} direction={["column", "row", "row", "row"]} justifyContent="space-between">
                                <Text fontWeight="bold">ESTADO:</Text>
                                <Badge
                                    colorScheme={categoria?.estado === true ? 'green' : 'red'}
                                    variant="solid"
                                    px={6}
                                    py={1.5}
                                    rounded="full"
                                >
                                    {categoria?.estado === true ? 'ACTIVO' : 'INACTIVO'}
                                </Badge>
                            </Stack>
                            <Divider />
                            <Stack spacing={4} direction={["column", "row", "row", "row"]} justifyContent="space-between">
                                <Text fontWeight="bold">FECHA CREADA:</Text>
                                <Text>{ categoria?.createdAt }</Text>
                            </Stack>
                            <Divider />
                            <Stack spacing={4} direction={["column", "row", "row", "row"]} justifyContent="space-between">
                                <Text fontWeight="bold">FECHA ACTUALIZADA:</Text>
                                <Text>{ categoria?.updatedAt }</Text>
                            </Stack>
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button colorScheme="purple" _dark={{ bg: "purple.600", color: "white", _hover: { bg: "purple.800" } }} size="lg" onClick={handleCloseDrawer}>
                            OK
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default ModalDetallesCategoria