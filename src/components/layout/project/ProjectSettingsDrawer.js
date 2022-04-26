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
import { MdOutlineSettings, MdDelete, MdExitToApp } from 'react-icons/md';
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
        src={`${process.env.REACT_APP_SERVER_URL}/img/icon/${props.value}.svg`}
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
        src={`${process.env.REACT_APP_SERVER_URL}/img/icon/${iconpreview}.svg`}
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

const DeleteProjectButton = ({ projectId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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

  // TODO: debounce!
  const handleDelete = () => removeProject(projectId);

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
              isLoading={deleteIsLoading}
              loadingText="Deleting"
              colorScheme="red"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

const LeaveProjectButton = ({ projectId, userId }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: leaveProject, isLoading: leaveIsLoading } = useMutation(
    projectAPI.removeUserFromProject,
    {
      onSuccess: () => {
        navigate('/dashboard');
        queryClient.invalidateQueries('project');
        queryClient.invalidateQueries('projects');
      },
    }
  );

  // TODO: debounce!
  const handleLeave = () => {
    leaveProject({ projectId, userId });
  };

  return (
    <>
      <Button
        onClick={handleLeave}
        isLoading={leaveIsLoading}
        size="sm"
        justifyContent="flex-start"
        alignSelf="flex-end"
        borderRadius="sm"
        variant="link"
        w="120px"
        textColor="red.600"
        leftIcon={<MdExitToApp />}
      >
        Leave Project
      </Button>
    </>
  );
};

function ProjectSettingsDrawer({ collapsed, project }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const session = useSelector(selectSessionInfo);
  const dispatch = useDispatch();
  const btnRef = useRef();
  const [inputChange, handleInputChange] = useInputChange();
  const [isChanged, changedProps, setInitialValues] =
    usePropertyUpdate(inputChange);
  const queryClient = useQueryClient();

  const inputBg = useColorModeValue('gray.100', 'gray.700');
  const inputFocusBg = useColorModeValue('white', 'gray.600');

  const isOwner = project.owners.some((owner) => owner._id === session.user.id);

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

  useEffect(() => {
    setInitialValues(project);

    return () => {
      handleUpdate.cancel();
    };
  }, [setInitialValues, project, handleUpdate]);

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

              <Heading
                size="sm"
                borderBottom="1px"
                borderColor="gray.200"
                pb={1}
              >
                Other
              </Heading>
              {isOwner ? (
                <DeleteProjectButton projectId={project._id} />
              ) : (
                <LeaveProjectButton
                  projectId={project._id}
                  userId={session.user.id}
                />
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
