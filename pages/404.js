import Head from 'next/head'
import Link from 'next/link'
import { Box, Flex, Wrap, Text, HStack, VStack, IconButton, Image, Button } from '@chakra-ui/react'
import { FaGithub, FaDiscord, FaLinkedin, FaDev } from 'react-icons/fa'
import { SiBuymeacoffee } from 'react-icons/si'
import Navbar from '@/components/Navbar'

const NotFound = () => {
    return (
        <Box>
            <Head>
                <title>Stephen Asuncion's Portfolio Website</title>
                <meta name="description" content="Stephen Asuncion's Portfolio Website" />
                <link rel="icon" type="image/x-icon" href="/favicon.ico?" />
            </Head>
            <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Flex maxW='1200px' w='full' flex='1' flexDir='column'>
                    <Navbar />
                    <Flex flexDir='column' alignItems='center' justifyContent='center' flex='1'>
                        <Text fontSize='32pt'>
                            404
                        </Text>
                        <Text fontSize='10pt'>
                            This page could not be found
                        </Text>
                        <Link href='/' passHref shallow>
                            <Button size='sm' mt='1.5em'>
                                Go Back
                            </Button>
                        </Link>
                    </Flex>
                </Flex>
            </main>
        </Box>
    )
}

export default NotFound