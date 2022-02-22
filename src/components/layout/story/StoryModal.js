import {
  Badge,
  Box,
  Button,
  Divider,
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

function StoryItem({ open }) {
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
      w='100%'
      p={3}
      borderRadius="lg"
      boxShadow="md"
      backgroundColor="gray.100"
      onClick={open}
      cursor="pointer"
    >
      <HStack spacing={1} wrap='wrap'>
        <Badge variant="solid" colorScheme="green">
          Low
        </Badge>
        <Divider orientation="vertical" />
        <Text fontSize="xs">1 Points</Text>
      </HStack>
      <Flex
        marginTop={1}
        direction={['column', 'row']}
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading fontSize="mdlg">This is the Story's title...</Heading>
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

function StoryModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <StoryItem open={onOpen}></StoryItem>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default StoryModal;
