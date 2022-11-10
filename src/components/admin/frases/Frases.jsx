import React, { useEffect } from 'react'
import { Box, Text, HStack, Icon, IconButton, Stack, useColorModeValue } from '@chakra-ui/react'
import { CgExport } from 'react-icons/cg'
import { MdDelete, MdFilterList } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, reset } from '../../../features/categorias/categoriaSlice'
import { SpinnerComponent } from '../../../helpers/spinner'
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'

import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { getAllFrases } from '../../../features/frases/fraseSlice'
import { ModalAgregarFrase } from './ModalAgregarFrase'
import { ModalDetallesFrase } from './ModalDetallesFrase'
import { ModalEditarFrase } from './ModalEditarFrase'
import { customStyles } from '../../../helpers/customStyles'
import { AlertEliminar } from './AlertEliminar'

const Frases = () => {

  const dispatch = useDispatch();

  const themeTable = useColorModeValue('default', 'solarized');

  const { frases, isLoading } = useSelector((state) => state.frases);
  const { categorias } = useSelector((state) => state.categorias);

  let categories = categorias.filter((categoria) => categoria.estado === true);

  useEffect(() => {

    dispatch(getAllFrases())
    dispatch(getCategories());

    return () => {
      dispatch(reset())
    }

  }, [dispatch]);

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

  const columns = [
    {
      name: 'ID',
      selector: row => row._id,
      sortable: true,
      cellExport: row => row._id,
    },
    {
      name: 'CONTENIDO',
      selector: row => row.contenido,
      sortable: true,
      cellExport: row => row.contenido,
      wrap: true,
    },
    {
      name: 'ACCIONES',
      sortable: true,
      export: false,
      center: true,
      cell: row => (
        <div>
          <ModalDetallesFrase frases = { row } />
          <ModalEditarFrase row = { row } categorias = { categories } />
          <AlertEliminar row = { row } />
        </div>
      ),
    }
  ]

  const tableData = {
    columns: columns,
    data: frases,
  }

  if (isLoading) {
    return <SpinnerComponent />
  }

  return (
    <>
      <Box
        borderRadius="sm"
        boxShadow="base"
        overflow="hidden"
        bg="white"
        _dark={{ bg: "primary.800" }}
      >
        <Stack spacing={4} direction="row" justifyContent="space-between" p={4}>
          <HStack spacing={4} direction="row">
            <ModalAgregarFrase categorias = { categories } />
            <IconButton colorScheme="red" _dark={{ bg: "red.600", color: "white", _hover: { bg: "red.700" } }} aria-label='Eliminar' icon={<Icon as={MdDelete} fontSize="2xl" />} variant="solid" rounded="full" />
          </HStack>
          <HStack spacing={4} direction="row">
            <IconButton colorScheme="whatsapp" _dark={{ bg: "whatsapp.600", color: "white", _hover: { bg: "whatsapp.700" } }} aria-label='Filters' icon={<Icon as={MdFilterList} fontSize="2xl" />} variant="ghost" rounded="full" />
            <IconButton colorScheme="messenger" _dark={{ bg: "messenger.600", color: "white", _hover: { bg: "messenger.700" } }} aria-label='Exports' icon={<Icon as={CgExport} fontSize="xl" />} variant="ghost" rounded="full" />
          </HStack>
        </Stack>
      </Box>
      {/* <Box
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
          mt={2}
          spacing={8}
          overflowX={'auto'}
          display="flex"
          css={{
            '::-webkit-scrollbar': {
              display: "contents",
            },
          }}
        >
          {categories.map((categoria) => (
            <CardContenidoFrase key={categoria._id} categoria={categoria} />
          ))}
        </SimpleGrid>
      </Box> */}
      <Box
        borderRadius="sm"
        overflow="hidden"
        boxShadow={'base'}
        bg="white"
        _dark={{ bg: "primary.800" }}
        mt={2}
        pt={2}
      >
        <DataTableExtensions
          {...tableData}
          print={false}
          exportHeaders={true}
          filterPlaceholder="BUSCAR"
          numberOfColumns={7}
          fileName={'FRASES'}
        >
          <DataTable
            defaultSortField="createdAt"
            defaultSortAsc={false}
            defaultSortOrder="desc"
            pagination={true}
            paginationIconFirstPage={< Icon as={FiChevronsLeft} boxSize={6} _dark={{ color: "gray.300" }} />}
            paginationIconLastPage={< Icon as={FiChevronsRight} boxSize={6} _dark={{ color: "gray.300" }} />}
            paginationIconPrevious={< Icon as={FiChevronLeft} boxSize={6} _dark={{ color: "gray.300", _hover: { color: "white" } }} />}
            paginationIconNext={< Icon as={FiChevronRight} boxSize={6} _dark={{ color: "gray.300", _hover: { color: "white" } }} />}
            paginationRowsPerPageOptions={[5, 10, 25, 50]}
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
            customStyles={customStyles}
            noDataComponent={<Text mb={4} fontSize="lg">NO DATA FOUND</Text>}
          />
        </DataTableExtensions>
      </Box>
    </>
  )
}

export default Frases