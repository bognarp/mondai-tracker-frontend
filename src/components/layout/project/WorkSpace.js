import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjectStories } from '../../../actions/storyActions';
import { selectStoriesByCategory } from '../../../reducers/selector';

function Workspace({ project, category }) {
  const dispatch = useDispatch();
  const { status, allIds, byId } = useSelector(
    selectStoriesByCategory(category)
  );
  const userId = useSelector((state) => state.session.user.id);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProjectStories(project._id, category, userId));
    }
  }, [status, dispatch, project._id, category, userId]);

  if (status === 'idle') {
    return null;
  }

  if (status !== 'complete') {
    return <h3>Loading...</h3>;
  }
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        border: 'solid 1px',
        padding: '1rem',
        background: 'peachpuff',
      }}
    >
      <h3>{category}</h3>
      <ul>
        {allIds.map((storyId) => (
          <li key={storyId}>
            <div>
              {byId[storyId].title}
              <br /> description: {byId[storyId].description}
              <br /> status: {byId[storyId].state}
            </div>
          </li>
        ))}
      </ul>
      <br />
      <small>workspace</small>
    </div>
  );
}

export default Workspace;
