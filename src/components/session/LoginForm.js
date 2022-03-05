import React from 'react';
import { useDispatch } from 'react-redux';
import {
  FormControl,
  Input,
  Button,
  Heading,
  VStack,
  Center,
} from '@chakra-ui/react';

import { login } from '../../actions/sessionActions';
import { useInputChange } from '../../hooks/useInputChange';
import Error from '../layout/Error';

function LoginForm() {
  const dispatch = useDispatch();
  const [input, handleInputChange] = useInputChange();

  const handleSubmit = (e) => {
    e.preventDefault();

    let user = {
      ...input,
    };

    dispatch(login(user));
  };

  return (
    <Center w="100%" h="60%">
      <VStack bg="gray.100" padding={8} borderRadius={8} boxShadow="md">
        <Heading size="lg" mb={4}>
          Log in
        </Heading>

        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl>
              <Input
                id="email"
                type="email"
                placeholder="Enter email"
                onChange={handleInputChange}
                bg="white"
              />
            </FormControl>
            <FormControl>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                onChange={handleInputChange}
                bg="white"
              />
            </FormControl>
            <Button colorScheme="blue" type="submit">
              Login
            </Button>
          </VStack>
        </form>

        <Error />
      </VStack>
    </Center>
  );
}

export default LoginForm;
