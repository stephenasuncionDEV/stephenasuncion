import Head from 'next/head'
import { Flex, HStack, Link, Box, Wrap, Tag, TagLabel, Text, Spinner } from '@chakra-ui/react'
import Navbar from '@/components/Navbar'

const About = () => {
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
                    <Text fontSize='32pt' mt='1em'>
                        About
                    </Text>
                    
                </Flex>
            </main>
        </Box>
    )
}

export default About