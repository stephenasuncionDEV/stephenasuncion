import { Center, Flex, HStack, Text, VStack, Link, IconButton } from '@chakra-ui/react'
import { FaGithub, FaDiscord, FaLinkedin, FaDev } from 'react-icons/fa'
import { SiBuymeacoffee } from 'react-icons/si'

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
                            <Link href='https://github.com/stephenasuncionDEV' isExternal>
                                <IconButton aria-label='Stephen Asuncion Github' size='sm' icon={<FaGithub />} />
                            </Link>
                            <Link href='https://discordapp.com/users/746865227471257702' isExternal>
                                <IconButton aria-label='Stephen Asuncion Discord' size='sm' icon={<FaDiscord />} />
                            </Link>
                            <Link href='https://www.linkedin.com/in/stephenasuncion/' isExternal>
                                <IconButton aria-label='Stephen Asuncion LinkedIn' size='sm' icon={<FaLinkedin />} />
                            </Link>
                            <Link href='https://www.buymeacoffee.com/' isExternal>
                                <IconButton aria-label='Stephen Asuncion BuyMeACoffee' size='sm' icon={<SiBuymeacoffee />} />
                            </Link>
                        </HStack>
                    </Flex>
                </Flex>
            </Center>
        </footer>
    )
}

export default Footer