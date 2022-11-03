import React, { useEffect } from 'react'
import { Badge, Box, Center, Flex, HStack, Icon,IconButton,Spinner,Stack,Text, useColorModeValue } from '@chakra-ui/react'
import Moment from 'moment';
import { MdDelete, MdFilterList, MdFirstPage, MdLastPage } from 'react-icons/md';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';
import { CgExport } from 'react-icons/cg';
import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCategories, deleteCategory, reset } from '../../../features/categorias/categoriaSlice';
import ModalAgregarCategoria from './ModalAgregarCategoria';
import ModalEditarCategoria from './ModalEditarCategoria';
import ModalDetallesCategoria from './ModalDetallesCategoria';

const Categorias = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const themeTable = useColorModeValue('default', 'solarized');

    const { user } = useSelector((state) => state.auth);
    const { categorias, isLoading, isError, message } = useSelector((state) => state.categorias);

    useEffect(() => {
        if(isError) {
            console.log(message);
        }

        if (!user) {
            navigate("/login");
        }

        dispatch(getCategories())

        return () => {
            dispatch(reset())
        }

    }, [user, navigate, isError, message, dispatch]);

    const handleDelete = (id) => {
        if(window.confirm('¿Está seguro de eliminar esta categoría?')) {
            dispatch(deleteCategory(id));
        }
    }

    const columns = [
        {
            cell : row => (
                <div>
                    <ModalDetallesCategoria categoria={row} />
                </div>
            ),
            width: '60px',
        },
        {
            name: 'ID',
            selector: row => row._id,
            sortable: true,
            cellExport: row => row._id,
            resizable: true,
        },
        {
            name: 'NOMBRE',
            selector: row => row.nombre,
            sortable: true,
            cellExport: row => row.nombre,
            resizable: true
        },
        {
            name: 'ESTADO',
            selector: row => { return row.estado === true ? 'ACTIVO' : 'INACTIVO' },
            sortable: true,
            cellExport: row => row.estado === true ? 'ACTIVO' : 'INACTIVO',
            center: true,
            cell: row => (
                <div>
                    <Badge 
                        colorScheme={row.estado === true ? 'green' : 'red'}
                        variant="solid"
                        w={24}
                        textAlign="center"
                        py={1.5}
                        rounded="full"
                    >
                        {row.estado === true ? 'ACTIVO' : 'INACTIVO'}
                    </Badge>
                </div>
            )
        },
        {
            name: 'FECHA CREACIÓN',
            selector: row => Moment(row.createdAt).format('DD/MM/YY hh:mm:ss A'),
            sortable: true,
            cellExport: row => Moment(row.createdAt).format('DD/MM/YY hh:mm:ss A'),
            resizable: true,
        },
        {
            name: 'FECHA ACTUALIZACIÓN',
            selector: row => Moment(row.updatedAt).format('DD/MM/YY hh:mm:ss A'),
            sortable: true,
            cellExport: row => Moment(row.updatedAt).format('DD/MM/YY hh:mm:ss A'),
            resizable: true,
        },
        {
            name: 'ACCIONES',
            sortable: true,
            export: false,
            resizable: true,
            center: true,
            cell : row => (
                <div>
                    <ModalEditarCategoria row={row} />
                    <IconButton
                        aria-label="Eliminar"
                        onClick={() => handleDelete(row?._id)}
                        icon={<Icon as={MdDelete} />}
                        fontSize="2xl"
                        colorScheme="red"
                        color="white"
                        _dark={{ bg: "red.600", color: "white", _hover: { bg: "red.800" }}}
                        ml={3}
                    />
                </div>
            )
        }
    ]

    const tableData = {
        columns: columns,
        data: categorias,
    }

    createTheme('solarized', {
        text: {
            primary: '#FFF',
            secondary: '#FFF',
            tertiary: '#FFF',
            error: '#FFF',
            warning: '#FFF',
        },
        background: {
            default: '##131516',
            hover: '##131516',
            active: '##131516'
        },
        context: {
            background: '##131516',
            text: '#FFF',
        },
        divider: {
            default: '#FFF opacity 92%',
        },
    });

    if (isLoading) {
        return <SpinnerComponent />
    }

    return (
        <>
            <Box
                borderWidth="1px"
                borderRadius="md"
                overflow="hidden"
                bg="white"
                _dark={{ bg: "#131516" }}
                >
                    <Stack spacing={4} direction="row" justifyContent="space-between" p={4}>
                        <HStack spacing={4} direction="row">
                            <ModalAgregarCategoria />
                            <IconButton colorScheme="red" _dark={{ bg: "red.600", color: "white" }} aria-label='Eliminar' icon={<Icon as={MdDelete} fontSize="2xl" />} variant="solid" />
                        </HStack>
                        <HStack spacing={4} direction="row">
                            <IconButton colorScheme="whatsapp" _dark={{ bg: "whatsapp.600", color: "white" }} aria-label='Filters' icon={<Icon as={MdFilterList} fontSize="2xl" />} variant="ghost" rounded="full" />
                            <IconButton colorScheme="messenger" _dark={{ bg: "messenger.600", color: "white" }} aria-label='Exports' icon={<Icon as={CgExport} fontSize="xl" />} variant="ghost" rounded="full" />
                        </HStack>
                    </Stack>
                </Box>
            <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow={'sm'}
                bg="white"
                _dark={{ bg: "#131516" }}
                mt={2}
                pt={6}
                >
                    <DataTableExtensions
                        {...tableData} 
                        print={false}
                        exportHeaders={true}
                        filterPlaceholder="BUSCAR"
                        numberOfColumns={7}
                        fileName={'CATEGORIAS'}
                    >
                        <DataTable
                            defaultSortField = "createdAt"
                            defaultSortAsc={false}
                            defaultSortOrder="desc"
                            pagination={true}
                            paginationIconFirstPage={< Icon as={MdFirstPage} boxSize={6} _dark={{ color: "gray.300"}} />}
                            paginationIconLastPage={< Icon as={MdLastPage} boxSize={6} _dark={{ color: "gray.300"}} />}
                            paginationIconPrevious={< Icon as={IoIosArrowDropleftCircle} boxSize={6} _dark={{ color: "gray.300", _hover: { color: "white" } }} />}
                            paginationIconNext={< Icon as={IoIosArrowDroprightCircle} boxSize={6} _dark={{ color: "gray.300", _hover: { color: "white" } }} />}
                            paginationRowsPerPageOptions={[5 ,10, 25, 50]}
                            paginationPerPage={10}
                            paginationComponentOptions={{
                                rowsPerPageText: 'Filas por pagina:',
                                rangeSeparatorText: 'de',
                                noRowsPerPage: false,
                                selectAllRowsItem: true,
                                selectAllRowsItemText: 'Todos',
                            }}
                            theme={themeTable}
                            pointerOnHover={true}
                            responsive={true}
                            // selectableRows={true}
                            noDataComponent={<Text mb={4} fontSize="lg">NO DATA FOUND</Text>}
                        />
                    </DataTableExtensions>
            </Box>
        </>
    )
}

export default Categorias;


function SpinnerComponent () {

    return (
        <Flex alignItems="center" h={'100%'} w={'full'} justifyContent="center">
            <Center>
                <Stack spacing={4} px={4} direction="column" align={'center'}>
                    <Text fontSize="xl" fontWeight="bold">
                        {' '}
                        Cargando ...{' '}
                    </Text>
                    <Spinner
                        thickness="2px"
                        speed="0.5s"
                        emptyColor="gray.200"
                        color="purple.500"
                        size="xl"
                        variant={'solid'}
                    />
                </Stack>
            </Center>
        </Flex>
    )
}