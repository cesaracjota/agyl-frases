import React from 'react'
import { Box, Container, useDisclosure } from '@chakra-ui/react'
import SidebarContent from './Sidebar';
import Topnav from './Topnav';
// import Footer from '../../components/layout/Footer';

const Dashboard = ({ componente: Component }) => {

    const sidebar = useDisclosure();

    return (
        <>
            <Box as="section" bg="gray.50" _dark={{ bg: "#181a1b" }} minH="100vh">

                <SidebarContent onClose={sidebar.onClose} display={{ base: "none", lg: "unset" }} />

                <Topnav isOpen={sidebar.isOpen} onClose={sidebar.onClose} onOpen={sidebar.onOpen} />

                <Box mt={"100px"} ml={{ base: 0, lg: 60 }} transition=".1s ease">
                    {/* Contenido */}
                    <Container maxW="container.4xl">
                        { Component }
                    </Container>
                    {/* footer */}
                    {/* don't necesary use footer component, it's depend your chose */}
                    {/* <Divider  mt={4}/> */}
                    {/* <Footer/> */}
                </Box>
            </Box>
        </>
    )
}

export default Dashboard;