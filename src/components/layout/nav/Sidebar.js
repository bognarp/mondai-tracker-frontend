import React, { useEffect, useState } from 'react';
import {
  Button,
  Divider,
  Heading,
  IconButton,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import { workspaceIconMap, workspaceMap } from '../../../util/workspaceHelpers';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { MdOutlineSettings } from 'react-icons/md';

function Sidebar({ title, navigation, selectedWorkspaces }) {
  const [collapsed, setCollapsed] = useState(false);
  const [isLargerThanMd] = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    !isLargerThanMd ? setCollapsed(true) : setCollapsed(false);
  }, [setCollapsed, isLargerThanMd]);

  const createButtons = () => {
    return Object.keys(workspaceMap).map((item) => {
      const variant = selectedWorkspaces.includes(workspaceMap[item])
        ? 'solid'
        : 'ghost';

      return (
        <Button
          key={item}
          iconSpacing={collapsed ? 0 : 3}
          size={collapsed ? 'sm' : 'md'}
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
    <VStack
      px={collapsed ? 2 : 3}
      h="100%"
      pt={2}
      spacing={collapsed ? 12 : 5}
      bg="white"
      position="relative"
    >
      <IconButton
        aria-label="Collapse sidebar"
        icon={collapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
        size="xs"
        isRound={true}
        onClick={() => setCollapsed(!collapsed)}
        position="absolute"
        top={2}
        right={-2.5}
        boxShadow='md'
      />
      {!collapsed && (
        <Heading
          as="h2"
          fontSize="large"
          textAlign="center"
          verticalAlign="center"
        >
          {title}
        </Heading>
      )}
      <Divider />
      <VStack as="nav" align="baseline">
        {createButtons()}
      </VStack>
      <Divider />
      <Button
        iconSpacing={collapsed ? 0 : 3}
        size="sm"
        leftIcon={<MdOutlineSettings />}
        variant="ghost"
        alignSelf="baseline"
      >
        {collapsed ? null : 'Settings'}
      </Button>
    </VStack>
  );
}

export default Sidebar;
