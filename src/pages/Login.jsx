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
    useColorModeValue,
    Switch,
    HStack,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';
import { ToastChakra } from '../helpers/toast';

const LoginPage = () => {

    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const { ROLE, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const bgCardColor = useColorModeValue('gray.50', 'gray.900');

    useEffect(() => {

        if (isError) {
            ToastChakra('Error', message, 'error', 1500, 'top-right');
        }

        dispatch(reset());

    }, [dispatch, isError, isSuccess, message, navigate, ROLE]);

    const handleLogin = () => {
        try {
            const userData = {
                correo,
                password,
            };
            dispatch(login(userData));
        } catch (err) {
            ToastChakra('Error', err.message, 'error', 3000);
        }
    };

    const content = (isLoading) ? (
        <Center h={'100vh'} w={'full'}>
            <Stack spacing={4} px={4} direction="column" align={'center'}>
                <Text fontSize="xl" fontWeight="bold">
                    {' '}
                    Iniciando Sesión ...{' '}
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
                <Box px={14} py={12} boxShadow="base" borderRadius="md" bg={bgCardColor}>
                    <VStack spacing={4} w="full">
                        <Heading size={'lg'} fontWeight="bold">Welcome to login page!</Heading>
                        <Avatar size="lg" bg="purple.500" />
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
                                disabled={correo === '' || password === ''}
                            >
                                LOGIN
                            </Button>
                        </FormControl>
                        <HStack spacing={4}>
                            <Text fontSize="sm">¿Recordarme la contraseña?</Text>
                            <Switch colorScheme="purple" size="md" />
                        </HStack>
                        <NavLink to="/register">
                            <Text fontSize="sm" color="gray.600">
                                Don't have an account? Sign up
                            </Text>
                        </NavLink>
                    </VStack>
                </Box>
            </Center>
        </Box>
    );

    return content;
};

export default LoginPage;
