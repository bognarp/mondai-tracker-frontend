import { Text, Flex, useColorModeValue, Icon, Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { isObject } from 'lodash-es';
import { HiLightningBolt } from 'react-icons/hi';
import React from 'react';

function Error() {
  const getErrors = useSelector((state) => {
    return state.errors;
  });

  const backgroundColor = useColorModeValue('white', 'gray.800');
  const errorTextColor = useColorModeValue('red.500', 'red.400');
  const textColor = useColorModeValue('gray.600', 'gray.200');

  if (getErrors.length !== 0) {
    let message = getErrors[0].message;

    if (isObject(message)) {
      message = Object.keys(message).reduce((prev, curr) => {
        return [...prev, message[curr]];
      }, []);
    } else {
      message = [message];
    }

    return (
      <Flex
        maxW="sm"
        w="full"
        mt={5}
        bg={backgroundColor}
        shadow="dark-lg"
        rounded="lg"
        overflow="hidden"
        position={'absolute'}
        alignSelf={'center'}
        zIndex={1500}
      >
        <Flex justifyContent="center" alignItems="center" w={12} bg="red.500">
          <Icon as={HiLightningBolt} color="white" boxSize={6} />
        </Flex>

        <Box mx={-3} py={2} px={4}>
          <Box mx={3}>
            <Text color={errorTextColor} fontWeight="bold">
              Error
            </Text>
            {message.map((m) => (
              <Text key={m} color={textColor} fontSize="sm">
                {m}
              </Text>
            ))}
          </Box>
        </Box>
      </Flex>
    );
  }

  return null;
}

export default Error;
