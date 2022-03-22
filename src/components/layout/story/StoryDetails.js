import { Box, Heading, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { difficultyValues, priorityValues } from '../../../util/storyHelpers';

function StoryDetails({ storyContent, toggleEditing }) {
  const {
    title,
    difficulty,
    priority,
    description,
    requester,
    owner,
    state,
    stateCategory,
  } = storyContent;

  return (
    <Box display="flex" flexDirection="column" px={5} pt={6} pb={3} w="100%">
      <Heading as="h1" size="lg" fontSize="24px" maxWidth="100%">
        {title}
      </Heading>
      <HStack spacing={1}>
        <Text fontSize="sm">in {stateCategory}</Text>
      </HStack>
      <Heading as="h2" size="sm" mb={1} mt={4}>
        Description
      </Heading>
      <Text maxWidth="100%">{description || 'No description...'}</Text>
      <HStack mt={4} spacing={5}>
        <Text fontWeight="semibold">Priority</Text>
        <Text fontWeight="normal" fontSize="sm">
          {priorityValues[priority].content}
        </Text>
      </HStack>
      <HStack spacing={5}>
        <Text fontWeight="semibold">Difficulty</Text>
        <Text fontWeight="normal" fontSize="sm">
          {difficultyValues[difficulty].content}
        </Text>
      </HStack>
      <HStack spacing={5}>
        <Text fontWeight="semibold">State</Text>
        <Text fontWeight="normal" fontSize="sm">
          {state.toLowerCase()}
        </Text>
      </HStack>
      <HStack spacing={5}>
        <Text fontWeight="semibold">Requester</Text>
        <Text fontWeight="normal" fontSize="sm">
          {requester.username}
        </Text>
      </HStack>
      <HStack spacing={5}>
        <Text fontWeight="semibold">Owner</Text>
        <Text fontWeight="normal" fontSize="sm">
          {owner ? owner.username : 'None'}
        </Text>
      </HStack>
    </Box>
  );
}

export default StoryDetails;
