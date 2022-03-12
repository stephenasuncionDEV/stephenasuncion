import Head from 'next/head'
import { Box, Flex, Wrap, VStack, Text, HStack, Button, Link, IconButton, Image } from '@chakra-ui/react'
import { FaGithub, FaDiscord, FaInstagram, FaLinkedin } from 'react-icons/fa'

const Home = () => {
    return (
        <Box>
            <Head>
                <title>Stephen Asuncion</title>
                <meta name="description" content="Stephen Asuncion's Portfolio Website" />
                <link rel="icon" type="image/x-icon" href="/favicon.ico?" />
            </Head>
            <main style={{ minHeight: '100vh' }}>
                <Flex flexDir='column' alignItems='center' justifyContent='center' h='100vh'>
                    <section id='introduction'>
                        <Wrap maxW='1000px' spacing='1em' p='1em' justify='center'>
                            <VStack justifyContent='center' spacing='1em'>
                                <Text fontSize='24pt'>
                                    Hello, I'm
                                    <span style={{ color: 'rgb(52,157,255)' }}>
                                        &nbsp;Stephen Asuncion 🚀
                                    </span>
                                </Text>
                                <HStack>    
                                    <Link href='#biography'>
                                        <Button size='sm'>
                                            Biography
                                        </Button>
                                    </Link>
                                    <Link href='#projects'>
                                        <Button size='sm'>
                                            Projects
                                        </Button>
                                    </Link>
                                    <Link href='#preview'>
                                        <Button size='sm'>
                                            Preview
                                        </Button>
                                    </Link>
                                </HStack>
                                <Text fontSize='10pt'>
                                    Check out my socials!
                                </Text>
                                <HStack>
                                    <Link href='https://github.com/stephenasuncionDEV' isExternal>
                                        <IconButton aria-label='Stephen Asuncion Github' size='sm' icon={<FaGithub />} />
                                    </Link>
                                    <Link href='https://discordapp.com/users/746865227471257702' isExternal>
                                        <IconButton aria-label='Stephen Asuncion Discord' size='sm' icon={<FaDiscord />} />
                                    </Link>
                                    <Link href='https://www.instagram.com/stephenasuncion/' isExternal>
                                        <IconButton aria-label='Stephen Asuncion Instagram' size='sm' icon={<FaInstagram />} />
                                    </Link>
                                    <Link href='https://www.linkedin.com/in/stephen-allen-asuncion-3735b2176/' isExternal>
                                        <IconButton aria-label='Stephen Asuncion LinkedIn' size='sm' icon={<FaLinkedin />} />
                                    </Link>
                                </HStack>
                            </VStack>
                            <Box>
                                <Image src='/bitmoji.png' alt='Stephen Asuncion Avatar' />
                            </Box>
                        </Wrap>
                    </section>
                </Flex>
            </main>
        </Box>
    )
}

export default Home