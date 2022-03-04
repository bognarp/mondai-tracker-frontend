import userAPI from '../../../util/userAPI';
import { Spinner } from '@chakra-ui/react';
import { useQuery } from 'react-query';

function Profile() {
  const { isLoading, data, isError, error } = useQuery('userInfo', () => {
    return userAPI.fetchCurrentUser();
  });

  if (isLoading) return <Spinner />;
  if (isError) return <h3>{error.message}</h3>;

  const { username, email, ownProjects, memberProjects } = data;

  return (
    <div>
      <h2>{username}</h2>
      <p>email: {email}</p>
      <p>my projects:</p>
      <ul>
        {ownProjects.map((project) => (
          <li key={project._id}>{project.title}</li>
        ))}
      </ul>
      <p>member projects: {memberProjects}</p>
    </div>
  );
}

export default Profile;
