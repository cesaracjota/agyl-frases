import React, { useState, useEffect } from 'react';
import {
    Avatar,
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
    VStack,
    useToast,
    useColorModeValue,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { register, reset } from '../features/auth/authSlice';

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

    const bgCardColor = useColorModeValue('gray.50', 'gray.900');

    useEffect(() => {
        if (isError) {
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
                variant: 'top-accent',
            });
        }

        if (isSuccess || user) {
            navigate('/inicio');
            toast({
                title: 'Bienvenido',
                description: 'Bienvenido a la aplicación',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
                variant: 'top-accent',
            });
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
                    color="purple.500"
                    size="xl"
                />
            </Stack>
        </Center>
    ) : (
        <Box w={'full'} bg="#1b1d1e">
            <Center h={'100vh'} w={'full}'}>
                <Box
                    px={14}
                    py={8}
                    boxShadow="base"
                    borderRadius="md"
                    bg={bgCardColor}
                >
                    <VStack spacing={2} w="full" mx="auto">
                        <Heading size={'lg'} fontWeight="bold">
                            Welcome to Register Page
                        </Heading>
                        <Avatar size="lg" bg="purple.500" />
                        <FormControl id="name">
                            <FormLabel>Name</FormLabel>
                            <Input type="text" onChange={e => setNombre(e.target.value)} />
                        </FormControl>
                        <FormControl id="email">
                            <FormLabel>Email Address</FormLabel>
                            <Input type="email" onChange={e => setCorreo(e.target.value)} />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                onChange={e => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <Button
                                mt={4}
                                w="full"
                                colorScheme={'purple'}
                                onClick={handleLogin}
                                disabled={(nombre === '' && correo === '') || (password === '')}
                            >
                                REGISTER
                            </Button>
                        </FormControl>
                        <NavLink to="/login">
                            <Text fontSize="sm" color="gray.600">
                                Already have an account? Sign in
                            </Text>
                        </NavLink>
                    </VStack>
                </Box>
            </Center>
        </Box>
    );

    return content;
};

export default RegisterPage;
