import { FC } from "react";
import { Flex, HStack, Text, useColorModeValue } from "@chakra-ui/react";
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
    <Flex fontFamily="Inconsolata" fontSize="9pt" flexDir="column">
      <Text noOfLines={1}>
        <span style={{ color: "rgb(0,186,0)" }}>steph@StebX-Desk</span>{" "}
        <span style={{ color: "rgb(175,0,86)" }}>MINGW64</span>{" "}
        <span style={{ color: "rgb(149,154,0)" }}>~/Portfolio</span>{" "}
        <span style={{ color: "rgb(0,148,143)" }}>(main)</span>
      </Text>
      <Text noOfLines={1}>
        $ <span className={text === "|" ? "blink" : ""}>{text}</span>
      </Text>
    </Flex>
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
      w="full"
      minW="239px"
      height="full"
      borderRadius="5px"
      border={itemBorderColor}
      {...styles}
    >
      <Flex
        px=".5em"
        py=".25em"
        borderBottom={itemBorderColor}
        position="relative"
      >
        <HStack>
          <BsFillCircleFill color="rgb(251,95,87)" fontSize="10pt" />
          <BsFillCircleFill color="rgb(253,191,45)" fontSize="10pt" />
          <BsFillCircleFill color="rgb(39,203,63)" fontSize="10pt" />
        </HStack>
        <Text
          top="0.5"
          left="0"
          right="0"
          flex="1"
          textAlign="center"
          fontSize="10pt"
          position="absolute"
        >
          Console
        </Text>
      </Flex>
      <Flex flexDir="column" p=".5em">
        <ConsoleText text="git add ." />
        <ConsoleText
          text={`git commit -m '${commit || "🚀 UPDATE: updated README.md"}'`}
        />
        <ConsoleText text="git push origin main" />
        <ConsoleText text="|" />
      </Flex>
    </Flex>
  );
};

export default Console;
