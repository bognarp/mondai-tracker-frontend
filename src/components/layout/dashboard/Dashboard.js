import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserProjects } from '../../../actions/projectActions';
import { selectProjects, selectSessionInfo } from '../../../reducers/selector';

const ProjectList = ({ projects }) => {
  return (
    <>
      {projects.allIds.map((projectId) => (
        <Link to={`/projects/${projectId}`} key={projectId}>
          {projects.byId[projectId].title}
          <br />
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
