import React, { useState } from 'react';
import { Button, Divider, IconButton, Text, VStack } from '@chakra-ui/react';
import { workspaceIconMap, workspaceMap } from '../../../util/workspaceHelpers';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

function Sidebar({ title, navigation, selectedWorkspaces }) {
  const [collapsed, setCollapsed] = useState(false);

  const createButtons = () => {
    return Object.keys(workspaceMap).map((item) => {
      const variant = selectedWorkspaces.includes(workspaceMap[item])
        ? 'solid'
        : 'ghost';

      return (
        <Button
          key={item}
          iconSpacing={collapsed ? 0 : 3}
          size={collapsed ? 'md' : 'md'}
          leftIcon={workspaceIconMap[item]}
          onClick={navigation(workspaceMap[item])}
          variant={variant}
        >
          {collapsed ? null : item}
        </Button>
      );
    });
  };

  return (
    <>
      <VStack px={collapsed ? 2 : 4} h="100%" spacing={collapsed ? 12 : 4} bg="white" position="relative">
        <IconButton
          aria-label="Collapse sidebar"
          icon={collapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
          size="xs"
          isRound={true}
          onClick={() => setCollapsed(!collapsed)}
          position="absolute"
          top={2}
          right={-2.5}
        />
        {!collapsed && (
          <>
            <Text as="h2" fontSize="lg" fontWeight="extrabold">
              {title}
            </Text>
            <Divider />
          </>
        )}

        <VStack as="nav" align="baseline">
          {createButtons()}
        </VStack>
      </VStack>
    </>
  );
}

export default Sidebar;
