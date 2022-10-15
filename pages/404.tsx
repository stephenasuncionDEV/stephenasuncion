import { NextPage } from 'next'
import Link from 'next/link'
import { Box, Flex, Text, Button } from '@chakra-ui/react'
import Navbar from '@/components/Navbar'
import Meta from '@/components/Meta'

const NotFound: NextPage = () => {
    return (
        <Box>
            <Meta title='Stephen Asuncion'/>
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