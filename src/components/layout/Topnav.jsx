import React from 'react'
import {
    Avatar,
    Box,
    Center,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    Flex,
    HStack,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
    useColorModeValue,
    VStack
} from '@chakra-ui/react';
import { AiFillSetting } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi'
import { RiMenu4Fill } from 'react-icons/ri';
import { MdNotifications } from 'react-icons/md';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ColorModeSwitcher } from '../../theme/ColorModeSwitcher';
import SidebarContent from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';

const Topnav = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.auth.user);

    const ROL = {
        ADMIN: 'ADMIN_ROLE',
        USER: 'USER_ROLE',
    }

    const handleLogout = () => {
        dispatch(logout());
        setTimeout(() => {
            navigate('/login');
            dispatch(reset());
        }, 2000);
    }

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Flex
                    as="header"
                    pos={{ base: "fixed", md: "fixed" }}
                    zIndex="2"
                    top="0"
                    align="center"
                    justify="space-between"
                    w={'full'}
                    px="4"
                    color="inherit"
                    py={4}
                    bg="white"
                    _dark={{ bg: "#121a21", boxShadow:"0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -1px rgba(0,0,0,.06)" }}
                    boxShadow="0 3px 6px -1px rgba(0,0,0,.1)"
                >
                    <Drawer
                        isOpen={props.isOpen}
                        onClose={props.onClose}
                        placement="left"
                    >
                        <DrawerOverlay />
                        <DrawerContent>
                            <SidebarContent w="full" borderRight="none" />
                        </DrawerContent>
                    </Drawer>
                    <IconButton
                        aria-label="Menu"
                        display={{ base: "flex", lg: "none" }}
                        onClick={props.onOpen}
                        fontSize="2xl"
                        variant="ghost"
                        icon={<RiMenu4Fill />}
                        size="md"
                    />
                    <Flex alignSelf="center" verticalAlign={'center'} justify={'flex-end'} w={'full'} display="inline-flex">
                        <IconButton
                            size="md"
                            aria-label={'Notificaciones'}
                            marginLeft="2"
                            fontSize="xl"
                            variant={'ghost'}
                            rounded={'full'}
                            colorScheme="gray"
                            icon={<MdNotifications />} />
                        <ColorModeSwitcher />
                        <Menu>
                            <MenuButton>
                                <HStack
                                    alignItems="center"
                                    justifyContent="space-between"
                                    w="full"
                                    rounded="md"
                                    cursor="pointer"
                                >
                                    <VStack
                                        display='none'
                                        alignItems="flex-start"
                                        spacing="1px"
                                    >
                                        <Text fontSize="12px" fontWeight={'bold'} textTransform={'uppercase'}>{user?.usuario?.nombre}</Text>
                                        <Text fontSize="10px" color="gray.700" _dark={{ color: "gray.300"}} textAlign="center">
                                            {user?.usuario?.rol === ROL.ADMIN ? 'ADMINISTRADOR' : 'USUARIO'}
                                        </Text>
                                    </VStack>
                                    <Avatar
                                        alignItems={'center'}
                                        size="sm"
                                        fontSize={'xs'}
                                        cursor="pointer"
                                        fontWeight={'extrabold'}
                                        color={'white'}
                                        bg="messenger.500"
                                        name={user?.usuario?.nombre}
                                        src={'https://ps.w.org/user-avatar-reloaded/assets/icon-128x128.png?rev=2540745'}
                                    />
                                </HStack>
                            </MenuButton>
                            <MenuList
                                bg={useColorModeValue('white', 'primary.800')}
                                borderColor={useColorModeValue('gray.200', 'gray.700')}
                                alignItems={'center'}
                                bgSize={'md'}
                                zIndex="50"
                            >
                                <Center>
                                    <Avatar
                                        mt={1}
                                        size={'lg'}
                                        color={'white'}
                                        fontWeight={'black'}
                                        bg={'messenger.500'}
                                        name={user?.usuario?.nombre}
                                        src={'https://ps.w.org/user-avatar-reloaded/assets/icon-128x128.png?rev=2540745'}
                                        boxShadow={'base'}
                                    />
                                </Center>
                                <Center>
                                    <VStack mt="2">
                                        <Text fontSize="sm" mx={8} fontWeight="bold" textTransform={'uppercase'}>{user?.usuario?.nombre}</Text>
                                        <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.300" }}>{user?.usuario?.correo}</Text>
                                        <Text fontSize="xs" color="gray.600" _dark={{ color: "gray.400" }}>{user?.usuario?.rol === ROL.ADMIN ? 'ADMINISTRADOR' : 'USUARIO'}</Text>
                                    </VStack>
                                </Center>
                                <MenuDivider />
                                <Link as={NavLink} to="/about" _hover={{ textDecoration: 'none' }}>
                                    <MenuItem icon={<FaUserCircle size={20} />}>Mi Perfil</MenuItem>
                                    <MenuItem icon={<AiFillSetting size={20} />} mr={10}>Configuraciones</MenuItem>
                                </Link>
                                <MenuDivider />
                                <MenuItem icon={<FiLogOut size={20} />} onClick={handleLogout}>Cerrar Sesión</MenuItem>
                                {/* <ModalCerrarSesion /> */}
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}

export default Topnav