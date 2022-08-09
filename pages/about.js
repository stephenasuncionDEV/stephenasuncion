import { Flex, HStack, Link, Box, Wrap, Tag, TagLabel, Text, Spinner, Image, VStack } from '@chakra-ui/react'
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
                    <Flex flexDir='column' h='full' mt='2em' w='full'>
                        <Wrap spacing='4em'>
                            <Image 
                                src='/assets/me.jpg' 
                                alt='Picture of Stephen Asuncion' 
                                borderRadius='full' 
                                boxSize='200px' 
                                objectFit='cover' 
                                fallbackSrc='https://picsum.photos/200'
                                p='.5em'
                                border='4px solid rgb(52,140,212)'
                            />
                            <VStack alignItems='flex-start' justifyContent='center'>
                                <Text fontSize='12pt'>
                                    Stephen Allen Palacio Asuncion
                                </Text>
                                <Text fontSize='12pt'>
                                    Vancouver, Canada
                                </Text>
                                <Text fontSize='12pt'>
                                    20 years old
                                </Text>
                                <HStack>
                                    <Link href="https://twitter.com/Steb_01" isExternal>
                                        <Image src='https://img.shields.io/badge/Twitter-%231DA1F2.svg?&amp;style=flat-square&amp;logo=twitter&amp;logoColor=white' alt='Twitter Account' />
                                    </Link>
                                    <Link href="https://www.linkedin.com/in/stephen-allen-asuncion-3735b2176/" isExternal>
                                        <Image src='https://img.shields.io/badge/LinkedIn-%230077B5.svg?&amp;style=flat-square&amp;logo=linkedin&amp;logoColor=white' alt='LinkedIn Account' />
                                    </Link>
                                    <Link href="https://dev.to/stephenasuncion" isExternal>
                                        <Image src='https://img.shields.io/badge/DEV-%23000000.svg?&amp;style=flat-square&amp;logo=dev.to&amp;logoColor=white' alt='Dev Account' />
                                    </Link>
                                    <Link href="https://www.buymeacoffee.com/stephenasuncion" isExternal>
                                        <Image src='https://img.shields.io/badge/BuyMeACoffee-%23FFDD00.svg?&amp;style=flat-square&amp;logo=buy-me-a-coffee&amp;logoColor=black' alt='Dev Account' />
                                    </Link>
                                </HStack>
                            </VStack>
                        </Wrap>
                    </Flex>
                </Flex>
            </main>
        </Box>
    )
}

export default About