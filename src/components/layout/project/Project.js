import { Center, Flex, Grid, GridItem, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProjectById } from '../../../actions/projectActions';
import {
  selectProjectById,
  selectProjectsStatus,
} from '../../../reducers/selector';
import Sidebar from '../nav/Sidebar';
import Workspace from './Workspace';

function Project() {
  const params = useParams();
  const dispatch = useDispatch();

  const projectsStatus = useSelector(selectProjectsStatus);
  const project = useSelector(selectProjectById(params.projectId));

  const [workspace, setWorkspace] = useState(['current']);

  useEffect(() => {
    if (projectsStatus === 'idle') {
      dispatch(fetchProjectById(params.projectId));
    }
  }, [projectsStatus, dispatch, params.projectId]);

  if (projectsStatus !== 'complete') {
    return (
      <Center w="100%" h="100%">
        <Spinner color="gray.100" size="xl" />
      </Center>
    );
  }

  const toggleWorkspace = (key) => () => {
    workspace.some((ws) => ws === key)
      ? setWorkspace(workspace.filter((ws) => ws !== key))
      : setWorkspace([...workspace, key]);
  };

  return (
    <Flex h="93vh">
      <Sidebar
        title={project.title}
        navigation={toggleWorkspace}
        selectedWorkspaces={workspace}
      />
      <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap={1}
        pl={4}
        pr={3}
        py={2}
        bg="gray.800"
        w="100%"
      >
        {workspace.map((w) => (
          <GridItem colSpan={1} rowSpan={1} key={w}>
            <Workspace project={project} category={w} />
          </GridItem>
        ))}
      </Grid>
    </Flex>
  );
}

export default Project;
