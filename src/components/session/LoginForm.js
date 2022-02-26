import React from 'react';
import { useDispatch } from 'react-redux';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Container,
  Heading,
  VStack,
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
    <Container maxWidth="container.sm" padding={3}>
      <VStack>
        <Heading size="xl">Login</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={3}>
            <FormControl>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input id="email" type="email" onChange={handleInputChange} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type="password"
                onChange={handleInputChange}
              />
            </FormControl>
            <Button colorScheme="teal" type="submit">
              Login
            </Button>
          </VStack>
        </form>
        <Error />
      </VStack>
    </Container>
  );
}

export default LoginForm;
