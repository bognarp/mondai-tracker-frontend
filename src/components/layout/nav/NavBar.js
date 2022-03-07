import { Flex, Image, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectSessionInfo } from '../../../reducers/selector';
import NavLinks from './NavLinks';
import logo from './mondai-circle.svg';

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
      boxShadow="md"
      position="relative"
      bg="blue.600"
      zIndex="1"
    >
      <Image src={logo} boxSize="35px" mx={4} />
      <NavLinks session={session} />
    </Flex>
  );
}

export default NavBar;
