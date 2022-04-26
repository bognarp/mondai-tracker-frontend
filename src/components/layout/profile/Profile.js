import userAPI from '../../../util/userAPI';
import {
  Spinner,
  Center,
  Avatar,
  Text,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useInputChange } from '../../../hooks/useInputChange';
import usePropertyUpdate from '../../../hooks/usePropertyChange';
import { alertUserError } from '../../../actions/errorActions';

function Profile() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [inputChange, handleInputChange] = useInputChange();
  const [isChanged, changedProps, setInitialValues, initialValues] =
    usePropertyUpdate(inputChange);

  const containerHeaderBg = useColorModeValue(
    'blackAlpha.300',
    'blackAlpha.700'
  );
  const containerBg = useColorModeValue('blackAlpha.200', 'blackAlpha.500');
  const inputBg = useColorModeValue('gray.100', 'gray.700');
  const inputFocusBg = useColorModeValue('white', 'gray.600');

  const { data, isLoading, isError } = useQuery(
    'userInfo',
    () => {
      return userAPI.fetchCurrentUser();
    },
    {
      onSuccess: (data) => {
        setInitialValues(data);
      },
    }
  );

  const { mutate, isLoading: mutationIsLoading } = useMutation(
    userAPI.updateUser,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['userInfo']);
      },
      onError: (error) => {
        dispatch(alertUserError(error));
      },
    }
  );

  if (isError) return null;

  if (isLoading) {
    return (
      <Center w="100%" h="100%">
        <Spinner color="gray.100" size="xl" />
      </Center>
    );
  }

  const { _id: userId, username, name } = data;

  const updateProfile = (e) => {
    const patchObj = {};

    changedProps.forEach((key) => {
      patchObj[key] = inputChange[key];
    });

    mutate({
      userId,
      patchObj,
    });
  };

  return (
    <Flex direction="column" alignItems="center" bg={containerBg} minH="94vh">
      <Center
        bg={containerHeaderBg}
        maxH="160px"
        minH="80px"
        alignSelf="stretch"
        borderBottom="1px"
        borderColor="gray.400"
      >
        <Stack direction="row" alignItems="center" spacing={4}>
          <Avatar name={name || username} bg="red.500" textColor="white" />
          {name && <Text fontSize="lg">{`${name}`}</Text>}
          <Text fontSize="sm">{`@${username}`}</Text>
        </Stack>
      </Center>

      <Stack direction="column" w="60%" spacing={5} m={8}>
        <Heading size="lg" borderBottom="1px" borderColor="gray.200" pb={1}>
          About
        </Heading>
        <FormControl>
          <FormLabel htmlFor="name">Full name</FormLabel>
          <Input
            id="name"
            defaultValue={initialValues.name}
            type="text"
            maxW={{
              base: '100%',
              md: '50%',
            }}
            bg={inputBg}
            border="1px"
            borderColor="gray.200"
            _focus={{ bg: inputFocusBg }}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            id="username"
            defaultValue={initialValues.username}
            type="text"
            maxW={{
              base: '100%',
              md: '50%',
            }}
            bg={inputBg}
            border="1px"
            borderColor="gray.200"
            _focus={{ bg: inputFocusBg }}
            onChange={handleInputChange}
          />
        </FormControl>
        <Heading size="md" borderBottom="1px" borderColor="gray.200" pb={1}>
          Contact
        </Heading>
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            defaultValue={initialValues.email}
            type="email"
            maxW={{
              base: '100%',
              md: '50%',
            }}
            bg={inputBg}
            border="1px"
            borderColor="gray.200"
            _focus={{ bg: inputFocusBg }}
            onChange={handleInputChange}
          />
        </FormControl>
      </Stack>
      {isChanged && (
        <Button
          isLoading={mutationIsLoading}
          loadingText="Saving"
          type="submit"
          colorScheme="green"
          w="100px"
          alignSelf="center"
          onClick={updateProfile}
          my={7}
        >
          Save
        </Button>
      )}
    </Flex>
  );
}

export default Profile;
