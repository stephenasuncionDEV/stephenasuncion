import type { NextPage } from "next";
import NextImage from "next/image";
import ImageStephen from "@/images/me.png";
import {
  Flex,
  Text,
  Wrap,
  Box,
  Heading,
  Center,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAbout } from "@/hooks/useAbout";
import { useProjects } from "@/hooks/useProjects";
import Meta from "@/components/Meta";
import Navbar from "@/components/Navbar";
import Console from "@/components/Console";
import GitActivity from "@/components/GitActivity";
import VSCodeEditor from "@/components/VSCodeEditor";
import PinnedRepo from "@/components/PinnedRepo";

const Home: NextPage = () => {
  const { recentCommit, contributions, totalContributions } = useAbout();
  const { repositories } = useProjects();

  const itemBorderColor = useColorModeValue(
    "1px solid rgb(0 0 0 / 15%)",
    "1px solid rgb(255 255 255 / 15%)",
  );

  const textColor = useColorModeValue("rgba(0,0,0,.8)", "rgba(255,255,255,.6)");

  // const age = Math.floor(
  //   (new Date().valueOf() - new Date("2002-01-24").getTime()) / 3.15576e10,
  // );

  return (
    <Flex flexDir="column" alignItems="center">
      <Meta title="Stephen Asuncion" />
      <Navbar />
      <Box as="main">
        {/* <Flex
          as="section"
          id="welcome"
          flexDir="column"
          alignItems="center"
          minH="100vh"
        >
          <Navbar />
        </Flex> */}
        <Box maxW="1200px" w="full">
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
              <Flex flexDir="column" mt="4em" fontFamily="IBM Plex Sans">
                <Text color={textColor}>Hello 👋🏽</Text>
                <Heading
                  as="h1"
                  fontWeight="700"
                  fontSize="22pt"
                  fontFamily="IBM Plex Sans"
                >
                  I&apos;m{" "}
                  <span style={{ color: "#753FE5" }}>Stephen Asuncion</span>,{" "}
                  <br></br>a Software and Full-Stack Web Developer.
                </Heading>
                <Text
                  mt="1em"
                  fontSize="13pt"
                  fontWeight="400"
                  color={textColor}
                >
                  I am located in Surrey, BC, Canada. I was born in the
                  Philipines and came to Canada when I was 12. Ever since I was
                  a kid, I&apos;ve liked taking things apart and making
                  something new from it. I started coding when I was ten years
                  old, printing messages with batch scripts was my first
                  programming experience. I got into software development using
                  Visual Basic. However, I realized that C# was way more
                  straightforward in terms of syntax. I&apos;ve explored a bit
                  more and I got into memory manipulations which resulted in me
                  learning C++, and then in college, I learned Full-Stack Web
                  Development.
                </Text>
              </Flex>
              <Wrap spacing="1em" mt="4em">
                <Flex flexDir="column" flex="1">
                  <Heading
                    as="h2"
                    textAlign="center"
                    fontSize="18pt"
                    fontWeight="500"
                  >
                    My Education
                  </Heading>
                  <VSCodeEditor
                    mt="1em"
                    folder="Portfolio Website"
                    fileName="education.json"
                    json
                  />
                </Flex>
                <Flex flexDir="column" flex="1">
                  <Heading
                    as="h2"
                    textAlign="center"
                    fontSize="18pt"
                    fontWeight="500"
                  >
                    Recent Commit
                  </Heading>
                  <Console mt="1em" commit={recentCommit} />
                </Flex>
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
                <Wrap spacing="1em">
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
      </Box>
    </Flex>
  );
};

export default Home;
