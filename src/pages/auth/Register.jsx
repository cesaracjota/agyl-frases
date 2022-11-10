import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Center,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Spinner,
    Stack,
    Text,
    useToast,
    HStack,
    Flex,
    Image,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { register, reset } from '../../features/auth/authSlice';
import { ToastChakra } from '../../helpers/toast';

const RegisterPage = () => {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        state => state.auth
    );
    const navigate = useNavigate();
    const toast = useToast();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isError) {
            ToastChakra('Error', message, 'error', 1500, 'top-right');
        }

        if (isSuccess || user) {
            navigate('/inicio');
            ToastChakra('Bienvenido', message, 'success', 1500, 'top-right');
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch, toast]);

    const handleLogin = () => {
        try {
            const userData = {
                nombre,
                correo,
                password,
            };
            dispatch(register(userData));
        } catch (err) {
            toast({
                title: 'Error de conexión',
                description: err,
                status: 'error',
                position: 'top-right',
                variant: 'top-accent',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const content = isLoading ? (
        <Center h={'100vh'} w={'full'}>
            <Stack spacing={4} px={4} direction="column" align={'center'}>
                <Text fontSize="xl" fontWeight="bold">
                    {' '}
                    Registrando Datos ...{' '}
                </Text>
                <Spinner
                    thickness="4px"
                    speed="0.5s"
                    emptyColor="gray.200"
                    color="messenger.500"
                    size="xl"
                />
            </Stack>
        </Center>
    ) : (
        <HStack spacing={2} w={'full'} h={'100vh'} bgImage="https://204.199.168.56/assets/layout/images/lineas-fondo-login.png" px={{ base: 4, lg: 28 }} py={{ base: 14, lg: 20 }}>
            <Flex w="full" h="full" display={{ base: 'none', lg: 'flex' }}>
                <Box justifyContent="center" w="full">
                    <Image
                        objectFit={'cover'}
                        w={'full'}
                        h={'full'}
                        src="https://204.199.168.56/assets/layout/images/pasante1.webp"
                        rounded={'lg'}
                    />
                </Box>
            </Flex>
            <Flex w="full" h="full">
                <Box borderWidth={1} w="full" h="full" px={{ base: 8, lg: 10 }} mr={2} bg="white" _dark={{ bg: 'primary.900' }} alignItems={'center'} justifyContent={'center'} borderRadius="lg" boxShadow={'base'}>
                    <Stack w="full" h="full" spacing={4} alignItems="center" justifyContent="center">
                        <Image src="https://react-material.fusetheme.com/assets/images/logo/logo.svg" w={16} />
                        <Heading textAlign={'center'} fontSize="xl" fontWeight="bold" mt={2}>
                            Sistema de Administración de una API
                        </Heading>
                        <FormControl id="name">
                            <FormLabel>Nombre</FormLabel>
                            <Input 
                                type="text"
                                placeholder="Ingrese el nombre completo"
                                onChange={e => setNombre(e.target.value)} 
                            />
                        </FormControl>
                        <FormControl id="email">
                            <FormLabel>Correo</FormLabel>
                            <Input 
                                type="email"
                                placeholder="Ingrese el correo electrónico"
                                onChange={e => setCorreo(e.target.value)} 
                            />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                placeholder="Ingrese el password"
                                onChange={e => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <Button
                                mt={4}
                                w="full"
                                colorScheme={'messenger'}
                                _dark={{ bg: "messenger.500", color: "white", _hover: { bg: "messenger.700" } }}
                                onClick={handleLogin}
                                disabled={(nombre === '' && correo === '') || (password === '')}
                            >
                                Registrarse
                            </Button>
                        </FormControl>
                        <NavLink to="/login">
                            <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400'}}>
                                ¿Ya tiene una cuenta? Iniciar sesión
                            </Text>
                        </NavLink>
                    </Stack>
                </Box>
            </Flex>
        </HStack>
    );

    return content;
};

export default RegisterPage;
