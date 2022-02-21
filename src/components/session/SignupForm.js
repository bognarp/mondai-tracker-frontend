import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../actions/sessionActions';
import { useInputChange } from '../../hooks/useInputChange';
import Error from '../layout/Error';

function SignupForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, handleInputChange] = useInputChange();

  const handleSubmit = (e) => {
    e.preventDefault();

    let user = {
      ...input,
    };

    console.log('NEW USER: ', user);

    dispatch(signup(user)).then((res) => {
      res && navigate('/login');
      // if (res) navigate('/login');
    });
  };

  return (
    <Container maxWidth="container.sm" padding={3}>
      <VStack>
        <Heading size="xl">SignUp</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={3}>
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                id="username"
                type="username"
                onChange={handleInputChange}
              />
            </FormControl>
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
            <FormControl>
              <FormLabel htmlFor="password2">Confirm Password</FormLabel>
              <Input
                id="password2"
                type="password"
                onChange={handleInputChange}
              />
            </FormControl>
            <Button colorScheme="teal" type="submit">
              Signup
            </Button>
          </VStack>
        </form>
        <Error />
      </VStack>
    </Container>
  );
}

export default SignupForm;
