import React from 'react';
import { useDispatch } from 'react-redux';
import {
  FormControl,
  Input,
  Button,
  Heading,
  VStack,
  Stack,
  Text,
  Image,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';

import { login } from '../../actions/sessionActions';
import { useInputChange } from '../../hooks/useInputChange';
import Error from '../layout/Error';
import logo from '../layout/nav/logowname.png';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, handleInputChange] = useInputChange();

  const formBg = useColorModeValue('gray.100', 'gray.800');
  const inputBg = useColorModeValue('white', 'gray.700');

  const handleSubmit = (e) => {
    e.preventDefault();

    let user = {
      ...input,
    };

    dispatch(login(user));
  };

  return (
    <Flex w="100%" h="100vh" flexDirection="column" gap={6} alignItems="center" pt={6}>
      <Error />
      <Stack spacing={5}>
        <Image src={logo} boxSize="130px" alignSelf="center" />
        <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
          <Heading size="md">Log in to your account</Heading>
        </Stack>
      </Stack>
      <VStack bg={formBg} padding={8} borderRadius={8} boxShadow="lg">
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl>
              <Input
                id="email"
                type="email"
                placeholder="Enter email"
                onChange={handleInputChange}
                bg={inputBg}
              />
            </FormControl>
            <FormControl>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                onChange={handleInputChange}
                bg={inputBg}
              />
            </FormControl>
            <Button colorScheme="blue" type="submit">
              Log in
            </Button>
          </VStack>
        </form>
      </VStack>

      <Flex gap={2} wrap="wrap" justify="center">
        <Text color="muted" textAlign="center">
          Don't have an account?
        </Text>
        <Button
          variant="link"
          colorScheme="blue"
          onClick={() => {
            navigate('/signup');
          }}
        >
          Sign up
        </Button>
      </Flex>
    </Flex>
  );
}

export default LoginForm;
