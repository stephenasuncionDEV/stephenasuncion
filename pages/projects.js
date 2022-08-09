import Head from 'next/head'
import { Flex, HStack, Button, IconButton, Image, useColorMode,
    MenuButton, MenuList, Menu, MenuItem, MenuDivider, Link, Box,
    Wrap, WrapItem, Tag, TagLabel, Text, TagLeftIcon
} from '@chakra-ui/react'
import Navbar from '@/components/Navbar'
import { useProjects } from '@/hooks/useProjects'
import { RiGitRepositoryLine } from 'react-icons/ri'
import { BsFillCircleFill } from 'react-icons/bs'
import { AiOutlineStar } from 'react-icons/ai'
import { BiGitRepoForked } from 'react-icons/bi'

const Projects = () => {
    const { repositories } = useProjects();

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
                    <Wrap justify='center' spacing='1.5em' mt='2em'>
                        {repositories?.filter((repo) => {
                            return ['nfthost','funtime','showoff','stephenasunciondev.github.io','strapgui','swift-shop'].includes(repo.name.toLowerCase()) && repo.owner.login === 'stephenasuncionDEV'
                        })?.map((repo, idx) => (
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
                                    border='1px solid rgb(255 255 255 / 15%)'
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
                                                    'C++': 'rgb(243,75,125)'
                                                }[repo.language || 'JavaScript']} 
                                                fontSize='9pt'
                                                border='1px solid rgba(255,255,255,0.2)'
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
                    </Wrap>
                </Flex>
            </main>
        </Box>
    )
}

export default Projects