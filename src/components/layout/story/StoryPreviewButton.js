import { Button } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProjectStory } from '../../../actions/storyActions';

function StoryPreviewButton({ project, storyId, category, state }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id);

  const stopEventPropagation = (event) => {
    if (event.target === event.currentTarget) {
      event.stopPropagation();
    }
  };

  const handleButtonClick = (state) => (event) => {
    stopEventPropagation(event);
    dispatch(
      updateProjectStory({ state, owner: userId }, project, storyId, category)
    );
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
