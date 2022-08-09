import Head from 'next/head'
import { Box, Flex, Wrap, Text, HStack, VStack, Link, IconButton, Image } from '@chakra-ui/react'
import { FaGithub, FaDiscord, FaLinkedin, FaDev } from 'react-icons/fa'
import { SiBuymeacoffee } from 'react-icons/si'
import Navbar from '@/components/Navbar'

const Home = () => {
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
                        <section id='introduction'>
                            <Wrap maxW='1000px' spacing='2em' p='1em' justify='center'>
                                <Flex flexDir='column' justifyContent='center' spacing='1em' alignItems='center'>
                                    <HStack>
                                        <Text fontSize='24pt' textAlign='center'>
                                            Hello, I'm Stephen Asuncion 💎
                                        </Text>
                                    </HStack>
                                    <Image src='https://readme-typing-svg.herokuapp.com?font=comfortaa&amp;color=016EEA&amp;size=24&amp;width=260&amp;center=true&amp;lines=Software+Engineer;Web+Developer;and+Technopreneur!;Nice+to+meet+you...' alt='' />
                                    <Text fontSize='9pt' mt='1em' textAlign='center'>
                                        Check out my socials!
                                    </Text>
                                    <HStack mt='.5em'>
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
                                </Flex>
                                <VStack spacing='1em' alignItems='center'>
                                    <Box borderRadius='50%' border='8px solid rgb(52,140,212)' p='.5em'>
                                        <Image src='/assets/bitmoji.webp' alt='Stephen Asuncion Avatar' width='250px' fallbackSrc='https://picsum.photos/250'/>
                                    </Box>  
                                </VStack>
                            </Wrap>
                        </section>
                    </Flex>
                </Flex>
            </main>
        </Box>
    )
}

export default Home