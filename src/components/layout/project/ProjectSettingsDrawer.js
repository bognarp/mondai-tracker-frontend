import React, { useRef } from 'react';
import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { MdOutlineSettings } from 'react-icons/md';
import usePropertyUpdate from '../../../hooks/usePropertyChange';
import { useInputChange } from '../../../hooks/useInputChange';

function ProjectSettingsDrawer({ collapsed, project }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [inputChange, handleInputChange] = useInputChange();
  const [isChanged, changedProps] = usePropertyUpdate(inputChange, project);

  return (
    <>
      <Button
        iconSpacing={collapsed ? 0 : 3}
        size="sm"
        leftIcon={<MdOutlineSettings />}
        variant="ghost"
        alignSelf="baseline"
        onClick={onOpen}
        ref={btnRef}
      >
        {collapsed ? null : 'Settings'}
      </Button>
      <Drawer
        isOpen={isOpen}
        size="md"
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Project Settings</DrawerHeader>

          <DrawerBody>
            <Stack direction="column" w="60%" h="80%" spacing={5}>
              <Heading
                size="sm"
                borderBottom="1px"
                borderColor="gray.200"
                pb={1}
              >
                Details
              </Heading>
              <FormControl>
                <FormLabel htmlFor="name">Title</FormLabel>
                <Input
                  id="title"
                  defaultValue={project.title}
                  type="text"
                  maxW={{
                    base: '100%',
                    md: '50%',
                  }}
                  bg="gray.100"
                  border="1px"
                  borderColor="gray.200"
                  _focus={{ bg: 'white' }}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="username">Description</FormLabel>
                <Textarea
                  id="description"
                  defaultValue={project.description}
                  maxW={{
                    base: '100%',
                    md: '50%',
                  }}
                  bg="gray.100"
                  border="1px"
                  borderColor="gray.200"
                  _focus={{ bg: 'white' }}
                  onChange={handleInputChange}
                />
              </FormControl>
              <Heading
                size="sm"
                borderBottom="1px"
                borderColor="gray.200"
                pb={1}
              >
                Access
              </Heading>
              <Divider borderColor="transparent" />

            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default ProjectSettingsDrawer;
