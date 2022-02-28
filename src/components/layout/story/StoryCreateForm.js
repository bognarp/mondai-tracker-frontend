import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useInputChange } from '../../../hooks/useInputChange';
import { difficultyValues, priorityValues } from '../../../util/storyHelpers';

function StoryCreateForm({ projectUsers, onSubmit }) {
  const [input, handleInputChange] = useInputChange();

  console.log('input', input);

  return (
    <Box
      display="flex"
      flexDirection="column"
      mt={6}
      mb={3}
      as="form"
      onSubmit={onSubmit(input)}
    >
      <VStack spacing={4}>
        <FormControl>
          <FormLabel fontWeight="bold" htmlFor="title">
            Title
          </FormLabel>
          <Input id="title" type="text" onChange={handleInputChange} />
        </FormControl>
        <FormControl>
          <FormLabel fontWeight="bold" htmlFor="description">
            Description
          </FormLabel>
          <Textarea id="description" type="text" onChange={handleInputChange} />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="priority">Priority</FormLabel>
          <Select id="priority" variant="filled" onChange={handleInputChange}>
            {priorityValues.map((el, i) => (
              <option key={i} value={el.value}>
                {el.content}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="difficulty">Difficulty</FormLabel>
          <Select id="difficulty" variant="filled" onChange={handleInputChange}>
            {difficultyValues.map((el, i) => (
              <option key={i} value={el.value}>
                {el.content}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="owner">Owner</FormLabel>
          <Select id="owner" variant="filled" onChange={handleInputChange}>
            <option value={0}>None</option>
            {projectUsers.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username}
              </option>
            ))}
          </Select>
        </FormControl>
        <Button type="submit">Submit</Button>
      </VStack>
    </Box>
  );
}

export default StoryCreateForm;
