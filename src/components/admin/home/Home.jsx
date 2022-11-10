import React, { useEffect } from 'react'
import {
  Box,
  Flex,
  Image,
  Text,
  Stack,
  Button,
  VStack,
  SimpleGrid
} from "@chakra-ui/react";

import { useDispatch, useSelector } from 'react-redux';
import { getRandomFrase } from '../../../features/frases/fraseSlice';
import { CardContenidoFrase } from '../frases/CardContenidoFrase';
import { getCategories } from '../../../features/categorias/categoriaSlice';

const Home = () => {

  const dispatch = useDispatch();

  const { fraseRamdom } = useSelector((state) => state.frases);
  const { categorias } = useSelector((state) => state.categorias);

  const categories = categorias.filter((categoria) => categoria.estado === true);

  useEffect(() => {

    dispatch(getRandomFrase());

    dispatch(getCategories());

  }, [dispatch]);

  return (
    <Flex
      w="full"
      alignItems="center"
      justifyContent="center"
      mb={4}
    >
      <Stack spacing={4} w="full" direction={'column'}>
        <Box mx="auto" rounded="md" shadow="base" bgGradient='linear-gradient(270deg,#d41459,#911a6c)' color="white" w="full" py={4} px={4}>
          <Flex justifyContent="space-between" alignItems="center">
            <Stack spacing={2} w="full" direction={'row'} alignItems="center">
              <Box minW={"60px"} mr={4} rounded={'lg'} bg={'white'} textAlign="center">
                <Image src={'https://img.icons8.com/ios-filled/512/v-live.png'} w={"60px"} alt="logo Agyl" />
              </Box>
              <VStack textAlign="left" align="left">
                <Text fontWeight="bold" fontSize="lg">Welcome to Agyl - API</Text>
                <Text color="gray.100" display={['none', 'none', 'block', 'block']}>{fraseRamdom?.contenido ? fraseRamdom?.contenido : 'no found data'}</Text>
              </VStack>
            </Stack>
            <Button py={5} ml={4} px={6} border="1px" borderColor="white" _hover={{ bg: "gray.50", color: "gray.900" }} variant="outline" rounded="full" size="sm" color="white">Get Started</Button>
          </Flex>
        </Box>
        <Box
          borderRadius="xl"
          mt={2}
          p={4}
          boxShadow={'base'}
          bg="white"
          _dark={{ bg: "primary.800" }}
          w="full"
        >
          <SimpleGrid
            cursor="pointer"
            spacing={4}
            overflowX={'auto'}
            columns={{ base: 1, md: 2, lg: 3 }}
          >
            {categories.map((categoria) => (
              <CardContenidoFrase key={categoria._id} categoria={categoria} />
            ))}
          </SimpleGrid>
        </Box>
      </Stack>
    </Flex>
  )
}

export default Home;