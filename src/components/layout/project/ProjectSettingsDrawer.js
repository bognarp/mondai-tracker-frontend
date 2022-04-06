import React, { useEffect, useMemo, useRef, useState } from 'react';
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
  Input,
  Popover,
  Image,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Textarea,
  useColorModeValue,
  useDisclosure,
  useRadio,
  useRadioGroup,
} from '@chakra-ui/react';
import { MdOutlineSettings, MdDelete, MdPeopleAlt } from 'react-icons/md';
import usePropertyUpdate from '../../../hooks/usePropertyChange';
import { useInputChange } from '../../../hooks/useInputChange';
import ProjectUsers from './ProjectUsers';
import { useMutation, useQueryClient } from 'react-query';
import projectAPI from '../../../util/projectAPI';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { alertUserError } from '../../../actions/errorActions';
import { debounce } from 'lodash-es';
import { selectSessionInfo } from '../../../reducers/selector';
import ProjectUsersInvite from './ProjectUsersInvite';

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

const IconRadioGroup = ({ close, changeIcon, iconpreview, setIconpreview }) => {
  const options = [...Array(19).keys(), 'default'].slice(1);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'avatar',
    defaultValue: iconpreview,
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

const ProjectIconSelection = ({ defaultIcon, changeIcon, isOwner }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [iconpreview, setIconpreview] = useState(defaultIcon);

  return (
    <Flex direction="column" gap={2} alignItems="center" w="100%">
      <Image
        src={`/img/icon/${iconpreview}.svg`}
        boxSize="64px"
        fit="contain"
      />
      {isOwner && (
        <>
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
              iconpreview={iconpreview}
              setIconpreview={setIconpreview}
            />
          </Collapse>
        </>
      )}
    </Flex>
  );
};

const ProjectDeleteButton = ({ deleteProject, isLoading }) => {
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
          alignSelf="flex-end"
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
            <Button
              isLoading={isLoading}
              loadingText="Deleting"
              colorScheme="red"
              onClick={deleteProject}
            >
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
  const session = useSelector(selectSessionInfo);
  const dispatch = useDispatch();
  const btnRef = useRef();
  const [inputChange, handleInputChange] = useInputChange();
  const [isChanged, changedProps, _, setInitialValues] =
    usePropertyUpdate(inputChange);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const inputBg = useColorModeValue('gray.100', 'gray.700');
  const inputFocusBg = useColorModeValue('white', 'gray.600');

  const isOwner = project.owners.some((owner) => owner._id === session.user.id);

  useEffect(() => {
    setInitialValues(project);
  }, [setInitialValues, project]);

  const { mutate: removeProject, isLoading: deleteIsLoading } = useMutation(
    projectAPI.removeProject,
    {
      onSuccess: () => {
        navigate('/dashboard');
        queryClient.invalidateQueries('project');
        queryClient.invalidateQueries('projects');
      },
    }
  );

  const { mutate: updateProject, isLoading: updateIsLoading } = useMutation(
    projectAPI.updateProject,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('project');
        queryClient.invalidateQueries('projects');
      },
      onError: (error) => {
        dispatch(alertUserError(error));
      },
    }
  );

  const handleDelete = () => removeProject(project._id);

  const handleUpdate = useMemo(() => {
    return debounce(
      () => {
        const patchObj = {};

        changedProps.forEach((key) => {
          patchObj[key] = inputChange[key];
        });

        updateProject({ projectId: project._id, patchObj });
      },
      1000,
      {
        leading: true,
        trailing: false,
      }
    );
  }, [changedProps, inputChange, updateProject, project._id]);

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
                  isOwner={isOwner}
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
                  bg={inputBg}
                  border="1px"
                  borderColor="gray.200"
                  _focus={{ bg: inputFocusBg }}
                  onChange={handleInputChange}
                  isDisabled={!isOwner}
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
                  bg={inputBg}
                  border="1px"
                  borderColor="gray.200"
                  _focus={{ bg: inputFocusBg }}
                  onChange={handleInputChange}
                  isDisabled={!isOwner}
                />
              </FormControl>

              <Flex
                borderBottom="1px"
                borderColor="gray.200"
                justifyContent="space-between"
              >
                <Heading size="sm" pb={1}>
                  Access
                </Heading>
              </Flex>
              {isOwner && <ProjectUsersInvite />}

              <ProjectUsers members={project.members} owners={project.owners} />
              {isOwner && (
                <>
                  <Heading
                    size="sm"
                    borderBottom="1px"
                    borderColor="gray.200"
                    pb={1}
                  >
                    Other
                  </Heading>
                  <ProjectDeleteButton
                    deleteProject={handleDelete}
                    isLoading={deleteIsLoading}
                  />
                </>
              )}
            </Flex>
          </DrawerBody>

          <DrawerFooter justifyContent="center">
            {isChanged && (
              <Button
                colorScheme="green"
                isLoading={updateIsLoading}
                loadingText="Saving"
                onClick={handleUpdate}
              >
                Save
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default ProjectSettingsDrawer;
