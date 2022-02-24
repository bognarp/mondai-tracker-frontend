import { Center, Heading, Spinner, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjectStories } from '../../../actions/storyActions';
import { selectStoriesByCategory } from '../../../reducers/selector';
import { workspaceMap } from '../../../util/workspaceHelpers';
import StoryModal from '../story/StoryModal';

function Workspace({ project, category }) {
  const dispatch = useDispatch();
  const { status, allIds, byId } = useSelector(
    selectStoriesByCategory(category)
  );
  const userId = useSelector((state) => state.session.user.id);

  const sortByPriority = () => {
    return [...allIds].sort((a, b) => byId[b].priority - byId[a].priority);
  };

  const workspaceTitle = Object.keys(workspaceMap).find(
    (key) => workspaceMap[key] === category
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProjectStories(project._id, category, userId));
    }
  }, [status, dispatch, project._id, category, userId]);

  if (status === 'idle') {
    return null;
  }

  if (status !== 'complete') {
    return (
      <Center w="100%" h="100%">
        <Spinner color="gray.100" size="xl" />
      </Center>
    );
  }

  return (
    <VStack bg="gray.100" spacing={3} p={3} shadow="xl" m={1} borderRadius={5}>
      <Heading as="h3" fontSize="md">
        {workspaceTitle}
      </Heading>
      {sortByPriority().map((storyId) => (
        <StoryModal key={storyId} storyContent={byId[storyId]} />
      ))}
    </VStack>
  );
}

export default Workspace;
