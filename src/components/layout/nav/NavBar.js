import { Flex, Image } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectSessionInfo } from '../../../reducers/selector';
import NavLinks from './NavLinks';
import logoDark from './logoDark.png';
import logoLight from './logo.png';

function NavBar() {
  const session = useSelector(selectSessionInfo);

  return (
    <Flex
      as="header"
      w="100%"
      h="6vh"
      px={14}
      py={1}
      justifyContent="space-between"
      alignItems="center"
      position="relative"
      bg={session.isAuthenticated ? 'blue.600' : 'transparent'}
      zIndex="1"
    >
      <Image
        src={session.isAuthenticated ? logoLight : logoDark}
        w="60px"
        mr={4}
        boxSizing="border-box"
      />

      <NavLinks session={session} />
    </Flex>
  );
}

export default NavBar;
