import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../src/utils/theme'

const MyApp = ({ Component, pageProps }) => {
    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
        </ChakraProvider>
    )
}

export default MyApp
