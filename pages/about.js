import { Flex, HStack, Link, Box, Wrap, Tag, TagLabel, Text, Image, VStack } from '@chakra-ui/react'
import { useAbout } from '@/hooks/useAbout'
import Navbar from '@/components/Navbar'
import Meta from '@/components/Meta'
import Console from '@/components/Console'
import VSCodeEditor from '@/components/VSCodeEditor'
import Footer from '@/components/Footer'

const About = () => {
    const { recentCommit } = useAbout();

    return (
        <Box>
            <Meta />
            <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Flex maxW='1200px' w='full' flex='1' flexDir='column' px='1em'>
                    <Navbar />
                    <Text fontSize='32pt' mt='1em'>
                        About
                    </Text>
                    <Flex flexDir='column' h='full' mt='2em' w='full'>
                        <Wrap spacing='4em'>
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
                            <VStack alignItems='flex-start' flex='1'>
                                <Text fontSize='10pt'>
                                    Recent Commit
                                </Text>
                                <Console data={recentCommit} />
                            </VStack>
                        </Wrap>
                    </Flex>
                    <Text fontSize='24pt' mt='2em' mb='.5em'>
                        Education
                    </Text>
                    <Box p='1em'>
                        <VSCodeEditor 
                            folder='Portfolio Website' 
                            fileName='education.json' 
                            json
                        />
                    </Box>
                    <Text fontSize='24pt' mt='1em' mb='.5em'>
                        Technical Skills
                    </Text>
                    <VStack alignItems='flex-start' spacing='1em' p='1em'>
                        <VStack alignItems='flex-start'>
                            <Tag>
                                <TagLabel>Programming Languages</TagLabel>
                            </Tag>
                            <Text fontSize='10pt'>
                                Java, Javascript, TypeScript, HTML/CSS, Python, C++, C#, SQL, PHP
                            </Text>
                        </VStack>
                        <VStack alignItems='flex-start'>
                            <Tag>
                                <TagLabel>Technologies</TagLabel>
                            </Tag>
                            <Text fontSize='10pt'>
                                React JS, React Native, MongoDB, Node JS, Express JS, Firebase, Next JS, Web3, Socket.IO, Vercel, Docker, Figma, Photoshop, Adobe Premiere, Git
                            </Text>
                        </VStack>
                    </VStack>
                </Flex>
            </main>
            <Footer />
        </Box>
    )
}

export default About
