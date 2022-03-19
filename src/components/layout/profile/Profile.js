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
  Divider,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useInputChange } from '../../../hooks/useInputChange';
import usePropertyUpdate from '../../../hooks/usePropertyChange';
import { alertUserError } from '../../../actions/errorActions';

function Profile() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [input, handleInputChange] = useInputChange();
  const [isChanged, changedProps, initialValues, setInitialValues] =
    usePropertyUpdate(input);

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
      patchObj[key] = input[key];
    });

    mutate({
      userId,
      patchObj,
    });
  };

  return (
    <>
      <Center bg="whiteAlpha.400" h="160px">
        <Stack direction="row" alignItems="center" spacing={4}>
          <Avatar name={name || username} bg="red.500" textColor="white" />
          {name && <Text fontSize="lg">{`${name}`}</Text>}
          <Text fontSize="sm">{`@${username}`}</Text>
        </Stack>
      </Center>
      <Center
        bg="whiteAlpha.700"
        h="100%"
        borderTop="1px"
        borderColor="gray.300"
        flexDirection="column"
      >
        <Stack direction="column" w="60%" h="80%" spacing={5}>
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
              bg="gray.100"
              border="1px"
              borderColor="gray.200"
              _focus={{ bg: 'white' }}
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
              bg="gray.100"
              border="1px"
              borderColor="gray.200"
              _focus={{ bg: 'white' }}
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
              bg="gray.100"
              border="1px"
              borderColor="gray.200"
              _focus={{ bg: 'white' }}
              onChange={handleInputChange}
            />
          </FormControl>
          <Divider borderColor="transparent" />
          {isChanged && (
            <Button
              isLoading={mutationIsLoading}
              loadingText="Saving"
              type="submit"
              colorScheme="green"
              w="100px"
              alignSelf="center"
              onClick={updateProfile}
            >
              Save
            </Button>
          )}
        </Stack>
      </Center>
    </>
  );
}

export default Profile;
