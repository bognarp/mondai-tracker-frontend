import {
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
  useColorModeValue,
  useDisclosure,
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

  const workspaceTitleBg = useColorModeValue('gray.300', 'gray.600');
  const workspaceBg = useColorModeValue('gray.100', 'gray.700');

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
    <Flex direction="column" maxHeight="calc((94vh - 1rem) / 2)">
      <HStack
        bg={workspaceTitleBg}
        w="100%"
        justifyContent="center"
        py={2}
        borderTopRadius={5}
      >
        {workspaceIconMap[workspaceTitle]}
        <Heading as="h3" fontSize="md">
          {workspaceTitle}
        </Heading>
      </HStack>

      <Flex
        direction="column"
        alignItems="stretch"
        gap={2}
        bg={workspaceBg}
        py={3}
        pl={3}
        pr={2}
        shadow="inner"
        borderBottomRadius={5}
        w="100%"
        h="100%"
        overflowY="auto"
      >
        <Flex
          direction="column"
          gap={1}
          overflowY="auto"
          css={{
            '&::-webkit-scrollbar': {
              width: '7px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#F7FAFC',
              width: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#718096',
              borderRadius: '24px',
            },
          }}
        >
          {data.map((story) => (
            <Story
              key={story._id}
              storyContent={story}
              projectUsers={projectUsers}
              category={category}
            />
          ))}
        </Flex>

        {(category === 'current' || category === 'backlog') && (
          <Button
            alignSelf="center"
            leftIcon={<MdAdd />}
            size="sm"
            onClick={onOpen}
            variant="ghost"
            colorScheme="gray"
            // TODO: dark mode
            _hover={{
              background: 'gray.200',
            }}
          >
            Create a story
          </Button>
        )}
      </Flex>

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
    </Flex>
  );
}

export default Workspace;
