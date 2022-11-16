import { Props } from "@/interfaces/index";
import {
  FC,
  Children,
  isValidElement,
  cloneElement,
  ReactElement,
} from "react";
import {
  Flex,
  HStack,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { RiRadioButtonLine } from "@react-icons/all-files/ri/RiRadioButtonLine";
import { SiJavascript } from "@react-icons/all-files/si/SiJavascript";
import { HiCode } from "@react-icons/all-files/hi/HiCode";
import { VscJson } from "@react-icons/all-files/vsc/VscJson";
import { useMediaQuery } from "react-responsive";

export interface EditorLineProps {
  number?: number;
  line: string;
  selected?: boolean;
  indent?: number;
}

export interface VSCodeEditorProps {
  folder: string;
  js?: boolean;
  json?: boolean;
  fileName: string;
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  [styles: string | number | symbol]: any;
}

const Editor: FC<Props> = ({ children }) => {
  const childrenWithProps = Children.map(children, (child, idx) => {
    if (isValidElement(child))
      return cloneElement(child as ReactElement<EditorLineProps>, {
        number: idx + 1,
      });
    return child;
  });

  return <Flex flexDir="column">{childrenWithProps}</Flex>;
};

const EditorLine: FC<EditorLineProps> = ({
  number,
  line,
  selected,
  indent,
}) => {
  const selectedColor = useColorModeValue("blackAlpha.400", "#206367");

  return (
    <Flex>
      <Text color="#444d56" mr="1.5em">
        {number && number.toString()}
      </Text>
      <Text
        bg={selected ? selectedColor : "transparent"}
        ml={`${indent?.toString() || "0"}em`}
      >
        {line}
      </Text>
    </Flex>
  );
};

const VSCodeEditor: FC<VSCodeEditorProps> = ({
  folder,
  js,
  json,
  fileName,
  ...styles
}) => {
  const itemBorderColor = useColorModeValue(
    "1px solid rgb(0 0 0 / 15%)",
    "1px solid rgb(255 255 255 / 15%)",
  );
  const isCollapseHeader = useMediaQuery({ query: "(max-width: 403px)" });

  const headerColor = useColorModeValue("#1a202c", "#959da5");

  return (
    <VStack
      alignItems="flex-start"
      fontFamily="Consolas"
      fontSize="10pt"
      borderRadius="5px"
      border={itemBorderColor}
      {...styles}
    >
      <HStack
        alignItems="center"
        color={headerColor}
        borderBottom={itemBorderColor}
        px=".5em"
        py=".25em"
        w="full"
      >
        <RiRadioButtonLine fontSize="12pt" color="#90a4ae" />
        {!isCollapseHeader && <Text noOfLines={1}>{folder} &gt;</Text>}
        <Text noOfLines={1}>src &gt;</Text>
        {js && <SiJavascript color="#ffca28" />}
        {json && <VscJson color="#e0ad2d" />}
        <Text noOfLines={1}>
          {fileName} {js && ">"}
        </Text>
        {js && (
          <>
            <HiCode fontSize="12pt" color="#68b0c9" />
            <Text noOfLines={1}>
              {fileName?.slice(0, fileName?.indexOf("."))}
            </Text>
          </>
        )}
      </HStack>
      <VStack alignItems="flex-start" px="1.5em" pb="1em">
        <Editor>
          <EditorLine line="{" selected />
          <EditorLine
            line='"Course": "Diploma in Computer Studies"'
            indent={2}
          />
          <EditorLine
            line='"School": "Langara College - Vancouver, Canada"'
            indent={2}
          />
          <EditorLine line='"GPA": "3.79/4.33"' indent={2} />
          <EditorLine
            line={`"Awards": "Dean's Honour Roll, 3 Terms"`}
            indent={2}
          />
          <EditorLine line="}" selected />
        </Editor>
      </VStack>
    </VStack>
  );
};
export default VSCodeEditor;
