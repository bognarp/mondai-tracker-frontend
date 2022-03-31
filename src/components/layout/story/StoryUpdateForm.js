import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  Select,
  Text,
  Textarea,
} from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import { difficultyValues, priorityValues } from '../../../util/storyHelpers';
import { MdEditOff, MdSave } from 'react-icons/md';
import { useMutation, useQueryClient } from 'react-query';
import storyAPI from '../../../util/storyAPI';
import usePropertyUpdate from '../../../hooks/usePropertyChange';
import { useDispatch } from 'react-redux';
import { alertUserError } from '../../../actions/errorActions';
import { debounce } from 'lodash-es';

const StoryFormHeader = ({ value, category, patch }) => {
  const [newTitle, setNewTitle] = useState(value);

  return (
    <>
      <Input
        value={newTitle}
        px={1}
        fontSize="24"
        fontWeight="bold"
        onChange={(e) => {
          setNewTitle(e.target.value);
          patch({ title: e.target.value });
        }}
      />
      <HStack spacing={1}>
        <Text fontSize="sm">in {category}</Text>
        <Select variant="unstyled" size="xs" maxWidth="74px" iconSize="sm">
          <option value="feature">Feature</option>
          <option value="bug">Bug</option>
          <option value="chore">Chore</option>
        </Select>
      </HStack>
    </>
  );
};

const StoryFormDescription = ({ value, patch }) => {
  const [newDescription, setNewDescription] = useState(value);

  const checkValue = (value) => (value.trim().length === 0 ? undefined : value);

  return (
    <>
      <Heading size="sm" mb={1} mt={4}>
        Description
      </Heading>
      <Textarea
        value={newDescription}
        placeholder="Add some description..."
        size="sm"
        onChange={(e) => {
          setNewDescription(e.target.value);
          patch({ description: checkValue(e.target.value) });
        }}
      />
    </>
  );
};

const StoryFormPriority = ({ value, patch }) => {
  return (
    <HStack spacing={5} mt={4}>
      <Text fontWeight="semibold">Priority</Text>
      <Select
        id="priority"
        variant="unstyled"
        size="sm"
        iconSize="sm"
        maxW="100%"
        defaultValue={priorityValues[value].value}
        onChange={(e) => {
          patch({ priority: Number(e.target.value) });
        }}
      >
        {priorityValues.map((el, i) => (
          <option key={i} value={el.value}>
            {el.content}
          </option>
        ))}
      </Select>
    </HStack>
  );
};

const StoryFormDifficulty = ({ value, patch }) => {
  return (
    <HStack spacing={5}>
      <Text fontWeight="semibold">Difficulty</Text>
      <Select
        id="priority"
        variant="unstyled"
        size="sm"
        iconSize="sm"
        maxW="100%"
        defaultValue={difficultyValues[value].value}
        onChange={(e) => {
          patch({ difficulty: Number(e.target.value) });
        }}
      >
        {difficultyValues.map((el, i) => (
          <option key={i} value={el.value}>
            {el.content}
          </option>
        ))}
      </Select>
    </HStack>
  );
};

const StoryFormState = ({ value }) => {
  return (
    <HStack spacing={5}>
      <Text fontWeight="semibold">State</Text>
      <Text fontWeight="normal" fontSize="sm">
        {value.toLowerCase()}
      </Text>
    </HStack>
  );
};

const StoryFormUsers = ({ requester, owner, projectUsers, patch }) => {
  const checkValue = (value) => (value === '0' ? null : value);

  return (
    <>
      <HStack spacing={5}>
        <Text fontWeight="semibold">Requester</Text>
        <Select
          id="owner"
          variant="unstyled"
          size="sm"
          iconSize="sm"
          maxW="100%"
          defaultValue={requester ? requester._id : 'None'}
          onChange={(e) => {
            patch({ requester: checkValue(e.target.value) });
          }}
        >
          {projectUsers.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </Select>
      </HStack>

      <HStack spacing={5}>
        <Text fontWeight="semibold">Owner</Text>
        <Select
          id="owner"
          variant="unstyled"
          size="sm"
          iconSize="sm"
          maxW="100%"
          defaultValue={owner ? owner._id : 'None'}
          onChange={(e) => {
            patch({ owner: checkValue(e.target.value) });
          }}
        >
          <option value={0}>None</option>
          {projectUsers.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </Select>
      </HStack>
    </>
  );
};

function StoryUpdateForm({
  storyContent,
  projectUsers,
  toggleEditing,
  category,
}) {
  const [changedInput, setChangedInput] = useState({});
  const [isChanged, changedProps] = usePropertyUpdate(
    changedInput,
    storyContent
  );
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { mutate, isLoading: updateIsLoading } = useMutation(
    storyAPI.updateStory,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['stories', storyContent.project]);
        toggleEditing(false);
      },
      onError: (error) => {
        dispatch(alertUserError(error));
      },
    }
  );

  const handleInputChange = (patch) => {
    if (patch['owner'] || patch['requester']) {
      const userKey = Object.keys(patch)[0];
      const user = projectUsers.find((user) => user._id === patch[userKey]);
      setChangedInput({ ...changedInput, ...{ [userKey]: user } });
    } else {
      setChangedInput({ ...changedInput, ...patch });
    }
  };
  const updateStory = useMemo(() => {
    return debounce(
      () => {
        const patchObj = {};

        changedProps.forEach((key) => {
          patchObj[key] = changedInput[key];
        });

        mutate({
          projectId: storyContent.project,
          storyId: storyContent._id,
          patchObj,
        });
      },
      1000,
      {
        leading: true,
        trailing: false,
      }
    );
  }, [changedInput, changedProps, storyContent, mutate]);

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
    <Box display="flex" flexDirection="column" mx={5} mt={6} mb={3} w="100%">
      <StoryFormHeader
        value={title}
        category={stateCategory}
        patch={handleInputChange}
      />
      <StoryFormDescription value={description} patch={handleInputChange} />
      <StoryFormPriority value={priority} patch={handleInputChange} />
      <StoryFormDifficulty value={difficulty} patch={handleInputChange} />
      <StoryFormState value={state} />
      <StoryFormUsers
        requester={requester}
        owner={owner}
        projectUsers={projectUsers}
        patch={handleInputChange}
      />
      <HStack spacing={4} mt={4}>
        <Button
          colorScheme="red"
          leftIcon={<MdEditOff />}
          size="sm"
          variant="outline"
          onClick={() => {
            toggleEditing(false);
          }}
        >
          Cancel
        </Button>
        {isChanged && (
          <Button
            colorScheme="green"
            isLoading={updateIsLoading}
            loadingText="Saving"
            leftIcon={<MdSave />}
            size="sm"
            variant="outline"
            onClick={updateStory}
          >
            Save
          </Button>
        )}
      </HStack>
    </Box>
  );
}

export default StoryUpdateForm;
