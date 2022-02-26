import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Input,
  Select,
  Text,
  Textarea,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { isEqual, isEmpty } from 'lodash-es';
import { difficultyValues, priorityValues } from '../../../util/storyHelpers';
import { MdEditOff, MdSave } from 'react-icons/md';

const StoryDetailsHeader = ({ value, category, patch }) => {
  const [newTitle, setNewTitle] = useState(value);

  return (
    <>
      <Input
        value={newTitle}
        px={1}
        fontSize="24"
        fontWeight="bold"
        maxW="65%"
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

const StoryDetailsDescription = ({ value, patch }) => {
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
        maxW="65%"
        onChange={(e) => {
          setNewDescription(e.target.value);
          patch({ description: checkValue(e.target.value) });
        }}
      />
    </>
  );
};

const StoryDetailsPriority = ({ value, patch }) => {
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

const StoryDetailsDifficulty = ({ value, patch }) => {
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

const StoryDetailsState = ({ value }) => {
  return (
    <HStack spacing={5}>
      <Text fontWeight="semibold">State</Text>
      <Text fontWeight="normal" fontSize="sm">
        {value.toLowerCase()}
      </Text>
    </HStack>
  );
};

const StoryDetailsUsers = ({ requester, owner, projectUsers, patch }) => {
  const checkValue = (value) => (value === '0' ? undefined : value);

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

function StoryDetails({ storyContent, projectUsers, toggleEditing }) {
  const [editedProps, setEditedProps] = useState({});
  const [changedKeys, setChangedKeys] = useState([]);
  const [isEdited, setEdited] = useState(false);

  useEffect(() => {
    if (!isEmpty(editedProps)) {
      const keys = Object.keys(editedProps).filter((key) => {
        return !isEqual(storyContent[key], editedProps[key]);
      });

      !isEmpty(keys) ? setEdited(true) : setEdited(false);

      setChangedKeys(keys);
    }
  }, [editedProps, storyContent]);

  const storyPatcher = (patch) => {
    if (patch['owner'] || patch['requester']) {
      const userKey = Object.keys(patch)[0];
      const user = projectUsers.find((user) => user._id === patch[userKey]);
      setEditedProps({ ...editedProps, ...{ [userKey]: user } });
    } else {
      setEditedProps({ ...editedProps, ...patch });
    }
  };

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
    <Box display="flex" flexDirection="column" mx={5} mt={6} mb={3}>
      <StoryDetailsHeader
        value={title}
        category={stateCategory}
        patch={storyPatcher}
      />

      <StoryDetailsDescription value={description} patch={storyPatcher} />
      <StoryDetailsPriority value={priority} patch={storyPatcher} />
      <StoryDetailsDifficulty value={difficulty} patch={storyPatcher} />
      <StoryDetailsState value={state} />
      <StoryDetailsUsers
        requester={requester}
        owner={owner}
        projectUsers={projectUsers}
        patch={storyPatcher}
      />
      <Divider my={4} />
      <HStack spacing={4}>
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
        {isEdited && (
          <Button
            colorScheme="green"
            leftIcon={<MdSave />}
            size="sm"
            variant="outline"
          >
            Save
          </Button>
        )}
      </HStack>
    </Box>
  );
}

export default StoryDetails;
