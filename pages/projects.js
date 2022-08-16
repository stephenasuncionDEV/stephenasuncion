import { Flex, HStack, Link, Box, Wrap, Tag, TagLabel, Text, Spinner, useColorModeValue } from '@chakra-ui/react'
import Navbar from '@/components/Navbar'
import { useProjects } from '@/hooks/useProjects'
import { RiGitRepositoryLine } from 'react-icons/ri'
import { BsFillCircleFill } from 'react-icons/bs'
import { AiOutlineStar } from 'react-icons/ai'
import { BiGitRepoForked } from 'react-icons/bi'
import Meta from '@/components/Meta'
import Footer from '@/components/Footer'

const allowedProjects = [
    'nfthost',
    'emoji.io',
    'showoff',
    'stephenasunciondev.github.io',
    'strapgui',
    'swift-shop'
]

const Projects = () => {
    const { repositories } = useProjects();
    const itemBorderColor = useColorModeValue('1px solid rgb(0 0 0 / 15%)', '1px solid rgb(255 255 255 / 15%)');

    return (
        <Box>
            <Meta />
            <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Flex maxW='1200px' w='full' flex='1' flexDir='column' px='1em'>
                    <Navbar />
                    <Text fontSize='32pt' mt='1em'>
                        Projects
                    </Text>
                    <Wrap justify='center' spacing='1.5em' mt='2em'>
                        {repositories?.length > 0 ? (<>
                            {repositories?.filter((repo) => {
                                return allowedProjects?.includes(repo.name.toLowerCase()) && repo.owner.login === 'stephenasuncionDEV'
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
                                                        'Other': 'rgb(237,237,237)'
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
            </main>
            <Footer />
        </Box>
    )
}

export default Projects