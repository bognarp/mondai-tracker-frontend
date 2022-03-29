import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Collapse,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Textarea,
  useDisclosure,
  useRadio,
  useRadioGroup,
} from '@chakra-ui/react';
import { MdOutlineSettings, MdDelete } from 'react-icons/md';
import usePropertyUpdate from '../../../hooks/usePropertyChange';
import { useInputChange } from '../../../hooks/useInputChange';
import ProjectUsers from './ProjectUsers';
import { useMutation, useQueryClient } from 'react-query';
import projectAPI from '../../../util/projectAPI';
import { useNavigate } from 'react-router-dom';

const RadioImage = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const inputProps = getInputProps();
  const checkboxProps = getCheckboxProps();

  return (
    <Box as="label">
      <input {...inputProps} />
      <Image
        src={`/img/icon/${props.value}.svg`}
        boxSize="54px"
        fit="contain"
        cursor="pointer"
        borderWidth="1px"
        borderRadius="xl"
        _checked={{
          bg: 'teal.600',
          color: 'white',
          borderColor: 'teal.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        {...checkboxProps}
        m={1}
      />
    </Box>
  );
};

const IconRadioGroup = ({ close, changeIcon, setIconpreview }) => {
  const options = [...Array(19).keys(), 'default'].slice(1);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'avatar',
    defaultValue: 'default',
    onChange: (value) => {
      setIconpreview(value);
      changeIcon({ currentTarget: { id: 'avatar', value } });
      close();
    },
  });

  const group = getRootProps();

  return (
    <Box display="flex" flexWrap="wrap" {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return <RadioImage key={value} value={value} {...radio} />;
      })}
    </Box>
  );
};

const ProjectIconSelection = ({ defaultIcon, changeIcon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [iconpreview, setIconpreview] = useState(defaultIcon);

  return (
    <Flex direction="column" gap={2} alignItems="center" w="100%">
      <Image
        src={`/img/icon/${iconpreview}.svg`}
        boxSize="64px"
        fit="contain"
      />
      <Collapse in={!isOpen} animateOpacity>
        <Button
          size="xs"
          variant="outline"
          rounded="sm"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          Change icon
        </Button>
      </Collapse>

      <Collapse in={isOpen} animateOpacity>
        <IconRadioGroup
          close={() => {
            setIsOpen(!isOpen);
          }}
          changeIcon={changeIcon}
          setIconpreview={setIconpreview}
        />
      </Collapse>
    </Flex>
  );
};

const ProjectDeleteButton = ({ deleteProject }) => {
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
          onClick={() => setIsOpen(!isOpen)}
          size="sm"
          justifyContent="flex-start"
          borderRadius="sm"
          variant="link"
          w="120px"
          textColor="red.600"
          leftIcon={<MdDelete />}
        >
          Delete Project
        </Button>
      </PopoverTrigger>

      <PopoverContent bg="gray.200" borderColor="gray.200" boxShadow="dark-lg">
        <PopoverHeader fontWeight="semibold" border="0">
          Delete project?
        </PopoverHeader>
        <PopoverArrow bg="gray.200" />
        <PopoverCloseButton />
        <PopoverBody>
          This is an unrecoverable operation that will remove all project data.
        </PopoverBody>
        <PopoverFooter
          border="0"
          d="flex"
          alignItems="center"
          justifyContent="center"
          pb={4}
        >
          <ButtonGroup size="sm">
            <Button colorScheme="red" onClick={deleteProject}>
              Delete
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

function ProjectSettingsDrawer({ collapsed, project }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [inputChange, handleInputChange] = useInputChange();
  const [isChanged, changedProps] = usePropertyUpdate(inputChange, project);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate } = useMutation(projectAPI.removeProject, {
    onSuccess: () => {
      navigate('/dashboard');
      queryClient.invalidateQueries('project');
    },
  });

  const handleDelete = () => {
    mutate(project._id);
  };

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
            <Flex direction="column" w="100%" h="80%" gap={5}>
              <Center>
                <ProjectIconSelection
                  project={project}
                  defaultIcon={project.avatar}
                  changeIcon={handleInputChange}
                />
              </Center>
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
                    md: '60%',
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
                    md: '60%',
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
              <ProjectUsers members={project.members} owners={project.owners} />
              <Heading
                size="sm"
                borderBottom="1px"
                borderColor="gray.200"
                pb={1}
              >
                Other
              </Heading>
              {/* FIXME: show this section for the project owners only */}
              <ProjectDeleteButton deleteProject={handleDelete} />
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            {/* <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default ProjectSettingsDrawer;
