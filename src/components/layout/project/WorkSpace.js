import {
  Button,
  Center,
  Heading,
  HStack,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createProjectStory,
  fetchProjectStories,
} from '../../../actions/storyActions';
import { selectStoriesByCategory } from '../../../reducers/selector';
import { workspaceIconMap, workspaceMap } from '../../../util/workspaceHelpers';
import Story from '../story/Story';
import { union } from 'lodash-es';
import { MdAdd } from 'react-icons/md';
import StoryCreateForm from '../story/StoryCreateForm';

function Workspace({ project, category }) {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { status, allIds, byId } = useSelector(
    selectStoriesByCategory(category)
  );
  const userId = useSelector((state) => state.session.user.id);
  const projectUsers = union(project.owners, project.members);

  const sortByPriority = () => {
    return [...allIds].sort((a, b) => byId[b].priority - byId[a].priority);
  };

  const workspaceTitle = Object.keys(workspaceMap).find(
    (key) => workspaceMap[key] === category
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProjectStories(project._id, category, userId));
    }
  }, [status, dispatch, project._id, category, userId]);

  const createNewStory = (payload) => (e) => {
    e.preventDefault();
    let state;

    if (category === 'current') state = 'UNSTARTED';
    if (category === 'backlog') state = 'UNSCHEDULED';

    const newStory = { ...payload, state };

    if (newStory.owner === '0') delete newStory.owner;

    dispatch(createProjectStory(newStory, project._id, category));
  };

  if (status === 'idle') {
    return null;
  }

  if (status !== 'complete') {
    return (
      <Center w="100%" h="100%">
        <Spinner color="gray.100" size="xl" />
      </Center>
    );
  }

  return (
    <>
      <VStack
        bg="gray.100"
        spacing={3}
        p={3}
        shadow="xl"
        m={1}
        borderRadius={5}
      >
        <HStack>
          {workspaceIconMap[workspaceTitle]}
          <Heading as="h3" fontSize="md">
            {workspaceTitle}
          </Heading>
        </HStack>

        {sortByPriority().map((storyId) => (
          <Story
            key={storyId}
            storyContent={byId[storyId]}
            projectUsers={projectUsers}
            category={category}
          />
        ))}
        {(category === 'current' || category === 'backlog') && (
          <Button leftIcon={<MdAdd />} size="sm" onClick={onOpen}>
            Add Story
          </Button>
        )}
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} trapFocus={false}>
        <ModalOverlay />
        <ModalContent p={5}>
          <ModalCloseButton />
          <StoryCreateForm
            projectUsers={projectUsers}
            onSubmit={createNewStory}
          />
        </ModalContent>
      </Modal>
    </>
  );
}

export default Workspace;
