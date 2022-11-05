import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: `'Raleway', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
  colors: {
    primary: {
      500: '#2196f3',
      600: '#1e88e5',
      700: '#ffffff1f',
      800: '#192229',
      900: '#121a21',
      modal: '#1b1d1e',
      1000: '#0f1419',
      1100: '#0d1116',
      1200: '#0b0e13',
      1300: '#090b10',
      1400: '#07080d',
    },
  },
})

export default theme
