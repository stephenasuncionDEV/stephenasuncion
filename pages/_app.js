import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { CoreProvider } from '@/providers/CoreProvider'
import theme from '@/utils/theme'

const MyApp = ({ Component, pageProps }) => {
    return (
        <ChakraProvider theme={theme}>
            <CoreProvider>
                <Component {...pageProps} />
            </CoreProvider>
        </ChakraProvider>
    )
}

export default MyApp
