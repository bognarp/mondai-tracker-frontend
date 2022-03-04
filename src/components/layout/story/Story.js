import {
  LinkBox,
  Button,
  Flex,
  Heading,
  HStack,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  ModalCloseButton,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { difficultyValues } from '../../../util/storyHelpers';
import PriorityBadge from './PriorityBadge';
import StoryUpdateForm from './StoryUpdateForm';
import StoryDetails from './StoryDetails';
import { MdDelete } from 'react-icons/md';
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
      borderWidth="1px"
      w="100%"
      p={3}
      borderRadius="lg"
      boxShadow="md"
      backgroundColor="white"
      onClick={open}
      cursor="pointer"
    >
      <HStack spacing={1} wrap="wrap">
        <PriorityBadge value={priority} />

        <Text fontSize="xs">
          {difficulty !== undefined && difficultyValues[difficulty].content}
        </Text>
      </HStack>

      <Flex
        direction={['column', 'row']}
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading fontSize="sm">{title}</Heading>
        <StoryPreviewButton
          projectId={project}
          storyId={storyId}
          category={category}
          state={state}
        />
      </Flex>
    </LinkBox>
  );
}

function Story({ storyContent, projectUsers, category }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditing, setEditing] = useState(false);
  const queryClient = useQueryClient();

  const { mutate } = useMutation(storyAPI.removeStory, {
    onSuccess: () => {
      queryClient.invalidateQueries(['stories', storyContent.project]);
      onClose();
    },
  });

  const deleteStory = () => {
    mutate({ projectId: storyContent.project, storyId: storyContent._id });
  };

  return (
    <>
      <StoryPreview
        open={onOpen}
        storyContent={storyContent}
        category={category}
      />

      <Modal isOpen={isOpen} onClose={onClose} size="xl" trapFocus={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
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
          <Button
            size="sm"
            leftIcon={<MdDelete />}
            variant="outline"
            onClick={deleteStory}
          >
            Delete
          </Button>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Story;
