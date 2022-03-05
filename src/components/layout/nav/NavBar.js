import { Flex, Image } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectSessionInfo } from '../../../reducers/selector';
import NavLinks from './NavLinks';
import logo from './testlogo.png';

function NavBar() {
  const session = useSelector(selectSessionInfo);

  return (
    <Flex
      as="header"
      w="100%"
      px={7}
      h="6vh"
      justifyContent="space-between"
      alignItems="center"
      boxShadow="md"
      position="relative"
      bg="white"
      zIndex="1"
    >
      <Image src={logo} boxSize="40px" mr={4} />
      <NavLinks session={session} />
    </Flex>
  );
}

export default NavBar;
