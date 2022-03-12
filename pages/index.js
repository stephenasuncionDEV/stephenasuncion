import Head from 'next/head'
import { Box, Flex, Wrap, VStack, Text, HStack, Button, Link, IconButton, Image, Heading, Table, TableCaption, Thead, Tr, Th, Td, Tbody, Tag } from '@chakra-ui/react'
import { FaGithub, FaDiscord, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { FiExternalLink } from 'react-icons/fi'

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
                <Flex flexDir='column' alignItems='center' justifyContent='center' bg='rgb(52,157,255)' py='4em'>
                    <section id='biography'>
                        <VStack spacing='2em' boxShadow='rgb(0 0 0 / 10%) 0px 10px 15px -3px, rgb(0 0 0 / 5%) 0px 4px 6px -2px' p='2em' bg='white' borderRadius='10px' alignItems='flex-start' maxW='800px' minW='800px'>
                            <Box>
                                <header>
                                    <Heading as='h2' size='xl'>
                                        Biography
                                    </Heading>
                                </header>
                                <Text mt='.5em'>
                                    My name is Stephen Asuncion. A 20 year-old student, currently studying at Langara College. I currently live in Richmond, B.C. Canada.
                                </Text>
                            </Box>
                            <Wrap spacing='2em'>
                                <VStack alignItems='flex-start' spacing='0'>
                                    <Text fontWeight='bold'>Education</Text>
                                    <Text fontSize='10pt'>Diploma in Computer Studies</Text>
                                    <Text fontSize='10pt'>Langara College - Vancouver, BC</Text>
                                    <Text fontSize='10pt'>Cumulative GPA: 3.78/4.33</Text>
                                    <Text fontSize='10pt'>Dean's Honour Roll, 2 Terms</Text>
                                    <Text fontSize='10pt'>Third-year</Text>
                                </VStack>
                                <VStack alignItems='flex-start' spacing='0'>
                                    <Text fontWeight='bold'>Interests</Text>
                                    <Text fontSize='10pt'>Computer Programming</Text>
                                    <Text fontSize='10pt'>Web3.0</Text>
                                    <Text fontSize='10pt'>Blockchain</Text>
                                    <Text fontSize='10pt'>RnB &amp; Rap Music</Text>
                                    <Text fontSize='10pt'>Fashion</Text>
                                </VStack>
                                <VStack alignItems='flex-start' spacing='0'>
                                    <Text fontWeight='bold'>Working On</Text>
                                    <Text fontSize='10pt'>SwiftNFT - My personal project. A website that generate nft collections and host mint websites. It was called NFT Host but I'm planning on rebranding.</Text>
                                    <Text fontSize='10pt'>Ambition - Project that I hopped on to. A website that generate and deploy nft collections to the blockchain</Text>
                                </VStack>
                                <VStack alignItems='flex-start' spacing='0'>
                                    <Text fontWeight='bold'>Future Goals</Text>
                                    <Text fontSize='10pt'>My main goal is to have a steady flow of income. I'd be more than happy if I could make my own startup and succeed that way. However, I also dont mind working because the amount of memories are worth it.</Text>
                                </VStack>
                            </Wrap>
                            <HStack justifyContent='flex-end' w='full'>
                                <Text>
                                    My Resume
                                </Text>
                                <Link href='https://docs.google.com/document/d/1H0RL0t0inkynOyhEunfWA4xCw3RuEPXW/edit?usp=sharing&ouid=116340690712468214105&rtpof=true&sd=true' isExternal>
                                    <IconButton aria-label='Stephen Asuncion Resume' icon={<FiExternalLink />} size='sm'/>
                                </Link>
                            </HStack>
                        </VStack>
                    </section>
                    <section id='projects'>
                        <VStack mt='2em' boxShadow='rgb(0 0 0 / 10%) 0px 10px 15px -3px, rgb(0 0 0 / 5%) 0px 4px 6px -2px' p='2em' bg='white' borderRadius='10px' alignItems='flex-start' maxW='800px' minW='800px' spacing='1em'>
                            <header>
                                <Heading as='h2' size='xl'>
                                    Projects
                                </Heading>
                            </header>
                            <Table variant='simple'>
                                <TableCaption>My List of Projects</TableCaption>
                                <Thead>
                                    <Tr>
                                        <Th>Name</Th>
                                        <Th>Description</Th>
                                        <Th>Stack</Th>
                                        <Th>URL</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td>NFT Host</Td>
                                        <Td>Generate and host NFT collections</Td>
                                        <Td>
                                            <Wrap>
                                                <Tag>Next JS</Tag>
                                                <Tag>Express JS</Tag>
                                                <Tag>Chakra UI</Tag>
                                                <Tag>MongoDB</Tag>
                                                <Tag>SASS</Tag>
                                            </Wrap>
                                        </Td>
                                        <Td>
                                            <Link href='https://www.nfthost.app/' isExternal>
                                                <IconButton aria-label='Stephen Asuncion Project 1' icon={<FiExternalLink />} size='sm'/>
                                            </Link>
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Lia Auth</Td>
                                        <Td>API for licensing softwares</Td>
                                        <Td>
                                            <Wrap>
                                                <Tag>React JS</Tag>
                                                <Tag>Express JS</Tag>
                                                <Tag>Node JS</Tag>
                                                <Tag>MongoDB</Tag>
                                            </Wrap>
                                        </Td>
                                        <Td>
                                            <Link href='https://github.com/stephenasuncionDEV/LiaAuth' isExternal>
                                                <IconButton aria-label='Stephen Asuncion Project 2' icon={<FiExternalLink />} size='sm'/>
                                            </Link>
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td>ClubCryptic</Td>
                                        <Td>Web Mutliplayer Game</Td>
                                        <Td>
                                            <Wrap>
                                                <Tag>React JS</Tag>
                                                <Tag>Express JS</Tag>
                                                <Tag>Material UI</Tag>
                                                <Tag>Socket IO</Tag>
                                            </Wrap>
                                        </Td>
                                        <Td>
                                            <Link href='https://github.com/stephenasuncionDEV/ClubCryptic' isExternal>
                                                <IconButton aria-label='Stephen Asuncion Project 3' icon={<FiExternalLink />} size='sm'/>
                                            </Link>
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Showoff</Td>
                                        <Td>Social Media for sharing song lyrics</Td>
                                        <Td>
                                            <Wrap>
                                                <Tag>Javascript</Tag>
                                                <Tag>PHP</Tag>
                                            </Wrap>
                                        </Td>
                                        <Td>
                                            <Link href='https://github.com/stephenasuncionDEV/Showoff' isExternal>
                                                <IconButton aria-label='Stephen Asuncion Project 4' icon={<FiExternalLink />} size='sm'/>
                                            </Link>
                                        </Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </VStack>
                    </section>
                </Flex>
            </main>
        </Box>
    )
}

export default Home