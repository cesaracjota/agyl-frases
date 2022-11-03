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
        dispatch(reset());
        navigate('/login');
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
                    w="full"
                    px="6"
                    _dark={{ bg: "#181a1b" }}
                    borderBottomWidth="1px"
                    color="inherit"
                    py={4}
                    bg="white"
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
                        ml={-2}
                        variant="ghost"
                        icon={<RiMenu4Fill />}
                        size="lg"
                    />
                    <Flex alignSelf="center" verticalAlign={'center'} justify={'flex-end'} w={'full'} display="inline-flex">
                        <IconButton
                            size="lg"
                            aria-label={'Notificaciones'}
                            marginLeft="2"
                            fontSize="2xl"
                            icon={<MdNotifications />} />
                        <ColorModeSwitcher />
                        <Menu>
                            <MenuButton>
                                <HStack
                                    ml={{ base: 2, md: 2, lg: 2}}
                                    alignItems="center"
                                    justifyContent="space-between"
                                    w="full"
                                    py={{ base: "8px", md: "8px", lg: "6px" }}
                                    px={{ base: 0, md: 0, lg: 2 }}
                                    rounded={{ base: "md", lg: "md" }}
                                    cursor="pointer"
                                    bg={useColorModeValue('#edf2f7', '#FFFFFF14') }
                                    borderWidth={{ base: "none", lg: "1px"}}
                                >
                                    <VStack
                                        display={{ base: 'none', lg: 'flex' }}
                                        alignItems="flex-start"
                                        spacing="1px"
                                    >
                                        <Text fontSize="12px" fontWeight={'bold'} textTransform={'uppercase'}>{user?.usuario?.nombre}</Text>
                                        <Text fontSize="10px" color="gray.700" _dark={{ color: "gray.300"}} textAlign="center">
                                            {user?.usuario?.role === ROL.ADMIN ? 'ADMINISTRADOR' : 'USUARIO'}
                                        </Text>
                                    </VStack>
                                    <Avatar
                                        size="sm"
                                        fontSize={'xs'}
                                        cursor="pointer"
                                        fontWeight={'extrabold'}
                                        color={'white'}
                                        bg={'#6c0daf'}
                                        name={user?.usuario?.nombre}
                                        src={user?.usuario?.img}
                                    />
                                </HStack>
                            </MenuButton>
                            <MenuList
                                bg={useColorModeValue('white', '#181a1b')}
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
                                        bg={'#6c0daf'}
                                        name={user?.usuario?.nombre}
                                        boxShadow={'base'}
                                    />
                                </Center>
                                <Center>
                                    <VStack mt="2">
                                        <Text fontSize="sm" mx={8} fontWeight="bold" textTransform={'uppercase'}>{user?.usuario?.nombre}</Text>
                                        <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.300" }}>{user?.usuario?.correo}</Text>
                                        <Text fontSize="xs" color="gray.600" _dark={{ color: "gray.400" }}>{user?.usuario?.role === ROL.ADMIN ? 'ADMINISTRADOR' : 'USUARIO'}</Text>
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