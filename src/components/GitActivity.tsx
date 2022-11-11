import { FC } from "react";
import {
  Flex,
  HStack,
  Box,
  Text,
  useColorModeValue,
  VStack,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { Contributions } from "@/hooks/useAbout";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export type ColorScheme = "green" | "orange" | "blue" | "purple";

export interface ActivityBlockProps {
  level: number;
  colorScheme: ColorScheme;
}

export interface GitActivityProps {
  contributions: Contributions;
  totalContributions: number;
  colorScheme: ColorScheme;
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  [styles: string | number | symbol]: any;
}

const ActivityBlock: FC<ActivityBlockProps> = ({ level, colorScheme }) => {
  const level0 = useColorModeValue("rgb(230,230,230)", "#161b22");

  const colorLevels = {
    green: {
      level1: useColorModeValue("#D6E77F", "#0e4429"),
      level2: useColorModeValue("#8AC760", "#006d32"),
      level3: useColorModeValue("#40A43A", "#26a641"),
      level4: useColorModeValue("#19691F", "#39d353"),
    },
    orange: {
      level1: useColorModeValue("#FFEA43", "#5C220D"),
      level2: useColorModeValue("#FFC401", "#AF5B2E"),
      level3: useColorModeValue("#FF9300", "#EA7F36"),
      level4: useColorModeValue("#080426", "#F8DF7B"),
    },
    blue: {
      level1: useColorModeValue("#BBDEFB", "#164164"),
      level2: useColorModeValue("#64B5F6", "#0160B4"),
      level3: useColorModeValue("#1D88E5", "#3590C9"),
      level4: useColorModeValue("#0D47A0", "#43C5FF"),
    },
    purple: {
      level1: useColorModeValue("#ccb2ff", "#2f1361"),
      level2: useColorModeValue("#9763ff", "#320285"),
      level3: useColorModeValue("#5c17e6", "#5f32b8"),
      level4: useColorModeValue("#400ca8", "#753FE5"),
    },
  }[colorScheme];

  return (
    <Box
      w="11px"
      h="11px"
      border="1px solid rgba(255, 255, 255, 0.05)"
      bgColor={
        {
          0: level0,
          1: colorLevels?.level1,
          2: colorLevels?.level2,
          3: colorLevels?.level3,
          4: colorLevels?.level4,
        }[level || 0]
      }
      borderRadius="2px"
      opacity={level === 0 ? ".5" : "1"}
    ></Box>
  );
};

const GitActivity: FC<GitActivityProps> = ({
  contributions,
  totalContributions,
  colorScheme,
  ...styles
}) => {
  const monthsEveryWeek = contributions
    ?.map((cont) => cont[0])
    .map((cont) => {
      const curMonth = cont.date.split("-")[1];
      const curMonthOfWeek = months[parseInt(curMonth) - 1];
      return curMonthOfWeek;
    });

  const repeatedMonths = monthsEveryWeek?.map((item, pos, self) => {
    return item === self[pos + 1] || item === self[pos - 1] ? item : "space";
  });

  const reArrangedMonths = repeatedMonths?.filter((item, pos, self) => {
    return self.findIndex((cont) => item === cont) === pos;
  });

  const itemBorderColor = useColorModeValue(
    "1px solid rgb(0 0 0 / 15%)",
    "1px solid rgb(255 255 255 / 15%)",
  );

  return (
    <Flex flexDir="column" w="full" maxW="896px" gap=".5em" {...styles}>
      <Text alignSelf="flex-start">
        {totalContributions} contributions in the last year
      </Text>
      <Flex
        position="relative"
        flexDir="column"
        border={itemBorderColor}
        p=".5em"
        borderRadius="5px"
        fontSize="9pt"
        overflowX="hidden"
      >
        <HStack px=".5em" my=".5em">
          <VStack spacing="1em">
            <Text>Mon</Text>
            <Text>Wed</Text>
            <Text>Fri</Text>
          </VStack>
          <Flex position="relative" pt="18px" flex="1">
            {reArrangedMonths
              ?.filter((month) => month !== "space")
              ?.map((month, idx) => {
                return (
                  <Text
                    top="-1"
                    position="absolute"
                    key={idx}
                    left={`${repeatedMonths?.indexOf(month) * 15}px`}
                  >
                    {month}
                  </Text>
                );
              })}
            <Flex
              flexDir="column"
              maxH="101px"
              maxW="795px"
              flex="1"
              flexWrap="wrap"
              gap="1"
            >
              {contributions?.length > 0 ? (
                <>
                  {[...Array(contributions.length * 7 - 4)].map((e, idx) => {
                    const curWeek = Math.floor(idx / 7);
                    const curDayOfWeek = idx - 7 * Math.floor(idx / 7);
                    if (!contributions[curWeek][curDayOfWeek]) return;
                    const { contributionCount: cCount } =
                      contributions[curWeek][curDayOfWeek];

                    const getCurLevel = () => {
                      let level = 0;
                      if (cCount > 0 && cCount <= 8) level = 1;
                      else if (cCount > 8 && cCount <= 17) level = 2;
                      else if (cCount > 17 && cCount <= 25) level = 3;
                      else if (cCount > 25) level = 4;
                      return level;
                    };

                    const curLevel = getCurLevel();

                    return (
                      <ActivityBlock
                        key={idx}
                        level={curLevel}
                        colorScheme={colorScheme}
                      />
                    );
                  })}
                </>
              ) : (
                <Center>
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                  />
                </Center>
              )}
            </Flex>
          </Flex>
        </HStack>
        <Flex justifyContent="flex-end" mt=".75em" px=".5em">
          <HStack spacing="1">
            <Text>Less</Text>
            <ActivityBlock level={0} colorScheme={colorScheme} />
            <ActivityBlock level={1} colorScheme={colorScheme} />
            <ActivityBlock level={2} colorScheme={colorScheme} />
            <ActivityBlock level={3} colorScheme={colorScheme} />
            <ActivityBlock level={4} colorScheme={colorScheme} />
            <Text>More</Text>
          </HStack>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default GitActivity;
