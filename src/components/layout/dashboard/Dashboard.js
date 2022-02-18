import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserProjects } from '../../../actions/projectActions';
import { selectProjects, selectSessionInfo } from '../../../reducers/selector';

const ProjectList = ({ projects }) => {
  return (
    <>
      {projects.map((project) => (
        <Link to={`/projects/${project._id}`} key={project._id}>
          {project.title}
          <br />
        </Link>
      ))}
    </>
  );
};

function Dashboard() {
  const dispatch = useDispatch();
  const { byId, allIds, status } = useSelector(selectProjects, shallowEqual);
  const sessionInfo = useSelector(selectSessionInfo, shallowEqual);

  useEffect(() => {
    dispatch(fetchUserProjects(sessionInfo.user.id));
  }, [dispatch, sessionInfo]);

  if (status !== 'complete') return <div>loading...</div>;

  return (
    <>
      <h3>My Projects:</h3>
      <ProjectList projects={allIds.map((id) => byId[id])} />
      <br />
      <small>dashboard</small>
    </>
  );
}

export default Dashboard;
