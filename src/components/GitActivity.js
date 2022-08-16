import { Flex, HStack, Box, Text, useColorModeValue, VStack, Spinner, Center } from '@chakra-ui/react'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const ActivityBlock = ({ level }) => {
    const level0 = useColorModeValue('rgb(230,230,230)', '#161b22');
    const level1 = useColorModeValue('rgb(182,240,146)', '#0e4429');
    const level2 = useColorModeValue('rgb(82,214,121)', '#006d32');
    const level3 = useColorModeValue('rgb(35,166,76)', '#26a641');
    const level4 = useColorModeValue('rgb(18,105,51)', '#39d353');

    return (
        <Box 
            w='11px' 
            h='11px' 
            border='1px solid rgba(255, 255, 255, 0.05)'
            bgColor={{
                0: level0,
                1: level1,
                2: level2,
                3: level3,
                4: level4
            }[level || 0]}
            borderRadius='2px'
            opacity={level === 0 ? '.5' : '1'}
        >    
        </Box>
    )
}

const GitActivity = ({ contributions, totalContributions }) => {
    const itemBorderColor = useColorModeValue('1px solid rgb(0 0 0 / 15%)', '1px solid rgb(255 255 255 / 15%)');
    const monthsEveryWeek= contributions?.map((cont) => cont[0]).map((cont) => {
        const curMonth = cont.date.split('-')[1];
        const curMonthOfWeek = months[parseInt(curMonth) - 1];
        return curMonthOfWeek;
    });
    const reArrangedMonths = monthsEveryWeek?.filter((item, pos, self) => {
        return self.findIndex((cont) => item === cont) === pos;
    })

    return (
        <Flex 
            flexDir='column' 
            w='full'
            maxW='855px'
            gap='.5em'
        >
            <Text alignSelf='flex-start'>
                {totalContributions} contributions in the last year
            </Text>
            <Flex 
                position='relative'
                flexDir='column'
                border={itemBorderColor}
                p='.5em'
                borderRadius='5px'
                fontSize='9pt'
                overflowX='hidden'
            >
                <HStack px='.5em' my='.5em'>
                    <VStack spacing='1em'>
                        <Text>Mon</Text>
                        <Text>Wed</Text>
                        <Text>Fri</Text>
                    </VStack>
                    <Flex 
                        position='relative'
                        pt='18px'
                        flex='1'
                    >
                        {reArrangedMonths?.map((month, idx) => {
                            return (
                                <Text 
                                    top='-1'
                                    position='absolute'
                                    key={idx}
                                    left={`${monthsEveryWeek?.indexOf(month) * 15}px`}
                                >
                                    {month}
                                </Text>
                            )
                        })}
                        <Flex
                            flexDir='column'
                            maxH='101px'
                            maxW='795px'
                            flex='1'
                            flexWrap='wrap'
                            gap='1'
                        >
                            {contributions ? (
                                <>
                                {[...Array((contributions?.length * 7) - 4)].map((e, idx) => {
                                    const curWeek = Math.floor(idx / 7);
                                    const curDayOfWeek = idx - (7 * Math.floor(idx / 7));
                                    const { contributionCount: cCount } = contributions[curWeek][curDayOfWeek];

                                    const getCurLevel = () => {
                                        let level = 0;
                                        if (cCount > 0 && cCount <= 8) level = 1;
                                        else if (cCount > 8 && cCount <= 17) level = 2;
                                        else if (cCount > 17 && cCount <= 25) level = 3;
                                        else if (cCount > 25) level = 4;
                                        return level;
                                    }

                                    const curLevel = getCurLevel();

                                    return (
                                        <ActivityBlock 
                                            key={idx}
                                            level={curLevel}
                                        />
                                    )
                                })}
                                </>
                            ) : (
                                <Center>
                                    <Spinner
                                        thickness='4px'
                                        speed='0.65s'
                                        emptyColor='gray.200'
                                        color='blue.500'
                                        size='xl'
                                    />
                                </Center>
                            )}
                        </Flex>
                    </Flex>
                </HStack>
                <Flex justifyContent='flex-end' mt='.75em' px='.5em'>
                    <HStack spacing='1'>
                        <Text>
                            Less
                        </Text>
                        <ActivityBlock level={0} />
                        <ActivityBlock level={1} />
                        <ActivityBlock level={2} />
                        <ActivityBlock level={3} />
                        <ActivityBlock level={4} />
                        <Text>
                            More
                        </Text>
                    </HStack>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default GitActivity