import { Box, Heading, HStack, Select, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

const StoryDetailsHeader = ({ title, category, patch }) => {
  return (
    <>
      <Heading size="md" mb={1}>
        {title}
      </Heading>
      <HStack spacing={1}>
        <Text fontSize="sm">in {category}, Type:</Text>
        <Select variant="unstyled" size="xs" maxWidth="74px" iconSize="sm">
          <option value="feature">Feature</option>
          <option value="bug">Bug</option>
          <option value="chore">Chore</option>
        </Select>
      </HStack>
    </>
  );
};

const StoryDetailsPriority = ({ priority, patch }) => {
  return (
    <Stack direction="row" mt={4} align="center" spacing={5}>
      <Text fontWeight="semibold">Priority</Text>
      <Select
        id="priority"
        variant="unstyled"
        size="sm"
        iconSize="sm"
        onChange={(e) => {
          patch({ priority: e.target.value });
        }}
      >
        <option value="0">None</option>
        <option value="1">Low</option>
        <option value="2">Medium</option>
        <option value="3">High</option>
        <option value="4">Critical</option>
      </Select>
    </Stack>
  );
};

const StoryDetailsDifficulty = ({ difficulty, patch }) => {
  return (
    <Stack direction="row" align="center" spacing={5}>
      <Text fontWeight="semibold">Difficulty</Text>
      <Select
        id="priority"
        variant="unstyled"
        size="sm"
        iconSize="sm"
        onChange={(e) => {
          patch({ difficulty: e.target.value });
        }}
      >
        <option value="0">Unestimated</option>
        <option value="1">0 Points</option>
        <option value="2">1 Points</option>
        <option value="3">2 Points</option>
        <option value="4">3 Points</option>
      </Select>
    </Stack>
  );
};

function StoryDetails({ storyContent }) {
  const [isPatched, setPatched] = useState(false);
  const [storyPatch, setStoryPatch] = useState({});

  const storyPatcher = (patch) => {
    setStoryPatch({ ...storyPatch, ...patch });
    setPatched(true);
  };

  // const updatableFields = {
  //   title: '',
  //   description: '',
  //   state: '',
  //   priority: undefined,
  //   difficulty: undefined,
  //   owner: '',
  //   stateCategory: '',
  // };

  // TODO: useEffect -> if isPatched send patch request actions

  const {
    title,
    difficulty,
    priority,
    description,
    requester,
    owner,
    stateCategory,
  } = storyContent;

  return (
    <Box display="flex" flexDirection="column" mx={5} my={6}>
      {/* <div>
        <pre>{JSON.stringify(storyContent, null, 2)}</pre>
      </div> */}
      <StoryDetailsHeader title={title} category={stateCategory} />
      <Heading size="sm" mb={1} mt={4}>
        Description
      </Heading>
      <Text fontSize="sm">{description}</Text>
      <StoryDetailsPriority priority={priority} patch={storyPatcher} />
      <StoryDetailsDifficulty difficulty={difficulty} patch={storyPatcher} />

      <Stack direction="row" align="center" spacing={5}>
        <Text fontWeight="semibold">Requester</Text>
        <Text fontSize="sm">{requester.username}</Text>
      </Stack>
      <Stack direction="row" align="center" spacing={5}>
        <Text fontWeight="semibold">Owner</Text>
        <Text fontSize="sm">{owner && owner.username}</Text>
      </Stack>
    </Box>
  );
}

export default StoryDetails;
