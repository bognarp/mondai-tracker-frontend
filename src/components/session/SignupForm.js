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
  useColorModeValue,
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

  const formBg = useColorModeValue('gray.100', 'gray.800');
  const inputBg = useColorModeValue('white', 'gray.700');

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
    <Flex
      w="100%"
      h="100vh"
      flexDirection="column"
      gap={6}
      alignItems="center"
      pt={6}
      mb={3}
    >
      {/* <Error /> */}
      <Stack spacing={5}>
        <Image src={logo} boxSize="130px" alignSelf="center" />
        <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
          <Heading size="md">Sign up for an account</Heading>
        </Stack>
      </Stack>

      <VStack bg={formBg} padding={8} borderRadius={8} boxShadow="lg">
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                id="username"
                type="username"
                onChange={handleInputChange}
                bg={inputBg}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                id="email"
                type="email"
                onChange={handleInputChange}
                bg={inputBg}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type="password"
                onChange={handleInputChange}
                bg={inputBg}
              />
              <FormHelperText>At least 5 characters long</FormHelperText>
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="password2">Confirm Password</FormLabel>
              <Input
                id="password2"
                type="password"
                onChange={handleInputChange}
                bg={inputBg}
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
    </Flex>
  );
}

export default SignupForm;
