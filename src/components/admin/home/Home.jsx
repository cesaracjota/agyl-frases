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

import PieChart from "highcharts-react-official";
import LineChart from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import { useDispatch, useSelector } from 'react-redux';
import { getRandomFrase } from '../../../features/frases/fraseSlice';

require("highcharts/modules/exporting.js")(Highcharts);
require("highcharts/modules/export-data.js")(Highcharts);

const Home = () => {

  const dispatch = useDispatch();

  const { frases } = useSelector((state) => state.frases);

  useEffect(() => {
    dispatch(getRandomFrase());
  }, [ dispatch ]);

  const options = {
    colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572',
      '#FF9655', '#FFF263', '#6AF9C4'],
    chart: {
      backgroundColor: {
        color: '#fff',
      },
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Browser market shares in May, 2020'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
      name: 'Brands',
      // colorByPoint: true,
      data: [{
        name: 'Chrome',
        y: 70.67,
        sliced: true,
        selected: true
      }, {
        name: 'Edge',
        y: 14.77
      }, {
        name: 'Firefox',
        y: 4.86
      }, {
        name: 'Safari',
        y: 2.63
      }, {
        name: 'Internet Explorer',
        y: 1.53
      }, {
        name: 'Opera',
        y: 1.40
      }, {
        name: 'Sogou Explorer',
        y: 0.84
      }, {
        name: 'QQ',
        y: 0.51
      }, {
        name: 'Other',
        y: 2.6
      }]
    }]
  }

  const options2 = {
    colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572',
      '#FF9655', '#FFF263', '#6AF9C4'],
    chart: {
      backgroundColor: {
        color: '#fff',
      },
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'line'
    },

    title: {
      text: 'U.S Solar Employment Growth by Job Category, 2010-2020'
    },

    subtitle: {
      text: 'Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>'
    },

    yAxis: {
      title: {
        text: 'Number of Employees'
      }
    },

    xAxis: {
      accessibility: {
        rangeDescription: 'Range: 2010 to 2020'
      }
    },

    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 2010
      }
    },

    series: [{
      name: 'Installation & Developers',
      data: [43934, 48656, 65165, 81827, 112143, 142383,
        171533, 165174, 155157, 161454, 154610]
    }, {
      name: 'Manufacturing',
      data: [24916, 37941, 29742, 29851, 32490, 30282,
        38121, 36885, 33726, 34243, 31050]
    }, {
      name: 'Sales & Distribution',
      data: [11744, 30000, 16005, 19771, 20185, 24377,
        32147, 30912, 29243, 29213, 25663]
    }, {
      name: 'Operations & Maintenance',
      data: [null, null, null, null, null, null, null,
        null, 11164, 11218, 10077]
    }, {
      name: 'Other',
      data: [21908, 5548, 8105, 11248, 8989, 11816, 18274,
        17300, 13053, 11906, 10073]
    }],

    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }
  }

  return (
    <>
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
                  <Text color="gray.100" display={['none', 'none', 'block', 'block']}>{frases?.contenido ? frases?.contenido : 'no found data'}</Text>
                </VStack>
              </Stack>
              <Button py={5} ml={4} px={6} border="1px" borderColor="white" _hover={{ bg: "gray.50", color: "gray.900" }}  variant="outline" rounded="full" size="sm" color="white">Get Started</Button>
            </Flex>
          </Box>
          <Stack spacing={4} w="full" direction={'column'}>
            <Box mx="auto" rounded="md" borderWidth="1px" w="full" py={4} px={4}>
              <SimpleGrid mx="auto" columns={[1, 1, 1, 1, 2]} spacing={4} w="full" direction={'column'}>
                <PieChart
                  highcharts={Highcharts}
                  options={options}
                // constructorType={'stockChart'}
                />
                <LineChart options={options2} highcharts={Highcharts} />
              </SimpleGrid>
            </Box>
          </Stack>
        </Stack>
      </Flex>
    </>
  )
}

export default Home;