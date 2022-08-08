import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}

const fonts = {
    heading: 'Poppins, Inter, sans-serif',
    body: 'Poppins, Inter, sans-serif',
}

const components = {
    Button: {
        baseStyle: (props) => ({
            fontWeight: 'normal'
        }),
        variants: {
            transparent: (props) => ({
                bg: 'transparent',
                _hover: {
                    bg: 'whiteAlpha.100',
                    _disabled: {
                        bg: 'whiteAlpha.100',
                    }
                },
                color: mode('black', 'white')(props),
            }),
            primary: (props) => ({
                bg: 'rgb(52,140,212)',
                _hover: {
                    bg: 'rgb(39,107,163)',
                    _disabled: {
                        bg: 'rgb(39,107,163)',
                    }
                },
                color: 'white',
            }),
            danger: (props) => ({
                bg: 'red.500',
                _hover: {
                    bg: 'red.400',
                    _disabled: {
                        bg: 'red.400',
                    }
                },
                color: 'white',
            }),
        }
    }
}

const theme = extendTheme({
    config,
    fonts,
    components
})

export default theme