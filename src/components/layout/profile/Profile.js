import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import { fetchUserInfo } from '../../../actions/userActions';
import { selectUserInfo } from '../../../reducers/selector';

function Profile() {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    if (_.isEmpty(userInfo)) {
      dispatch(fetchUserInfo());
    }
  }, [dispatch, userInfo]);

  const { username, email, ownProjects, memberProjects } = userInfo;

  return (
    <div>
      <h2>{username}</h2>
      <p>email: {email}</p>
      <p>my projects:</p>
      <ul>
        {!_.isEmpty(userInfo) &&
          ownProjects.map((project) => (
            <li key={project._id}>{project.title}</li>
          ))}
      </ul>
      <p>member projects: {memberProjects}</p>
    </div>
  );
}

export default Profile;
