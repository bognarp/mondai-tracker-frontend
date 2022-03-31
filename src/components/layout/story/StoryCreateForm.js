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
import { useMutation, useQueryClient } from 'react-query';
import { useInputChange } from '../../../hooks/useInputChange';
import storyAPI from '../../../util/storyAPI';
import { alertUserError } from '../../../actions/errorActions';
import { difficultyValues, priorityValues } from '../../../util/storyHelpers';
import { debounce } from 'lodash-es';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

function StoryCreateForm({ projectId, projectUsers, category, onClose }) {
  const [input, handleInputChange] = useInputChange();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { mutate, isLoading: createIsLoading } = useMutation(
    storyAPI.createStory,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['stories', projectId]);
        onClose();
      },
      onError: (error) => {
        dispatch(alertUserError(error));
      },
    }
  );

  const createNewStory = useMemo(() => {
    return debounce(
      () => {
        let state;

        if (category === 'current') state = 'UNSTARTED';
        if (category === 'backlog') state = 'UNSCHEDULED';

        const newStory = { ...input, state };

        if (newStory.owner === '0') delete newStory.owner;

        mutate({ projectId, newStory });
      },
      1000,
      {
        leading: true,
        trailing: false,
      }
    );
  }, [category, input, projectId, mutate]);

  return (
    <Box display="flex" flexDirection="column" mt={6}>
      <VStack spacing={4}>
        <FormControl isRequired>
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
        <Button
          isLoading={createIsLoading}
          loadingText="Saving"
          onClick={createNewStory}
        >
          Save
        </Button>
      </VStack>
    </Box>
  );
}

export default StoryCreateForm;
