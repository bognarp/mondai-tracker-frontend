import { Center, Heading, Spinner, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjectStories } from '../../../actions/storyActions';
import { selectStoriesByCategory } from '../../../reducers/selector';
import StoryModal from '../story/StoryModal';

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

  const workspaceTitle = () => {
    switch (category) {
      case 'current':
        return 'Current Sprint';
      case 'user':
        return 'My Work';
      case 'backlog':
        return 'Backlog';
      case 'archive':
        return 'Done';
      default:
        break;
    }
  };

  if (status === 'idle') {
    return null;
  }

  if (status !== 'complete') {
    return (
      <Center w="100%" h="100%">
        <Spinner />
      </Center>
    );
  }

  return (
    <VStack bg="white" spacing={3} p={3} shadow="xl" m={2} borderRadius={10}>
      <Heading as="h3" fontSize="md">
        {workspaceTitle()}
      </Heading>
      {allIds.map((storyId) => (
        <StoryModal key={storyId} />
      ))}
    </VStack>
  );
}

export default Workspace;
