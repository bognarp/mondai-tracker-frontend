import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import PriorityBadge from './PriorityBadge';
import StoryDetails from './StoryDetails';

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
    <Box
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
          {difficulty ? `${difficulty} Points` : `Unestimated`}
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
    </Box>
  );
}

function StoryModal({ storyContent }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { title, difficulty, priority } = storyContent;

  return (
    <>
      <StoryItem
        open={onOpen}
        difficulty={difficulty}
        priority={priority}
        title={title}
      />

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <StoryDetails storyContent={storyContent} />
        </ModalContent>
      </Modal>
    </>
  );
}

export default StoryModal;
