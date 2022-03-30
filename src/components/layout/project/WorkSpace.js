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
      <VStack spacing={0}>
        <HStack
          bg="gray.300"
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
        <VStack
          bg="gray.100"
          spacing={2}
          p={3}
          shadow="xl"
          borderBottomRadius={5}
        >
          {/* <Box
            overflowY="auto"
            css={{
              '&::-webkit-scrollbar': {
                width: '10px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'white',
                width: '10px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'black',
                borderRadius: '24px',
              },
            }}
          > */}
          {data.map((story) => (
            <Story
              key={story._id}
              storyContent={story}
              projectUsers={projectUsers}
              category={category}
            />
          ))}
          {/* </Box> */}
          {(category === 'current' || category === 'backlog') && (
            <Button
              leftIcon={<MdAdd />}
              size="sm"
              onClick={onOpen}
              variant="ghost"
              colorScheme="gray"
              _hover={{
                background: 'gray.200',
              }}
            >
              Add Story
            </Button>
          )}
        </VStack>
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
