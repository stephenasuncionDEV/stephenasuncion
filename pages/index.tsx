import type { NextPage } from "next";
import { useState, type ReactElement } from "react";
import {
  Flex,
  Text,
  Wrap,
  WrapItem,
  Box,
  Heading,
  Center,
  Spinner,
  useColorModeValue,
  Button,
  Link,
  Image,
  useMediaQuery,
} from "@chakra-ui/react";
import { useAbout } from "@/hooks/useAbout";
import { useProjects } from "@/hooks/useProjects";
import Meta from "@/components/Meta";
import Navbar from "@/components/Navbar";
import Console from "@/components/Console";
import GitActivity from "@/components/GitActivity";
import VSCodeEditor from "@/components/VSCodeEditor";
import PinnedRepo from "@/components/PinnedRepo";
import Renderer from "@/components/Renderer";
import Filler from "@/components/Filler";
import config from "@/config/index";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin";
import { FaStackOverflow } from "@react-icons/all-files/fa/FaStackOverflow";

export interface ExternalLink {
  name: string;
  href: string | undefined;
  icon: ReactElement;
}

export const externalLinks: ExternalLink[] = [
  {
    name: "GitHub",
    href: "https://github.com/stephenasuncionDEV",
    icon: <FaGithub />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/stephenasuncion/",
    icon: <FaLinkedin />,
  },
  {
    name: "StackOverFlow",
    href: "https://stackoverflow.com/users/19981230/stephen-asuncion",
    icon: <FaStackOverflow />,
  },
];

const Home: NextPage = () => {
  const { recentCommit, contributions, totalContributions } = useAbout();
  const { repositories } = useProjects();
  const [isRoom, setIsRoom] = useState<boolean>(false);

  const itemBorderColor = useColorModeValue(
    "1px solid rgb(0 0 0 / 15%)",
    "1px solid rgb(255 255 255 / 15%)",
  );

  const textColor = useColorModeValue("rgba(0,0,0,.8)", "rgba(255,255,255,.6)");

  const age = Math.floor(
    (new Date().valueOf() - new Date("2002-01-24").getTime()) / 3.15576e10,
  );

  const [isHideSpotify] = useMediaQuery("(max-width: 1630px)");
  const [isHideModel] = useMediaQuery("(max-width: 980px)");

  const spotifyColor = useColorModeValue("black", "white");

  return (
    <Flex flexDir="column" alignItems="center" position="relative">
      <Meta title="Stephen Asuncion" />
      {!isHideSpotify && (
        <Flex position="fixed" bottom="4" right="2">
          <Image
            src={`${config?.clientURL}/api/spotify?v=2&color=${spotifyColor}`}
            alt="Current song stephen is listening to"
            width={300}
            height={26}
          />
        </Flex>
      )}
      <Navbar />
      <Flex as="main" flexDir="column">
        {!isHideModel && (
          <>
            {isRoom ? (
              <Flex h="600px" w="full" mt="82px">
                <Filler>
                  {({ width, height }) => (
                    <Renderer width={width} height={height} />
                  )}
                </Filler>
              </Flex>
            ) : (
              <Center mt="8em">
                <Button
                  variant="outline"
                  maxW="236px"
                  opacity=".2"
                  border="2px dashed white"
                  _hover={{ opacity: 1 }}
                  onClick={() => setIsRoom(true)}
                >
                  Peep my Room 👀
                </Button>
              </Center>
            )}
          </>
        )}
        <Box maxW="1200px" w="full" mt={isHideModel ? "8em" : "3em"}>
          <Flex
            as="section"
            id="about"
            flexDir="column"
            alignItems="center"
            minH="100vh"
            mb="5em"
            mx="2em"
          >
            <Flex flexDir="column" maxW="896px" w="full">
              <Flex flexDir="column" fontFamily="IBM Plex Sans">
                <Text color={textColor}>Hello 👋🏽</Text>
                <Heading
                  as="h1"
                  fontWeight="700"
                  fontSize="22pt"
                  fontFamily="IBM Plex Sans"
                  className="backlight"
                >
                  I&apos;m{" "}
                  <span style={{ color: "#753FE5" }}>Stephen Asuncion</span>,{" "}
                  <br></br>a Full-Stack Software Engineer.
                </Heading>
                <Wrap spacing="1em" mt="1em">
                  {externalLinks?.map((link, idx) => (
                    <Link
                      key={idx}
                      href={link.href}
                      isExternal
                      style={{ textDecoration: "none" }}
                    >
                      <Button variant="outline" size="sm" leftIcon={link.icon}>
                        {link.name}
                      </Button>
                    </Link>
                  ))}
                </Wrap>
                <Text
                  mt="2em"
                  fontSize="13pt"
                  fontWeight="400"
                  color={textColor}
                >
                  I have always had a passion for tinkering and creating. My
                  love for technology began at a young age, and I started
                  learning to code when I was just ten years old. My first
                  experience with programming was using batch scripts to print
                  messages, but I quickly realized the potential of languages
                  like Visual Basic and C#. I later explored memory manipulation
                  techniques in C++, and in college, I expanded my knowledge of
                  software development and learned full-stack web development.
                  Currently, I reside in Surrey, BC, Canada, where I continue to
                  be driven by my love of problem-solving and my desire to
                  create innovative solutions.
                </Text>
              </Flex>
              <Wrap spacing="1em" mt="5em">
                <WrapItem display="flex" flexDir="column" flex="1">
                  <Heading as="h2" fontSize="18pt" fontWeight="500">
                    My Education
                  </Heading>
                  <VSCodeEditor
                    mt="1em"
                    folder="Portfolio Website"
                    fileName="education.json"
                    json
                  />
                </WrapItem>
                <WrapItem display="flex" flexDir="column" flex="1">
                  <Heading as="h2" fontSize="18pt" fontWeight="500">
                    Recent Commit
                  </Heading>
                  <Console mt="1em" commit={recentCommit} />
                </WrapItem>
              </Wrap>
              <GitActivity
                mt="2em"
                contributions={contributions}
                totalContributions={totalContributions}
                colorScheme="purple"
              />
              <Flex
                as="section"
                id="projects"
                flexDir="column"
                alignItems="center"
                my="2em"
              >
                <Heading as="h2" fontSize="18pt" fontWeight="500" w="full">
                  Projects
                </Heading>
                <Wrap spacing="1em" mt="1em">
                  {repositories?.length > 0 ? (
                    <>
                      {repositories?.map((repo, idx) => (
                        <PinnedRepo key={idx} repository={repo} />
                      ))}
                    </>
                  ) : (
                    <Center
                      border={itemBorderColor}
                      h="276px"
                      w="896px"
                      borderRadius="6px"
                    >
                      <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                      />
                    </Center>
                  )}
                </Wrap>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Home;
