import { Grid, GridItem, Spinner } from '@chakra-ui/react';
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
    <Grid
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={0}
      bg="gray.300"
      maxHeight="93vh"
      minHeight="93vh"
    >
      <GridItem rowSpan={2} colSpan={1} bg="tomato" maxWidth="90%">
        <Sidebar title={project.title} navigation={toggleWorkspace} />
      </GridItem>
      {workspace.map((w) => (
        <GridItem colSpan={2} rowSpan={1} key={w}>
          <Workspace project={project} category={w} />
        </GridItem>
      ))}
    </Grid>
  );
}

export default Project;
