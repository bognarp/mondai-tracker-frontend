import { Flex, Grid, GridItem, Spinner } from '@chakra-ui/react';
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
    return <Spinner />;
  }

  const toggleWorkspace = (key) => (e) => {
    workspace.some((w) => w === key)
      ? setWorkspace(workspace.filter((w) => w !== key))
      : setWorkspace([...workspace, key]);
  };

  return (
    <Flex>
      <Sidebar title={project.title} navigation={toggleWorkspace} />
      <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap={1}
        p={2}
        bg="gray.800"
        h="93vh"
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
