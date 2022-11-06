import React from 'react'
import {
    Avatar,
    Box,
    Collapse,
    Flex,
    Icon,
    Image,
    Link,
    Text,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react'

import { FaClipboardCheck, FaRss } from "react-icons/fa";
import { BsGearFill } from "react-icons/bs";
import { HiCode, HiCollection } from "react-icons/hi";
import { MdHome, MdKeyboardArrowRight } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavItem = (props) => {

    const activeLinkcolor = useColorModeValue("white", "white");
    const bgActiveLinkColor = useColorModeValue("#ffffff1f", "#ffffff1f")

    const { icon, children, ...rest } = props;

    return (
        <Flex
            align="center"
            px="4"
            pl="4"
            py="3"
            cursor="pointer"
            borderRadius="md"
            _hover={{
                bg: bgActiveLinkColor,
                color: activeLinkcolor,
            }}
            role="group"
            fontWeight="semibold"
            transition=".5s ease"
            {...rest}
        >
            {icon && (
                <Icon
                    mx="2"
                    // boxSize={5}
                    fontSize="xl"
                    _groupHover={{
                        color: activeLinkcolor,
                    }}
                    as={icon}
                />
            )}
            {children}
        </Flex>
    );
};


const SidebarContent = (props) => {

    const integrations = useDisclosure();

    const activeLinkcolor = "gray.50";
    const bgActiveLinkColor = "primary.700";

    const { user } = useSelector(state => state.auth);

    return (
        <>
            <Box
                as="nav"
                pos="fixed"
                top="0"
                left="0"
                zIndex="sticky"
                h="full"
                pb="10"
                overflowX="hidden"
                overflowY="auto"
                bg="primary.900"
                border
                color="#fffffff9"
                boxShadow="0px 3px 5px -1px rgba(0,0,0,.2),0px 5px 8px 0px rgba(0,0,0,.14),0px 1px 14px 0px rgba(0,0,0,.12)"
                w="240px"
                {...props}
            >
                <Flex px="2" py="6" direction={'row'} alignItems="center" justifyContent="space-around">
                    <Image src={'https://react-material.fusetheme.com/assets/images/logo/logo.svg'} w={"30px"} alt="logo Agyl" />
                    <Text fontWeight="bold" fontSize="lg" textAlign="center">AgylCode - API</Text>
                    {/* <IconButton 
                        icon={<ArrowLeftIcon />} 
                        fontSize="sm" 
                        _dark={{ bg: "messenger.500", color: "white", _hover: { bg: "messenger.700" } }} 
                        size="sm" 
                        colorScheme="blue"
                    /> */}
                </Flex>

                <Flex px="2" py="4" align="center" direction={'column'} bg="primary.800" borderRadius="lg" mx={2} mt={"10px"} mb={2} boxShadow="2xl">
                    <Avatar 
                        size="xl" 
                        src={'https://ps.w.org/user-avatar-reloaded/assets/icon-128x128.png?rev=2540745'}
                        bg={'transparent'}
                        boxShadow="base"
                    />
                    <Text fontSize="sm" fontWeight="bold" textAlign="center" mt={2} mb={1} textTransform="uppercase">
                        {user?.usuario?.nombre}
                    </Text>
                    <Text fontSize="10px" textAlign="center">
                        {user?.usuario?.role === 'ADMIN_ROLE' ? 'ADMINISTRADOR' : 'USUARIO'}
                    </Text>
                </Flex>
                <Flex
                    direction="column"
                    as="nav"
                    fontSize="sm"
                    mx={2}
                    color="#ffffffa1"
                    aria-label="Main Navigation"
                    borderTopRadius={'3xl'}
                >
                    <Link mb={2} as={NavLink} to="/inicio" _activeLink={{ color: activeLinkcolor, bg: bgActiveLinkColor, borderRadius: 'md' }} _hover={{ textDecoration: 'none', borderRadius: 'md' }}>
                        <NavItem icon={MdHome}>Inicio</NavItem>
                    </Link>
                    <Link mb={2} as={NavLink} to="/categorias" _activeLink={{ color: activeLinkcolor, bg: bgActiveLinkColor, borderRadius: 'md' }} _hover={{ textDecoration: 'none', borderRadius: 'md' }}>
                        <NavItem icon={FaClipboardCheck}>Categorias</NavItem>
                    </Link>
                    <Link mb={2} as={NavLink} to="/frases" _activeLink={{ color: activeLinkcolor, bg: bgActiveLinkColor, borderRadius: 'md' }} _hover={{ textDecoration: 'none', borderRadius: 'md' }}>
                        <NavItem icon={HiCollection}>Frases</NavItem>
                    </Link>
                        <NavItem icon={HiCode} onClick={integrations.onToggle}>
                            Usuarios
                            <Icon
                                as={MdKeyboardArrowRight}
                                ml="auto"
                                transform={integrations.isOpen && "rotate(90deg)"}
                            />
                        </NavItem>
                    <Collapse in={integrations.isOpen}>
                        <Link mb={2} as={NavLink} to="/usuarios/usuarios" _activeLink={{ color: activeLinkcolor, bg: bgActiveLinkColor, borderRadius: 'md' }} _hover={{ textDecoration: 'none', borderRadius: 'md' }}>
                            <NavItem pl="12" py="2">
                                Usuarios
                            </NavItem>
                        </Link>
                        <Link as={NavLink} to="/usuarios/settings" _activeLink={{ color: activeLinkcolor, bg: bgActiveLinkColor, borderRadius: 'md' }} _hover={{ textDecoration: 'none', borderRadius: 'md' }}>
                            <NavItem pl="12" py="2">
                                Administradores
                            </NavItem>
                        </Link>
                    </Collapse>
                    <Link mb={2} as={NavLink} to="/settings" _activeLink={{ color: activeLinkcolor, bg: bgActiveLinkColor, borderRadius: 'md' }} _hover={{ textDecoration: 'none', borderRadius: 'md' }}>
                        <NavItem icon={BsGearFill}>Settings</NavItem>
                    </Link>
                    <Link mb={2} as={NavLink} to="/acerca-de" _activeLink={{ color: activeLinkcolor, bg: bgActiveLinkColor, borderRadius: 'md' }} _hover={{ textDecoration: 'none', borderRadius: 'md' }}>
                        <NavItem icon={FaRss}>Acerca De</NavItem>
                    </Link>
                </Flex>
            </Box>
        </>
    )
}

export default SidebarContent