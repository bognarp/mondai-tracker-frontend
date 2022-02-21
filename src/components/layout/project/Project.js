import { Flex, Spinner } from '@chakra-ui/react';
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
    <div style={{ display: 'flex', background: '#F5F5DC' }}>
      <Sidebar title={project.title} navigation={toggleWorkspace} />

      <Flex p={5} justifyContent="space-evenly" wrap="wrap">
        {workspace.map((w) => (
          <Workspace key={w} project={project} category={w} />
        ))}
      </Flex>
    </div>
  );
}

export default Project;
