import { Box, Divider, HStack, Icon, IconButton, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { FiMoreVertical } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { SpinnerComponent } from '../../../helpers/spinner'

export const CardContenidoFrase = ({ categoria }) => {

    const { isLoading } = useSelector((state) => state.categorias);

    const bgColors = [
        'linear-gradient(200deg,red.600,red.900)',
        'linear-gradient(200deg,orange.600,orange.900)',
        'linear-gradient(200deg,yellow.600,yellow.900)',
        'linear-gradient(200deg,green.600,green.900)',
        'linear-gradient(200deg,teal.600,teal.900)',
        'linear-gradient(200deg,blue.600,blue.900)',
        'linear-gradient(200deg,cyan.600,cyan.900)',
        'linear-gradient(200deg,purple.600,purple.900)',
        'linear-gradient(200deg,pink.600,pink.900)',
    ]

    const bg = bgColors[Math.floor(Math.random() * bgColors.length)];

    isLoading && <SpinnerComponent />

    return (
        <>
            <Box px={2} pt={2} bgGradient={bg} borderRadius={'2xl'} minW="220px" w="full" justifyContent="center" alignItems="center">
                <HStack spacing={2} direction="row" justifyContent="end">
                    <IconButton
                        colorScheme="whiteAlpha"
                        size={'sm'}
                        aria-label='Eliminar'
                        color={'white'}
                        icon={<Icon as={FiMoreVertical}
                            fontSize="md" _dark={{ color: "white" }} />}
                        variant="ghost"
                        rounded="full" />
                </HStack>
                <Stack px={4} py={14} direction="column" justifyContent="center" alignItems="center">
                    <Text fontSize="6xl" fontWeight="extrabold" color={'white'}>60</Text>
                    <Text fontSize="lg" color={'white'}>Frases</Text>
                </Stack>
                <Divider borderColor={'white'} />
                <Stack spacing={2} px={4} py={4} direction="column" justifyContent="center" alignItems="center">
                    <Text fontSize="md" fontWeight="bold" textAlign="center" color={'white'}>{ categoria.nombre }</Text>
                </Stack>
            </Box>
        </>
    )
}
