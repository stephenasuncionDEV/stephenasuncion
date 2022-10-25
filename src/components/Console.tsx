import { FC } from "react";
import {
  Flex,
  HStack,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsFillCircleFill } from "@react-icons/all-files/bs/BsFillCircleFill";

export interface ConsoleTextProps {
  text: string;
}

export interface ConsoleProps {
  commit: string;
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  [styles: string | number | symbol]: any;
}

const ConsoleText: FC<ConsoleTextProps> = ({ text }) => {
  return (
    <VStack
      fontFamily="Inconsolata"
      fontSize="9pt"
      alignItems="flex-start"
      spacing="0"
    >
      <HStack>
        <Text color="rgb(0,186,0)">steph@StebX-Desk</Text>
        <Text color="rgb(175,0,86)">MINGW64</Text>
        <Text color="rgb(149,154,0)">~/Portfolio</Text>
        <Text color="rgb(0,148,143)">(main)</Text>
      </HStack>
      <Text noOfLines={1}>$ {text}</Text>
    </VStack>
  );
};

const Console: FC<ConsoleProps> = ({ commit, ...styles }) => {
  const itemBorderColor = useColorModeValue(
    "1px solid rgb(0 0 0 / 15%)",
    "1px solid rgb(255 255 255 / 15%)",
  );

  return (
    <Flex
      flexDir="column"
      maxW="480px"
      w="full"
      borderRadius="5px"
      border={itemBorderColor}
      {...styles}
    >
      <Flex px=".5em" py=".25em" borderBottom={itemBorderColor}>
        <HStack>
          <BsFillCircleFill color="rgb(251,95,87)" fontSize="10pt" />
          <BsFillCircleFill color="rgb(253,191,45)" fontSize="10pt" />
          <BsFillCircleFill color="rgb(39,203,63)" fontSize="10pt" />
        </HStack>
        <Text textAlign="center" flex="1" fontSize="10pt">
          Console
        </Text>
      </Flex>
      <Flex flex="1" flexDir="column" p=".5em">
        <ConsoleText text="git add ." />
        <ConsoleText
          text={`git commit -m '${commit || "🌻UPDATE: Updated README.md"}'`}
        />
        <ConsoleText text="git push origin main" />
      </Flex>
    </Flex>
  );
};

export default Console;
