import Link from 'next/link'
import { Box, Flex, Wrap, Text, HStack, Button, IconButton, Image, useColorMode } from '@chakra-ui/react'
import { FaGithub, FaDiscord, FaLinkedin, FaDev } from 'react-icons/fa'
import { SiBuymeacoffee } from 'react-icons/si'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Flex
            p='1em'
            justifyContent='space-between'
        >
            <Box>
                <Image src='/assets/bitmoji.webp' alt='Stephen Asuncion Avatar' width='50px' fallbackSrc='https://picsum.photos/50'/>
            </Box>
            <HStack>
                <Link href='/' style={{ textDecoration: 'none' }} passHref>
                    <Button size='sm' variant='transparent'>
                        Home
                    </Button>
                </Link>
                <Link href='#resume' style={{ textDecoration: 'none' }} passHref>
                    <Button size='sm' variant='transparent'>
                        Resume
                    </Button>
                </Link>
                <Link href='#resume' style={{ textDecoration: 'none' }} passHref>
                    <Button size='sm' variant='transparent'>
                        Projects
                    </Button>
                </Link>
                <Link href='#resume' style={{ textDecoration: 'none' }} passHref>
                    <Button size='sm' variant='transparent'>
                        Blog
                    </Button>
                </Link>
                <Link href='#resume' style={{ textDecoration: 'none' }} passHref>
                    <Button size='sm' variant='primary'>
                        Hire Me
                    </Button>
                </Link>
                <IconButton 
                    aria-label='Toggle Color Mode' 
                    icon={colorMode === 'light' ? <MdOutlineDarkMode /> : <MdOutlineLightMode />} 
                    variant='transparent'
                    onClick={toggleColorMode}
                />
            </HStack>
        </Flex>
    )
}

export default Navbar