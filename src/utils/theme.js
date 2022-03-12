import { extendTheme } from '@chakra-ui/react'

const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
}

const fonts = {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
}

const theme = extendTheme({
    config,
    fonts
})

export default theme