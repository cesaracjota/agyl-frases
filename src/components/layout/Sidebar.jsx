import React from 'react'
import {
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
import Logo from '../../assets/img/logo.webp'
import { NavLink } from 'react-router-dom';

const NavItem = (props) => {

    const activeLinkcolor = useColorModeValue("#6c0daf", "gray.200");
    const bgActiveLinkColor = useColorModeValue("purple.50", "#27374c");

    const { icon, children, ...rest } = props;

    return (
        <Flex
            align="center"
            px="4"
            pl="4"
            py="3"
            cursor="pointer"
            color="inherit"
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
                    boxSize="4"
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

    const activeLinkcolor = useColorModeValue("#6c0daf", "gray.300");
    const bgActiveLinkColor = useColorModeValue("purple.50", "gray.700")

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
                bg="white"
                _dark={{ bg: "#181a1b" }}
                border
                color="inherit"
                borderRightWidth="1px"
                w="60"
                {...props}
            >
                <Flex px="4" py="5" align="center" direction={'column'}>
                        <NavLink to="/inicio">
                            <Image align={'center'} src={Logo} alt="AgylFrases Logo" boxSize={10} />
                        </NavLink>
                        <Text
                            fontSize="xl"
                            color="brand.500"
                            _dark={{ color: "white" }}
                            fontWeight="extrabold"
                            mt={2}
                        >
                            Agyl API
                        </Text>
                </Flex>
                <Flex
                    direction="column"
                    as="nav"
                    fontSize="sm"
                    color="gray.600"
                    aria-label="Main Navigation"
                >
                    <Link as={NavLink} to="/inicio" _activeLink={{ color: activeLinkcolor, bg: bgActiveLinkColor }} _hover={{ textDecoration: 'none' }}>
                        <NavItem icon={MdHome}>Inicio</NavItem>
                    </Link>
                    <Link as={NavLink} to="/frases" _activeLink={{ color: activeLinkcolor, bg: bgActiveLinkColor }} _hover={{ textDecoration: 'none' }}>
                        <NavItem icon={HiCollection}>Frases</NavItem>
                    </Link>
                    <Link as={NavLink} to="/categorias" _activeLink={{ color: activeLinkcolor, bg: bgActiveLinkColor }} _hover={{ textDecoration: 'none' }}>
                        <NavItem icon={FaClipboardCheck}>Categorias</NavItem>
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
                        <Link as={NavLink} to="/usuarios/usuarios" _activeLink={{ color: activeLinkcolor, bg: bgActiveLinkColor }} _hover={{ textDecoration: 'none' }}>
                            <NavItem pl="12" py="2">
                                Usuarios
                            </NavItem>
                        </Link>
                        <Link as={NavLink} to="/usuarios/settings" _activeLink={{ color: activeLinkcolor, bg: bgActiveLinkColor }} _hover={{ textDecoration: 'none' }}>
                            <NavItem pl="12" py="2">
                                Administradores
                            </NavItem>
                        </Link>
                    </Collapse>
                    <Link as={NavLink} to="/settings" _activeLink={{ color: activeLinkcolor, bg: bgActiveLinkColor }} _hover={{ textDecoration: 'none' }}>
                        <NavItem icon={BsGearFill}>Settings</NavItem>
                    </Link>
                    <Link as={NavLink} to="/acerca-de" _activeLink={{ color: activeLinkcolor, bg: bgActiveLinkColor }} _hover={{ textDecoration: 'none' }}>
                        <NavItem icon={FaRss}>Acerca De</NavItem>
                    </Link>
                </Flex>
            </Box>
        </>
    )
}

export default SidebarContent