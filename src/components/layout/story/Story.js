import {
  LinkBox,
  Button,
  Heading,
  HStack,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  ModalCloseButton,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  ButtonGroup,
  PopoverCloseButton,
  PopoverArrow,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { difficultyValues } from '../../../util/storyHelpers';
import PriorityBadge from './PriorityBadge';
import StoryUpdateForm from './StoryUpdateForm';
import StoryDetails from './StoryDetails';
import { MdDelete, MdEdit } from 'react-icons/md';
import StoryPreviewButton from './StoryPreviewButton';
import { useMutation, useQueryClient } from 'react-query';
import storyAPI from '../../../util/storyAPI';

function StoryPreview({ open, storyContent, category }) {
  const {
    _id: storyId,
    state,
    project,
    title,
    difficulty,
    priority,
  } = storyContent;

  return (
    <LinkBox
      as={Flex}
      direction="column"
      gap={1}
      borderWidth="1px"
      p={3}
      mr={1}
      borderRadius="lg"
      boxShadow="md"
      bg={useColorModeValue('white', '#1c1c21')}
      onClick={open}
      cursor="pointer"
    >
      <HStack spacing={1} wrap="wrap">
        <PriorityBadge value={priority} />

        <Text fontSize="xs">
          {difficulty !== undefined && difficultyValues[difficulty].content}
        </Text>
      </HStack>

      <Stack
        direction={['column', 'row']}
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading fontSize="sm">{title}</Heading>
        <Stack direction={['column', 'row']} spacing={1}>
          <StoryPreviewButton
            projectId={project}
            storyId={storyId}
            category={category}
            state={state}
          />
        </Stack>
      </Stack>
    </LinkBox>
  );
}

const DeleteButton = ({ deleteStory, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      isLazy
      returnFocusOnClose={false}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      placement="top"
      closeOnBlur={true}
    >
      <PopoverTrigger>
        <Button
          mr={5}
          onClick={() => setIsOpen(!isOpen)}
          size="xs"
          borderRadius="sm"
          w="100%"
          leftIcon={<MdDelete />}
        >
          Delete
        </Button>
      </PopoverTrigger>

      <PopoverContent bg="gray.200" borderColor="gray.200" boxShadow="dark-lg">
        <PopoverHeader fontWeight="semibold" border="0">
          Delete story?
        </PopoverHeader>
        <PopoverArrow bg="gray.200" />
        <PopoverCloseButton />
        <PopoverBody>
          Story will be removed from the project and you won't be able to access
          it again.
        </PopoverBody>
        <PopoverFooter
          border="0"
          d="flex"
          alignItems="center"
          justifyContent="center"
          pb={4}
        >
          <ButtonGroup size="sm">
            <Button
              colorScheme="red"
              onClick={deleteStory}
              isLoading={isLoading}
              loadingText="Deleting"
            >
              Delete
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

function Story({ storyContent, projectUsers, category }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditing, setEditing] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isLoading: deleteIsLoading } = useMutation(
    storyAPI.removeStory,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['stories', storyContent.project]);
        onClose();
      },
    }
  );

  const handleDelete = () => {
    mutate({ projectId: storyContent.project, storyId: storyContent._id });
  };

  return (
    <>
      <StoryPreview
        open={onOpen}
        storyContent={storyContent}
        category={category}
      />

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent p={2}>
          <ModalCloseButton />
          <Flex direction={['column', 'row']} justifyContent="space-between">
            {isEditing ? (
              <StoryUpdateForm
                storyContent={storyContent}
                projectUsers={projectUsers}
                category={category}
                toggleEditing={setEditing}
              />
            ) : (
              <StoryDetails
                storyContent={storyContent}
                toggleEditing={setEditing}
              />
            )}

            <Flex
              direction="column"
              justifyContent="flex-end"
              alignItems="baseline"
              gap={1}
              p={3}
            >
              <Text fontSize="xs" fontWeight="semibold">
                Actions
              </Text>
              <Button
                w="100%"
                size="xs"
                leftIcon={<MdEdit />}
                isLoading={isEditing}
                loadingText="Editing"
                borderRadius="sm"
                onClick={() => {
                  setEditing(true);
                }}
              >
                Edit
              </Button>
              <DeleteButton
                deleteStory={handleDelete}
                isLoading={deleteIsLoading}
              />
            </Flex>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Story;
