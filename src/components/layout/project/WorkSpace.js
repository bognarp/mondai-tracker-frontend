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
import React from 'react';
import { useSelector } from 'react-redux';
import { workspaceIconMap, workspaceMap } from '../../../util/workspaceHelpers';
import Story from '../story/Story';
import { union } from 'lodash-es';
import { MdAdd } from 'react-icons/md';
import StoryCreateForm from '../story/StoryCreateForm';
import { useQuery } from 'react-query';
import storyAPI from '../../../util/storyAPI';

function Workspace({ project, category }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userId = useSelector((state) => state.session.user.id);
  const projectUsers = union(project.owners, project.members);

  const { isLoading, data, isError, error } = useQuery(
    ['stories', project._id, category],
    () => {
      const categoryUrl =
        category === 'user' ? `current?owner=${userId}` : category;
      return storyAPI.fetchStories(project._id, categoryUrl);
    }
  );

  const workspaceTitle = Object.keys(workspaceMap).find(
    (key) => workspaceMap[key] === category
  );

  if (isLoading) {
    return (
      <Center w="100%" h="100%">
        <Spinner color="gray.100" size="xl" />
      </Center>
    );
  }

  if (isError) return <h3>{error.message}</h3>;

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

        {data.map((story) => (
          <Story
            key={story._id}
            storyContent={story}
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
            projectId={project._id}
            projectUsers={projectUsers}
            category={category}
            onClose={onClose}
          />
        </ModalContent>
      </Modal>
    </>
  );
}

export default Workspace;
