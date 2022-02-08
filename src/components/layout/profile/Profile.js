import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../../actions/userActions';

function Profile() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.session.userInfo);

  useEffect(() => {
    if (Object.keys(userInfo).length === 0) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, userInfo]);

  const { username, email, ownProjects, memberProjects } = userInfo;

  return (
    <div>
      <h2>{username}</h2>
      <p>email: {email}</p>
      <p>my projects: {ownProjects}</p>
      <p>member projects: {memberProjects}</p>
    </div>
  );
}

export default Profile;
