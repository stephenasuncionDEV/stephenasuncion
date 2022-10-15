import { default as NextLink } from 'next/link'
import { useRouter } from 'next/router'
import { Flex, HStack, Button, IconButton, Image, useColorMode,
    MenuButton, MenuList, Menu, MenuItem, MenuDivider, Link
 } from '@chakra-ui/react'
import { FiSun } from '@react-icons/all-files/fi/FiSun'
import { FiMoon } from '@react-icons/all-files/fi/FiMoon'
import { useMediaQuery } from 'react-responsive'
import { GiHamburgerMenu } from '@react-icons/all-files/gi/GiHamburgerMenu'
import { BiHome } from '@react-icons/all-files/bi/BiHome'
import { BsPerson } from '@react-icons/all-files/bs/BsPerson'
import { BsFolder } from '@react-icons/all-files/bs/BsFolder'
import { BsFillHeartFill } from '@react-icons/all-files/bs/BsFillHeartFill'
import { HiOutlineDocument } from '@react-icons/all-files/hi/HiOutlineDocument'

const Navbar = () => {
    const router = useRouter();
    const { colorMode, toggleColorMode } = useColorMode();
    const isTouchingLogo = useMediaQuery({ query: '(max-width: 530px)' });
    const route = router.route;

    return (
        <Flex p='1em' justifyContent='space-between' w='full' maxW='1200px'>
            <NextLink href='/' passHref>
                <Image src='/assets/images/bitmoji.png' alt='Stephen Asuncion Avatar' width='50px' fallbackSrc='https://picsum.photos/50' cursor='pointer'/>
            </NextLink>
            {!isTouchingLogo ? (
                <HStack spacing='2em'>
                    <HStack spacing='1em'>
                        <NextLink href='/' shallow passHref style={{ textDecoration: 'none' }}>
                            <Button size='sm' variant='transparent' borderBottom={route === '/' ? '2px dashed rgb(117,63,229)' : 'initial'} borderRadius='0'>
                                Home
                            </Button>
                        </NextLink>
                        <NextLink href='#about' shallow passHref style={{ textDecoration: 'none' }}>
                            <Button size='sm' variant='transparent' borderBottom={route === '/about' ? '2px dashed rgb(117,63,229)' : 'initial'} borderRadius='0'>
                                About
                            </Button>
                        </NextLink>
                        <NextLink href='#projects' shallow passHref style={{ textDecoration: 'none' }}>
                            <Button size='sm' variant='transparent' borderBottom={route === '/projects' ? '2px dashed rgb(117,63,229)' : 'initial'} borderRadius='0'>
                                Projects
                            </Button>
                        </NextLink>
                        <Link href='https://stephenasuncion.hashnode.dev/' isExternal style={{ textDecoration: 'none' }}>
                            <Button size='sm' variant='transparent' borderBottom={route === '/blog' ? '2px dashed rgb(117,63,229)' : 'initial'} borderRadius='0'>
                                Blog
                            </Button>
                        </Link>
                    </HStack>
                    <HStack>
                        <NextLink href='mailto:stephenasuncion@outlook.com' style={{ textDecoration: 'none' }}>
                            <Button size='sm' variant='primary'>
                                🚀 Hire Me
                            </Button>
                        </NextLink>
                        <IconButton 
                            aria-label='Toggle Color Mode' 
                            icon={colorMode === 'light' ? <FiMoon /> : <FiSun />} 
                            variant='transparent'
                            onClick={toggleColorMode}
                        />
                    </HStack>
                </HStack>
            ) : (
                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label='Options'
                        icon={<GiHamburgerMenu />}
                        variant='outline'
                    />
                    <MenuList>
                        <NextLink href='/' shallow passHref>
                            <MenuItem icon={<BiHome />}>
                                Home
                            </MenuItem>
                        </NextLink>
                        <NextLink href='#about' shallow passHref>
                            <MenuItem icon={<BsPerson />}>
                                About
                            </MenuItem>
                        </NextLink>
                        <NextLink href='#projects' shallow passHref>
                            <MenuItem icon={<BsFolder />}>
                                Projects
                            </MenuItem>
                        </NextLink>
                        <Link href='https://stephenasuncion.hashnode.dev/' isExternal style={{ textDecoration: 'none' }}>
                            <MenuItem icon={<HiOutlineDocument />}>
                                Blog
                            </MenuItem>
                        </Link>
                        <MenuDivider />
                            <NextLink href='mailto:stephenasuncion@outlook.com'>
                                <MenuItem icon={<BsFillHeartFill color='#E53E3E' />}>
                                    Hire Me
                                </MenuItem>
                            </NextLink>
                        <MenuDivider />
                        <MenuItem icon={colorMode === 'light' ? <FiMoon /> : <FiSun />} onClick={toggleColorMode}>
                            {colorMode === 'light' ? 'Dark Mode' : 'Light Mode' } 
                        </MenuItem>
                    </MenuList>
                </Menu>
            )}
        </Flex>
    )
}

export default Navbar