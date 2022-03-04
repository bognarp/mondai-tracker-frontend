import { Spinner } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectSessionInfo } from '../../../reducers/selector';
import userAPI from '../../../util/userAPI';

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
  const sessionInfo = useSelector(selectSessionInfo);

  const { isLoading, data, isError, error } = useQuery('projects', () => {
    return userAPI.fetchProjectsByUserId(sessionInfo.user.id);
  });

  if (isLoading) return <Spinner />;
  if (isError) return <h3>{error.message}</h3>;

  return (
    <>
      <h3>My Projects:</h3>
      <ProjectList projects={data} />
    </>
  );
}

export default Dashboard;
