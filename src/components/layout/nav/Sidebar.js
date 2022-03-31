import React, { useEffect, useState } from 'react';
import {
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Link,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import { workspaceIconMap, workspaceMap } from '../../../util/workspaceHelpers';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { BsGithub } from 'react-icons/bs';
import ProjectSettingsDrawer from '../project/ProjectSettingsDrawer';

function Sidebar({ project, navigation, selectedWorkspaces }) {
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
      px={2}
      h="100%"
      spacing={collapsed ? 14 : 5}
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
        boxShadow="md"
      />
      {!collapsed && (
        <Flex direction="column" alignItems="center" gap={2}>
          <Image src={`/img/icon/${project.avatar}.svg`} boxSize="32px" />
          <Heading as="h2" fontSize="lg">
            {project.title}
          </Heading>
          <Divider />
        </Flex>
      )}

      <VStack as="nav" align="baseline">
        {createButtons()}
      </VStack>
      <Divider />
      <Flex direction="column" justifyContent="space-between" h="100%" w="100%">
        <ProjectSettingsDrawer collapsed={collapsed} project={project} />
        <Link
          href="https://github.com/bognarp/mondai-tracker-frontend"
          alignSelf="center"
          isExternal
        >
          <Icon as={BsGithub} m={3} w={5} h={5} />
        </Link>
      </Flex>
    </VStack>
  );
}

export default Sidebar;
