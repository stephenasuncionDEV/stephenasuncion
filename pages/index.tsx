import type { NextPage } from 'next'
import NextImage from 'next/image'
import { Flex, Text, Button, Wrap, Box, HStack, Heading, Input, Center, Image, VStack, Link, useColorModeValue, Spinner, Tag, TagLabel } from '@chakra-ui/react'
import { RiGitRepositoryLine } from '@react-icons/all-files/ri/RiGitRepositoryLine'
import { BsFillCircleFill } from '@react-icons/all-files/bs/BsFillCircleFill'
import { AiOutlineStar } from '@react-icons/all-files/ai/AiOutlineStar'
import { BiGitRepoForked } from '@react-icons/all-files/bi/BiGitRepoForked'
import { useAbout } from '@/hooks/useAbout'
import { useProjects } from '@/hooks/useProjects'
import Meta from '@/components/Meta'
import Navbar from '@/components/Navbar'
import Console from '@/components/Console'
import GitActivity from '@/components/GitActivity'
import VSCodeEditor from '@/components/VSCodeEditor'

const Home: NextPage = () => {
    const { recentCommit, contributions, totalContributions } = useAbout();
    const { repositories } = useProjects();

    const vscodeBgColor = useColorModeValue('white', 'black');
    const itemBorderColor = useColorModeValue('1px solid rgb(0 0 0 / 15%)', '1px solid rgb(255 255 255 / 15%)');

    const age = Math.floor((new Date().valueOf() - new Date('2002-01-24').getTime()) / 3.15576e+10);

    return (
        <Flex flexDir='column' alignItems='center'>
            <Meta title='Stephen Asuncion' />
            <Box as='main'>
                <Flex as='section' id='welcome' flexDir='column' alignItems='center' minH='100vh'>
                    <Navbar />
                    
                </Flex>
                <Box maxW='1200px' w='full'>
                    <Flex as='section' id='about' flexDir='column' alignItems='center' minH='100vh' mb='5em' mx='2em'>
                        <Heading as='h2' textAlign='center'>
                            About
                        </Heading>
                        <Center mt='3em'>
                            <Box width='230px' height='230px' pos='relative'>
                                <NextImage 
                                    src='/assets/images/me.png'
                                    alt='Stephen Asuncion'
                                    layout='fill'
                                    objectFit='cover'
                                    style={{
                                        borderRadius: '100%'
                                    }}
                                />
                            </Box>
                        </Center>
                        <Heading as='h2' fontWeight='medium' fontSize='18pt' textAlign='center' mt='2em'>
                            Hello, I'm Stephen Asuncion 👋
                        </Heading>
                        <Text mt='1em' textAlign='center'>
                            I am a software and full-stack web developer located in Surrey, Canada. I was born in the Philipines 
                            and came to Canada when I was 12. Ever since I was a kid, I've liked taking things apart and making 
                            something new. I started coding when I was ten years old, I started with just making a bunch of batch 
                            scripts, and then I got into software development using Visual Basic. Still, I realized that C# was 
                            way more straightforward in terms of syntax. I've explored a bit more and I got into memory manipulations 
                            which resulted in me learning C++, and then when I was in college, I learned Full-Stack Web Development.
                        </Text>
                        <GitActivity 
                            mt='2em'
                            contributions={contributions} 
                            totalContributions={totalContributions} 
                        />
                        <Wrap justify='center' spacing='4em' mt='3em'>
                            <Flex flexDir='column'>
                                <Heading as='h3' textAlign='center' fontSize='16pt' fontWeight='normal'>
                                    Education
                                </Heading>
                                <Console
                                    mt='.5em'
                                    commit={recentCommit} 
                                />
                            </Flex>
                            <Flex flexDir='column'>
                                <Heading as='h3' textAlign='center' fontSize='16pt' fontWeight='normal'>
                                    Recent Commit
                                </Heading>
                                <VSCodeEditor 
                                    mt='.5em'
                                    folder='Portfolio Website' 
                                    fileName='education.json' 
                                    json
                                    bg={vscodeBgColor}
                                />
                            </Flex>
                        </Wrap>
                    </Flex>
                    <Flex as='section' id='projects' flexDir='column' alignItems='center' my='6em' mx='2em'>
                        <Heading as='h2' textAlign='center'>
                            Projects
                        </Heading>
                        <Wrap justify='center' spacing='1em' mt='3em'>
                            {repositories?.length > 0 ? (<>
                                {repositories?.map((repo, idx) => (
                                    <Link 
                                        href={repo.html_url} 
                                        isExternal 
                                        style={{ 
                                            textDecoration: 'none',
                                        }}
                                        maxW='340px'
                                        w='full'
                                        key={idx}
                                    >
                                        <Flex 
                                            flexDir='column'
                                            borderRadius='6px'
                                            border={itemBorderColor}
                                            p='1em'
                                            h='full'
                                            justifyContent='space-between'
                                        > 
                                            <Flex flexDir='column'>
                                                <HStack>
                                                    <RiGitRepositoryLine />
                                                    <Text fontSize='10pt' fontWeight='bold' color='rgb(52,140,212)'>
                                                        {repo.name}
                                                    </Text>
                                                    <Tag variant='outline' size='sm'>
                                                        <TagLabel>
                                                            Public
                                                        </TagLabel>
                                                    </Tag>
                                                </HStack>
                                                <Text fontSize='9pt' mt='1em'>
                                                    {repo.description || 'No Description'}
                                                </Text>
                                            </Flex>
                                            <HStack mt='1em'>
                                                <HStack alignItems='center'>
                                                    <BsFillCircleFill color={{
                                                            'JavaScript': 'rgb(241,224,90)',
                                                            'C++': 'rgb(243,75,125)',
                                                            'TypeScript': 'rgb(49,120,198)',
                                                            'Rust': 'rgb(222,165,132)',
                                                            'Other': 'rgb(237,237,237)'
                                                        }[repo.language || 'JavaScript']} 
                                                        fontSize='9pt'
                                                        style={{ 
                                                            border: '1px solid rgba(255,255,255,0.2)'
                                                        }}
                                                    />
                                                    <Text fontSize='9pt' lineHeight='9pt'>
                                                        {repo.language || 'JavaScript'}
                                                    </Text>
                                                </HStack>
                                                <HStack alignItems='center'>
                                                    <AiOutlineStar fontSize='9pt'/>
                                                    <Text fontSize='9pt' lineHeight='9pt'>
                                                        {repo.stargazers_count.toString() || '0'}
                                                    </Text>
                                                </HStack>
                                                <HStack alignItems='center'>
                                                    <BiGitRepoForked fontSize='9pt'/>
                                                    <Text fontSize='9pt' lineHeight='9pt'>
                                                        {repo.forks_count.toString() || '0'}
                                                    </Text>
                                                </HStack>
                                            </HStack>
                                        </Flex>
                                    </Link>
                                ))}
                            </>) : (
                                <Spinner
                                    thickness='4px'
                                    speed='0.65s'
                                    emptyColor='gray.200'
                                    color='blue.500'
                                    size='xl'
                                />
                            )}
                        </Wrap>
                    </Flex>
                </Box>
            </Box>
        </Flex>
    )
}

export default Home