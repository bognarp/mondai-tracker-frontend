import { Divider, Heading, VStack } from '@chakra-ui/react';
import React from 'react';

function Sidebar({ title, navigation }) {
  return (
    <VStack p={4} h="100%" spacing={4} bg="white">
      <Heading as="h2" fontSize="lg" textAlign="center">
        {title}
      </Heading>
      <Divider />
      <VStack as="nav">
        <button onClick={navigation('user')}>My Work</button>
        <button onClick={navigation('current')}>Current Sprint</button>
        <button onClick={navigation('backlog')}>Backlog</button>
        <button onClick={navigation('archive')}>Done</button>
      </VStack>
    </VStack>
  );
}

export default Sidebar;
