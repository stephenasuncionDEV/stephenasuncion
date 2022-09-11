import { Center, Flex, HStack, Text, Link, IconButton } from '@chakra-ui/react'
import { FaGithub, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer>
            <Center mt='4em' mb='2em'>
                <Flex flexDir='column' maxW='1200px' w='full' px='1em'>
                    <Flex justifyContent='space-between'>
                        <Text>
                            © {new Date().getFullYear()} Stephen Asuncion
                        </Text>
                        <HStack>
                            <Link href='https://www.linkedin.com/in/stephenasuncion/' isExternal>
                                <IconButton aria-label='Stephen Asuncion LinkedIn' size='sm' icon={<FaLinkedin />} />
                            </Link>
                            <Link href='https://github.com/stephenasuncionDEV' isExternal>
                                <IconButton aria-label='Stephen Asuncion Github' size='sm' icon={<FaGithub />} />
                            </Link>
                            <Link href='https://twitter.com/Steb_01' isExternal>
                                <IconButton aria-label='Stephen Asuncion Twitter' size='sm' icon={<FaTwitter />} />
                            </Link>
                            <Link href='https://www.youtube.com/c/StephenAsuncion' isExternal>
                                <IconButton aria-label='Stephen Asuncion Youtube' size='sm' icon={<FaYoutube />} />
                            </Link>
                        </HStack>
                    </Flex>
                </Flex>
            </Center>
        </footer>
    )
}

export default Footer