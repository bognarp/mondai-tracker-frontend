import { Button, Divider, Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import { workspaceMap } from '../../../util/workspaceHelpers';

function Sidebar({ title, navigation, selectedWorkspaces }) {
  const createButtons = () => {
    return Object.keys(workspaceMap).map((item) => {
      const variant = selectedWorkspaces.includes(workspaceMap[item])
        ? 'solid'
        : 'outline';

      return (
        <Button
          key={item}
          colorScheme='teal'
          onClick={navigation(workspaceMap[item])}
          variant={variant}
        >
          {item}
        </Button>
      );
    });
  };

  return (
    <VStack p={4} h="100%" spacing={4} bg="white">
      <Heading as="h2" fontSize="lg" textAlign="center">
        {title}
      </Heading>
      <Divider />
      <VStack as="nav">{createButtons()}</VStack>
    </VStack>
  );
}

export default Sidebar;
