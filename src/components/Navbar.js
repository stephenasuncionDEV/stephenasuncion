import Link from 'next/link'
import { Flex, HStack, Button, IconButton, Image, useColorMode,
    MenuButton, MenuList, Menu, MenuItem, MenuDivider
 } from '@chakra-ui/react'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'
import { useMediaQuery } from 'react-responsive'
import { GiHamburgerMenu } from 'react-icons/gi'
import { BiHome } from 'react-icons/bi'
import { BsPerson, BsFolder, BsFillHeartFill } from 'react-icons/bs'
import { HiOutlineDocumentText } from 'react-icons/hi'

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const isTouchingLogo = useMediaQuery({ query: '(max-width: 530px)' });
    
    return (
        <Flex
            p='1em'
            justifyContent='space-between'
        >
            <Link href='/' passHref>
                <Image src='/assets/bitmoji.webp' alt='Stephen Asuncion Avatar' width='50px' fallbackSrc='https://picsum.photos/50' cursor='pointer'/>
            </Link>
            {!isTouchingLogo ? (
                <HStack>
                    <Link href='/' style={{ textDecoration: 'none' }} passHref>
                        <Button size='sm' variant='transparent'>
                            Home
                        </Button>
                    </Link>
                    <Link href='/about' style={{ textDecoration: 'none' }} passHref>
                        <Button size='sm' variant='transparent'>
                            About
                        </Button>
                    </Link>
                    <Link href='/projects' style={{ textDecoration: 'none' }} passHref>
                        <Button size='sm' variant='transparent'>
                            Projects
                        </Button>
                    </Link>
                    <Link href='/blog' style={{ textDecoration: 'none' }} passHref>
                        <Button size='sm' variant='transparent'>
                            Blog
                        </Button>
                    </Link>
                    <Link href='/' style={{ textDecoration: 'none' }} passHref>
                        <Button size='sm' variant='primary'>
                            🚀 Hire Me
                        </Button>
                    </Link>
                    <IconButton 
                        aria-label='Toggle Color Mode' 
                        icon={colorMode === 'light' ? <MdOutlineDarkMode /> : <MdOutlineLightMode />} 
                        variant='transparent'
                        onClick={toggleColorMode}
                    />
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
                        <Link href='/' shallow passHref>
                            <MenuItem icon={<BiHome />}>
                                Home
                            </MenuItem>
                        </Link>
                        <Link href='/about' shallow passHref>
                            <MenuItem icon={<BsPerson />}>
                                About
                            </MenuItem>
                        </Link>
                        <Link href='/projects' shallow passHref>
                            <MenuItem icon={<BsFolder />}>
                                Projects
                            </MenuItem>
                        </Link>
                        <Link href='/blog' shallow passHref>
                            <MenuItem icon={<HiOutlineDocumentText />}>
                                Blog
                            </MenuItem>
                        </Link>
                        <MenuDivider />
                            <Link href='/' shallow passHref>
                                <MenuItem icon={<BsFillHeartFill color='#E53E3E' />}>
                                    Hire Me
                                </MenuItem>
                            </Link>
                        <MenuDivider />
                        <MenuItem icon={colorMode === 'light' ? <MdOutlineDarkMode /> : <MdOutlineLightMode />} onClick={toggleColorMode}>
                            {colorMode === 'light' ? 'Dark Mode' : 'Light Mode' } 
                        </MenuItem>
                    </MenuList>
                </Menu>
            )}
        </Flex>
    )
}

export default Navbar