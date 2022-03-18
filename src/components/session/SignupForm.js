import {
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../actions/sessionActions';
import { useInputChange } from '../../hooks/useInputChange';
import Error from '../layout/Error';
import logo from '../layout/nav/logowname.png';

function SignupForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, handleInputChange] = useInputChange();

  const handleSubmit = (e) => {
    e.preventDefault();

    let user = {
      ...input,
    };

    dispatch(signup(user)).then((res) => {
      res && navigate('/login');
    });
  };

  return (
    <Center w="100%" h="90%" flexDirection="column" gap={6}>
      <Error />
      <Stack spacing={5}>
        <Image src={logo} boxSize="130px" alignSelf="center" />
        <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
          <Heading size="md">Sign up for an account</Heading>
        </Stack>
      </Stack>

      <VStack bg="gray.100" padding={8} borderRadius={8} boxShadow="lg">
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                id="username"
                type="username"
                onChange={handleInputChange}
                bg="white"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                id="email"
                type="email"
                onChange={handleInputChange}
                bg="white"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type="password"
                onChange={handleInputChange}
                bg="white"
              />
              <FormHelperText>At least 5 characters long</FormHelperText>
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="password2">Confirm Password</FormLabel>
              <Input
                id="password2"
                type="password"
                onChange={handleInputChange}
                bg="white"
              />
            </FormControl>
            <Button colorScheme="blue" type="submit">
              Sign up
            </Button>
          </VStack>
        </form>
      </VStack>

      <Flex gap={2} wrap="wrap" justify="center">
        <Text color="muted" textAlign="center">
          Already have an account?
        </Text>
        <Button
          variant="link"
          colorScheme="blue"
          onClick={() => {
            navigate('/login');
          }}
        >
          Log in
        </Button>
      </Flex>
    </Center>
  );
}

export default SignupForm;
