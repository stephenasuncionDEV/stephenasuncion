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

  // const age = Math.floor(
  //   (new Date().valueOf() - new Date("2002-01-24").getTime()) / 3.15576e10,
  // );

  return (
    <Flex flexDir="column" alignItems="center">
      <Meta title="Stephen Asuncion" />
      <Box as="main">
        <Flex
          as="section"
          id="welcome"
          flexDir="column"
          alignItems="center"
          minH="100vh"
        >
          <Navbar />
        </Flex>
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
              <Heading as="h2" textAlign="center">
                About
              </Heading>
              <Center mt="3em">
                <NextImage
                  src={ImageStephen}
                  alt="Stephen Asuncion"
                  placeholder="blur"
                  width={230}
                  height={230}
                />
              </Center>
              <Heading
                as="h2"
                fontWeight="medium"
                fontSize="18pt"
                textAlign="center"
                mt="2em"
              >
                Hello, I&apos;m Stephen Asuncion 👋
              </Heading>
              <Text mt="1em" textAlign="center">
                I am a software and full-stack web developer located in Surrey,
                Canada. I was born in the Philipines and came to Canada when I
                was 12. Ever since I was a kid, I&apos;ve liked taking things
                apart and making something new. I started coding when I was ten
                years old, I started with just making a bunch of batch scripts,
                and then I got into software development using Visual Basic.
                Still, I realized that C# was way more straightforward in terms
                of syntax. I&apos;ve explored a bit more and I got into memory
                manipulations which resulted in me learning C++, and then when I
                was in college, I learned Full-Stack Web Development.
              </Text>
              <Wrap spacing="1em" mt="3em">
                <Flex flexDir="column" flex="1">
                  <Heading
                    as="h3"
                    textAlign="center"
                    fontSize="16pt"
                    fontWeight="normal"
                  >
                    Education
                  </Heading>
                  <VSCodeEditor
                    mt=".5em"
                    folder="Portfolio Website"
                    fileName="education.json"
                    json
                  />
                </Flex>
                <Flex flexDir="column" flex="1">
                  <Heading
                    as="h3"
                    textAlign="center"
                    fontSize="16pt"
                    fontWeight="normal"
                  >
                    Recent Commit
                  </Heading>
                  <Console mt=".5em" commit={recentCommit} />
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
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="blue.500"
                      size="xl"
                    />
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
