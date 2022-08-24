import { Flex, HStack, Text, VStack, useColorModeValue } from '@chakra-ui/react'
import { MdOutlineRadioButtonChecked } from 'react-icons/md'
import { SiJavascript } from 'react-icons/si'
import { HiCode } from 'react-icons/hi'
import { VscJson } from 'react-icons/vsc'
import React from 'react'

const Editor = ({ children }) => {
    const childrenWithProps = React.Children.map(children, (child, idx) => {
        if (React.isValidElement(child)) return React.cloneElement(child, { number: idx + 1 });
        return child;
    })

    return (
        <Flex flexDir='column'>
            {childrenWithProps}
        </Flex>
    )
}

const EditorLine = ({ number, line, selected, indent }) => {
    const selectedColor = useColorModeValue('blackAlpha.500', '#206367');

    return (
        <Flex>
            <Text color='#444d56' mr='1.5em'>
                {number}
            </Text>
            <Text bg={selected ? selectedColor: 'transparent'} ml={`${indent?.toString() || '0'}em`}>
                {line}
            </Text>
        </Flex>
    )
}

const VSCodeEditor = ({ folder, js, json, fileName, ...styles }) => {
    const bgColor = useColorModeValue('white', 'rgb(36,41,46)');
    const itemBorderColor = useColorModeValue('1px solid rgb(0 0 0 / 15%)', '1px solid rgb(255 255 255 / 15%)');

    return (
        <VStack 
            alignItems='flex-start' 
            fontFamily='Consolas' 
            fontSize='10pt'
            bg={bgColor}
            borderRadius='5px'
            border={itemBorderColor}
            {...styles}
        >
            <HStack 
                alignItems='center' 
                color='#959da5'
                borderBottom={itemBorderColor} 
                px='.5em'
                py='.25em'
                w='full'
            >
                <MdOutlineRadioButtonChecked fontSize='12pt' color='#90a4ae' />
                <Text>
                    {folder} &gt;
                </Text>
                <Text>
                    src &gt;
                </Text>
                {js && <SiJavascript color='#ffca28' />}
                {json && <VscJson color='#e0ad2d' />}
                <Text>
                    {fileName} {js && '>'}
                </Text>
                {js && (
                    <>
                        <HiCode fontSize='12pt' color='#68b0c9' />
                        <Text>
                            {fileName?.slice(0, fileName?.indexOf('.'))}
                        </Text>
                    </>
                )}
            </HStack>
            <VStack alignItems='flex-start' px='1.5em' pb='1em'>
                <Editor>
                    <EditorLine line='{' selected/>
                    <EditorLine line='"Course": "Diploma in Computer Studies"' indent={2} />
                    <EditorLine line='"School": "Langara College - Vancouver, Canada"' indent={2} />
                    <EditorLine line='"GPA": "3.79/4.33"' indent={2} />
                    <EditorLine line={`"Awards": "Dean's Honour Roll, 3 Terms"`} indent={2} />
                    <EditorLine line='}' selected/>
                </Editor>
            </VStack>
        </VStack>
    )
}
export default VSCodeEditor