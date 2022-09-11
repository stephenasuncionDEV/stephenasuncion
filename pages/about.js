import { Flex, HStack, Link, Box, Wrap, Tag, TagLabel, 
    Text, Image, VStack, Center, useColorModeValue 
} from '@chakra-ui/react'
import { useAbout } from '@/hooks/useAbout'
import Navbar from '@/components/Navbar'
import Meta from '@/components/Meta'
import Console from '@/components/Console'
import VSCodeEditor from '@/components/VSCodeEditor'
import Footer from '@/components/Footer'
import GitActivity from '@/components/GitActivity'

const About = () => {
    const { recentCommit, contributions, totalContributions } = useAbout();
    const vscodeBgColor = useColorModeValue('white', 'black');
    const tagBgColor = useColorModeValue('rgb(218, 224, 230)', 'rgb(36,37,39)');

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
                                    src='/assets/me3.png' 
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
                                        {parseInt((new Date() - new Date('2002-01-24').getTime()) / 3.15576e+10)} years old
                                    </Text>
                                    <HStack>
                                        <Link href="https://www.linkedin.com/in/stephenasuncion/" isExternal>
                                            <Image src='https://img.shields.io/badge/LinkedIn-%230077B5.svg?&amp;style=flat-square&amp;logo=linkedin&amp;logoColor=white' alt='LinkedIn Profile' />
                                        </Link>
                                        <Link href="https://twitter.com/Steb_01" isExternal>
                                            <Image src='https://img.shields.io/badge/Twitter-%231DA1F2.svg?&amp;style=flat-square&amp;logo=twitter&amp;logoColor=white' alt='Twitter Profile' />
                                        </Link>
                                        <Link href="https://www.youtube.com/c/StephenAsuncion" isExternal>
                                            <Image src='https://img.shields.io/badge/YouTube-%23FF0000.svg?&amp;style=flat-square&amp;logo=youtube&amp;logoColor=white' alt='Youtube Channel' />
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
                    <Center mt='2em'>
                        <GitActivity contributions={contributions} totalContributions={totalContributions} />
                    </Center>
                    <Text fontSize='24pt' mt='2em' mb='.5em'>
                        Education
                    </Text>
                    <Box p='1em'>
                        <VSCodeEditor 
                            folder='Portfolio Website' 
                            fileName='education.json' 
                            json
                            bg={vscodeBgColor}
                        />
                    </Box>
                    <Text fontSize='24pt' mt='1em' mb='.5em'>
                        Technical Skills
                    </Text>
                    <VStack alignItems='flex-start' spacing='1em' p='1em'>
                        <VStack alignItems='flex-start'>
                            <Tag bg={tagBgColor}>
                                <TagLabel>Programming Languages</TagLabel>
                            </Tag>
                            <Text fontSize='10pt'>
                                Java, Javascript, TypeScript, HTML, CSS, SASS, Python, C++, C#, SQL, PHP, Rust
                            </Text>
                        </VStack>
                        <VStack alignItems='flex-start'>
                            <Tag bg={tagBgColor}>
                                <TagLabel>Technologies</TagLabel>
                            </Tag>
                            <Text fontSize='10pt'>
                                React JS, React Native, MongoDB, Node.js, Express.js, Firebase, Next.js, Web3, Socket.io, Vercel, Heroku, Nelify, Docker, Figma, Adobe Photoshop, Adobe Premiere, Git, Chakra UI, Material UI, GraphQL
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
