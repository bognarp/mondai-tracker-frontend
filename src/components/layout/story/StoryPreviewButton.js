import { Button } from '@chakra-ui/react';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import storyAPI from '../../../util/storyAPI';

function StoryPreviewButton({ projectId, storyId, category, state }) {
  const userId = useSelector((state) => state.session.user.id);
  const queryClient = useQueryClient();

  const stopEventPropagation = (event) => {
    if (event.target === event.currentTarget) {
      event.stopPropagation();
    }
  };

  const { mutate } = useMutation(storyAPI.updateStory, {
    onSuccess: (newStory) => {
      queryClient.invalidateQueries(['stories', projectId]);
    },
  });

  const handleButtonClick = (state) => (event) => {
    stopEventPropagation(event);
    const patchObj = { state };

    if (state === 'STARTED' || state === 'RESTARTED') patchObj.owner = userId;

    mutate({ projectId, storyId, patchObj });
  };

  const buttonSwitch = () => {
    switch (state) {
      case 'UNSTARTED':
      case 'UNSCHEDULED':
        return (
          <Button
            colorScheme="teal"
            size="xs"
            variant="outline"
            onClick={handleButtonClick('STARTED')}
          >
            Start
          </Button>
        );
      case 'RESTARTED':
      case 'STARTED':
        return (
          <Button
            colorScheme="blue"
            size="xs"
            variant="outline"
            onClick={handleButtonClick('FINISHED')}
          >
            Finish
          </Button>
        );
      case 'FINISHED':
        return (
          <>
            <Button
              colorScheme="green"
              size="xs"
              variant="outline"
              onClick={handleButtonClick('ACCEPTED')}
            >
              Accept
            </Button>
            <Button
              colorScheme="red"
              size="xs"
              variant="outline"
              onClick={handleButtonClick('REJECTED')}
            >
              Reject
            </Button>
          </>
        );
      case 'REJECTED':
        return (
          <Button
            colorScheme="blue"
            size="xs"
            variant="outline"
            onClick={handleButtonClick('RESTARTED')}
          >
            Restart
          </Button>
        );
      default:
        return null;
    }
  };

  return buttonSwitch();
}

export default StoryPreviewButton;
