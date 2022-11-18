import { default as NextLink } from "next/link";
import NextImage from "next/image";
import ImageStephen from "@/images/small.png";
import {
  Flex,
  HStack,
  Button,
  IconButton,
  useColorMode,
  MenuButton,
  MenuList,
  Menu,
  MenuItem,
  MenuDivider,
  Link,
  Tag,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import { FiSun } from "@react-icons/all-files/fi/FiSun";
import { FiMoon } from "@react-icons/all-files/fi/FiMoon";
import { useMediaQuery } from "react-responsive";
import { GiHamburgerMenu } from "@react-icons/all-files/gi/GiHamburgerMenu";
import { BiHome } from "@react-icons/all-files/bi/BiHome";
import { BsPerson } from "@react-icons/all-files/bs/BsPerson";
import { BsFolder } from "@react-icons/all-files/bs/BsFolder";
import { BsFillHeartFill } from "@react-icons/all-files/bs/BsFillHeartFill";
import { HiOutlineDocument } from "@react-icons/all-files/hi/HiOutlineDocument";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isTouchingLogo = useMediaQuery({ query: "(max-width: 750px)" });

  const bgColor = useColorModeValue(
    "rgba(255,255,255,.2)",
    "rgba(19,17,28,.8)",
  );

  return (
    <Flex
      w="full"
      justifyContent="center"
      position="fixed"
      bg={bgColor}
      backdropFilter="auto"
      backdropBlur="xl"
      backdropSaturate="1.5"
    >
      <Flex
        p="1em"
        justifyContent="space-between"
        w="full"
        maxW="1200px"
        height="82px"
        position="relative"
      >
        <NextLink
          href="/"
          passHref
          style={{ position: "absolute", left: "16px" }}
        >
          <HStack>
            <NextImage
              src={ImageStephen}
              alt="Stephen Asuncion's Face"
              width={50}
              height={47}
              quality={100}
              blurDataURL="https://via.placeholder.com/150"
              placeholder="blur"
            />
            <Heading as="h1" fontSize="14pt">
              StephenA
            </Heading>
          </HStack>
        </NextLink>
        {!isTouchingLogo ? (
          <>
            <HStack
              spacing="1em"
              position="absolute"
              left="50%"
              ml="-169.045"
              mt="-15px"
              top="50%"
            >
              <NextLink
                href="/"
                shallow
                passHref
                style={{ textDecoration: "none" }}
              >
                <Button size="sm" variant="navbar">
                  Home
                </Button>
              </NextLink>
              <NextLink
                href="#about"
                shallow
                passHref
                style={{ textDecoration: "none" }}
              >
                <Button size="sm" variant="navbar">
                  About
                </Button>
              </NextLink>
              <NextLink
                href="#projects"
                shallow
                passHref
                style={{ textDecoration: "none" }}
              >
                <Button size="sm" variant="navbar">
                  Projects
                </Button>
              </NextLink>
              <Link
                href="https://stephenasuncion.hashnode.dev/"
                isExternal
                variant="navbar"
                style={{ textDecoration: "none" }}
              >
                <Button size="sm" variant="navbar">
                  Blog
                </Button>
                <Tag size="sm" variant="purple">
                  New
                </Tag>
              </Link>
            </HStack>
            <HStack position="absolute" right="16px" mt="-20px" top="50%">
              <NextLink
                href="mailto:stephenasuncion@outlook.com"
                style={{ textDecoration: "none" }}
              >
                <Button size="sm" variant="primary">
                  🚀 Hire Me
                </Button>
              </NextLink>
              <IconButton
                aria-label="Toggle Color Mode"
                icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
                variant="transparent"
                onClick={toggleColorMode}
                _hover={{ color: "gray.500" }}
              />
            </HStack>
          </>
        ) : (
          <Menu>
            <MenuButton
              position="absolute"
              as={IconButton}
              aria-label="Options"
              icon={<GiHamburgerMenu />}
              variant="outline"
              right="16px"
            />
            <MenuList>
              <NextLink href="/" shallow passHref>
                <MenuItem icon={<BiHome />}>Home</MenuItem>
              </NextLink>
              <NextLink href="#about" shallow passHref>
                <MenuItem icon={<BsPerson />}>About</MenuItem>
              </NextLink>
              <NextLink href="#projects" shallow passHref>
                <MenuItem icon={<BsFolder />}>Projects</MenuItem>
              </NextLink>
              <Link
                href="https://stephenasuncion.hashnode.dev/"
                isExternal
                style={{ textDecoration: "none" }}
              >
                <MenuItem icon={<HiOutlineDocument />}>Blog</MenuItem>
              </Link>
              <MenuDivider />
              <NextLink href="mailto:stephenasuncion@outlook.com">
                <MenuItem icon={<BsFillHeartFill color="#E53E3E" />}>
                  Hire Me
                </MenuItem>
              </NextLink>
              <MenuDivider />
              <MenuItem
                icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
                onClick={toggleColorMode}
              >
                {colorMode === "light" ? "Dark Mode" : "Light Mode"}
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
    </Flex>
  );
};

export default Navbar;
