import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserProjects } from '../../../actions/projectActions';
import { selectProjects } from '../../../reducers/projectsReducer';
import { selectSessionInfo } from '../../../reducers/sessionReducer';

const ProjectList = ({ projects }) => {
  return (
    <>
      {projects.allIds.map((projectId) => (
        <Link to={`/projects/${projectId}`} key={projectId}>
          {projects.byId[projectId].title}
        </Link>
      ))}
    </>
  );
};

function Dashboard() {
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects, shallowEqual);
  const sessionInfo = useSelector(selectSessionInfo, shallowEqual);

  useEffect(() => {
    dispatch(fetchUserProjects(sessionInfo.user.id));
  }, [dispatch, sessionInfo]);

  if (!projects) return <div>loading...</div>;

  return (
    <>
      <h3>My Projects:</h3>
      <ProjectList projects={projects} />
    </>
  );
}

export default Dashboard;
