import { FC } from "react";
import {
  Flex,
  Text,
  HStack,
  Link,
  useColorModeValue,
  Tag,
  TagLabel,
  Box,
} from "@chakra-ui/react";
import { RiGitRepositoryLine } from "@react-icons/all-files/ri/RiGitRepositoryLine";
import { AiOutlineStar } from "@react-icons/all-files/ai/AiOutlineStar";
import { BiGitRepoForked } from "@react-icons/all-files/bi/BiGitRepoForked";
import { listUserReposResponse } from "@/hooks/useProjects";

export interface PinnedRepoProps {
  repository: listUserReposResponse["data"][0];
}

const PinnedRepo: FC<PinnedRepoProps> = ({ repository }) => {
  const itemBorderColor = useColorModeValue(
    "1px solid rgb(0 0 0 / 15%)",
    "1px solid rgb(255 255 255 / 15%)",
  );

  const publicOpacity = useColorModeValue("1", ".5");

  return (
    <Link
      href={repository?.html_url}
      isExternal
      style={{
        textDecoration: "none",
      }}
      minW="239px"
      flex="1"
      w="full"
    >
      <Flex
        flexDir="column"
        borderRadius="6px"
        border={itemBorderColor}
        p="1em"
        h="full"
        justifyContent="space-between"
      >
        <Flex flexDir="column">
          <HStack>
            <RiGitRepositoryLine />
            <Text fontSize="10pt" fontWeight="bold" color="rgb(52,140,212)">
              {repository?.name}
            </Text>
            <Tag variant="outline" size="sm" opacity={publicOpacity}>
              <TagLabel lineHeight="12pt">Public</TagLabel>
            </Tag>
          </HStack>
          <Text fontSize="9pt" mt="1em">
            {repository?.description || "No Description"}
          </Text>
        </Flex>
        <HStack mt="1em">
          <HStack alignItems="center">
            <Box
              borderRadius="50%"
              p=".35em"
              bg={
                {
                  JavaScript: "rgb(241,224,90)",
                  "C++": "rgb(243,75,125)",
                  TypeScript: "rgb(49,120,198)",
                  Rust: "rgb(222,165,132)",
                  Other: "rgb(237,237,237)",
                }[repository?.language || "JavaScript"]
              }
            />
            <Text fontSize="9pt" lineHeight="9pt">
              {repository?.language || "JavaScript"}
            </Text>
          </HStack>
          <HStack alignItems="center">
            <AiOutlineStar fontSize="9pt" />
            <Text fontSize="9pt" lineHeight="9pt">
              {repository?.stargazers_count.toString() || "0"}
            </Text>
          </HStack>
          <HStack alignItems="center">
            <BiGitRepoForked fontSize="9pt" />
            <Text fontSize="9pt" lineHeight="9pt">
              {repository?.forks_count.toString() || "0"}
            </Text>
          </HStack>
        </HStack>
      </Flex>
    </Link>
  );
};

export default PinnedRepo;
