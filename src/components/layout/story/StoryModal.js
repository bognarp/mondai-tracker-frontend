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
import StoryDetails from './StoryDetails';
import StoryView from './StoryView';

function StoryItem({ open, difficulty, priority, title }) {
  const stopEventPropagationTry = (event) => {
    if (event.target === event.currentTarget) {
      event.stopPropagation();
    }
  };

  const handleButtonClick = (event) => {
    stopEventPropagationTry(event);
    console.log('STOPPED EVENT PROPAGATION...WOW');
  };

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

        <Button
          colorScheme="teal"
          size="xs"
          variant="outline"
          onClick={handleButtonClick}
        >
          Start
        </Button>
      </Flex>
    </LinkBox>
  );
}

function StoryModal({ storyContent, projectUsers }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { title, difficulty, priority } = storyContent;
  const [isEditing, setEditing] = useState(false);

  return (
    <>
      <StoryItem
        open={onOpen}
        difficulty={difficulty}
        priority={priority}
        title={title}
      />

      <Modal isOpen={isOpen} onClose={onClose} size="xl" trapFocus={false}>
        <ModalOverlay />
        <ModalContent>
        <ModalCloseButton />
          {isEditing ? (
            <StoryDetails
              storyContent={storyContent}
              projectUsers={projectUsers}
              toggleEditing={setEditing}
            />
          ) : (
            <StoryView storyContent={storyContent} toggleEditing={setEditing} />
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default StoryModal;
