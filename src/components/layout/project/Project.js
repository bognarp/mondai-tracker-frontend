import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProjectById } from '../../../actions/projectActions';
import {
  selectProjectById,
  selectProjectStatus,
} from '../../../reducers/selector';
import Sidebar from '../nav/Sidebar';
import Workspace from './WorkSpace';

function Project() {
  const params = useParams();
  const dispatch = useDispatch();
  const project = useSelector(selectProjectById(params.projectId));
  const status = useSelector(selectProjectStatus);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProjectById(params.projectId));
    }
  }, [status, dispatch, params.projectId]);

  if (status !== 'complete') {
    return <h3>Loading...</h3>;
  } else {
    return (
      <div style={{ display: 'flex', background: '#F5F5DC' }}>
        <Sidebar project={project} />
        <Workspace />
        <br />
        <small>project</small>
      </div>
    );
  }
}

export default Project;
