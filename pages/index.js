import Head from 'next/head'
import { Box, Flex, Wrap, VStack, Text, HStack, Button, Link, IconButton, Image, Heading, Table, TableCaption, Thead, Tr, Th, Td, Tbody, Tag } from '@chakra-ui/react'
import { FaGithub, FaDiscord, FaInstagram, FaLinkedin, FaDev } from 'react-icons/fa'
import { SiBuymeacoffee } from 'react-icons/si'

const Home = () => {
    return (
        <Box>
            <Head>
                <title>Stephen Asuncion's Portfolio Website</title>
                <meta name="description" content="Stephen Asuncion's Portfolio Website" />
                <link rel="icon" type="image/x-icon" href="/favicon.ico?" />
            </Head>
            <main style={{ minHeight: '100vh' }}>
                <Flex flexDir='column' alignItems='center' justifyContent='center' h='100vh'>
                    <section id='introduction'>
                        <Wrap maxW='1000px' spacing='1em' p='1em' justify='center'>
                            <VStack justifyContent='center' spacing='1em'>
                                <HStack>
                                    <Text fontSize='24pt'>
                                        Hello 👋, I'm
                                    </Text>
                                    <Tag size='lg'>
                                        <Text fontSize='16pt'>
                                            Stephen Asuncion 🚀
                                        </Text>
                                    </Tag>
                                </HStack>
                                {/* <HStack>    
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
                                            Projects Preview
                                        </Button>
                                    </Link>
                                </HStack> */}
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
                                    <Link href='https://www.linkedin.com/in/stephen-allen-asuncion-3735b2176/' isExternal>
                                        <IconButton aria-label='Stephen Asuncion LinkedIn' size='sm' icon={<FaLinkedin />} />
                                    </Link>
                                    <Link href='https://dev.to/stephenasuncion' isExternal>
                                        <IconButton aria-label='Stephen Asuncion Dev' size='sm' icon={<FaDev />} />
                                    </Link>
                                    <Link href='https://www.buymeacoffee.com/' isExternal>
                                        <IconButton aria-label='Stephen Asuncion BuyMeACoffee' size='sm' icon={<SiBuymeacoffee />} />
                                    </Link>
                                </HStack>
                            </VStack>
                            <Box>
                                <Image src='/assets/bitmoji.webp' alt='Stephen Asuncion Avatar' />
                            </Box>
                        </Wrap>
                    </section>
                </Flex>
            </main>
        </Box>
    )
}

export default Home