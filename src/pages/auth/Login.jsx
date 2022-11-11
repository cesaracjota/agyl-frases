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
    Checkbox,
    HStack,
    Flex,
    Image,
    Link,
    Icon,
    InputGroup,
    InputLeftElement,
    InputRightElement,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { login, reset } from '../../features/auth/authSlice';
import { ToastChakra } from '../../helpers/toast';
import bgCardAuth from '../../assets/img/bgAuth.webp';
import bgAuth from '../../assets/img/lineas-fondo-auth.png';
import { FaRegUser } from 'react-icons/fa';
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FiLock } from 'react-icons/fi';

const LoginPage = () => {

    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const { ROLE, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isError) {
            ToastChakra('Error', message, 'error', 1500, 'top-right');
        }

        dispatch(reset());

    }, [dispatch, isError, isSuccess, message, navigate, ROLE]);

    const correoUsuario = window.localStorage.getItem('usuario_correo');

    const handleLogin = (e) => {
        e.isDefaultPrevented();
        const userData = {
            correo,
            password,
        };
        if (checked === true) {
            window.localStorage.setItem('usuario_correo', userData.correo);
        } else {
            window.localStorage.removeItem('usuario_correo');
        }
        dispatch(login(userData));
    };

    const [showPassword, setShowPassword] = useState(false);
    const handleShowClick = () => setShowPassword(!showPassword);

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
        <form onSubmit={handleLogin}>
            <HStack spacing={2} w={'full'} h={'100vh'} bgImage={bgAuth} px={{ base: 4, lg: 28 }} py={{ base: 14, lg: 20 }}>
                <Flex w="full" h="full" display={{ base: 'none', lg: 'flex' }}>
                    <Box justifyContent="center" w="full">
                        <Image
                            objectFit={'cover'}
                            w={'full'}
                            h={'full'}
                            src={bgCardAuth}
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
                            <FormControl id="email">
                                <FormLabel mt={4}>Correo Electrónico</FormLabel>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        color="gray.500"
                                        _dark={{ color: 'gray.400' }}
                                        children={ <FaRegUser color="gray.500" fontSize={18} /> }
                                    />
                                    <Input
                                        type="email"
                                        value={correoUsuario ? correoUsuario : correo}
                                        placeholder='Ingrese su correo'
                                        onChange={(e) => setCorreo(e.target.value)}
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        color="gray.500"
                                        _dark={{ color: 'gray.400' }}
                                        children={<FiLock color="gray.500" fontSize={20} />}
                                    />
                                    <Input
                                        type={ showPassword ? "text" : "password" }
                                        placeholder='Ingrese su contraseña'
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <InputRightElement width="3rem">
                                    <Button h="1.75rem" color={'white'} bg="messenger.600" _hover={{ bg: 'messenger.700' }} size="sm" onClick={handleShowClick} >
                                        {showPassword ? <Icon as={ViewIcon} /> : <Icon as={ViewOffIcon} />}
                                    </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Stack direction="row" align={'start'} justifyContent="space-between" w="full" fontSize={'sm'}>
                                <Checkbox
                                    defaultChecked={!correoUsuario ? false : true}
                                    value={checked}
                                    onChange={(e) => setChecked(e.target.checked)}
                                >
                                    Recuerdame
                                </Checkbox>
                                <Link as={NavLink} to="/forgot-password" color='messenger.600' _hover={{ textDecoration: 'none' }}>
                                    ¿Olvidó su contraseña?
                                </Link>
                            </Stack>
                            <FormControl>
                                <Button
                                    w="full"
                                    colorScheme={'messenger'}
                                    _dark={{ bg: "messenger.500", color: "white", _hover: { bg: "messenger.700" } }}
                                    type="submit"
                                    disabled={password === ''}
                                >
                                    Iniciar Sesión
                                </Button>
                            </FormControl>
                            <NavLink to="/register">
                                <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
                                    ¿No tiene una cuenta? Regístrese
                                </Text>
                            </NavLink>
                        </Stack>
                    </Box>
                </Flex>
            </HStack>
        </form>
    );

    return content;
};

export default LoginPage;
