import { Flex, HStack, Link, Box, Wrap, Tag, TagLabel, Text, Spinner } from '@chakra-ui/react'
import Navbar from '@/components/Navbar'
import Meta from '@/components/Meta'

const About = () => {
    return (
        <Box>
            <Meta />
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