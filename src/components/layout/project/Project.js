import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProjectById } from '../../../actions/projectActions';

function Project() {
  const params = useParams();
  const dispatch = useDispatch();

  const project = useSelector((state) => {
    return state.entities.projects.byId[params.projectId];
  });

  useEffect(() => {
    if (!project) {
      dispatch(fetchProjectById(params.projectId));
    }
  }, [dispatch, project, params.projectId]);

  return <>{JSON.stringify(project)}</>;
}

export default Project;
