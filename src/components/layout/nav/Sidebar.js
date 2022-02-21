import { Heading, VStack } from '@chakra-ui/react';
import React from 'react';

function Sidebar({ title, navigation }) {
  return (
  <VStack as="nav" p={4} bg="orange.300">
      <Heading as="h2" fontSize="lg">
        {title}</Heading>
      <button onClick={navigation('user')}>My Work</button>
      <button onClick={navigation('current')}>Current Sprint</button>
      <button onClick={navigation('backlog')}>Backlog</button>
      <button onClick={navigation('archive')}>Done</button>
  </VStack>
  );
}

export default Sidebar;
