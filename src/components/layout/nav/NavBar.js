import { Flex, Image } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectSessionInfo } from '../../../reducers/selector';
import NavLinks from './NavLinks';
import logo from './logo.png';

function NavBar() {
  const session = useSelector(selectSessionInfo);

  return (
    <Flex
      as="header"
      w="100%"
      h="6vh"
      px={7}
      py={1}
      justifyContent="space-between"
      alignItems="center"
      boxShadow={session.isAuthenticated ? 'md' : null}
      position="relative"
      bg={session.isAuthenticated ? 'blue.600' : 'transparent'}
      zIndex="1"
    >
      <Image src={logo} boxSize="40px" mr={4} boxSizing="border-box" />
      <NavLinks session={session} />
    </Flex>
  );
}

export default NavBar;
