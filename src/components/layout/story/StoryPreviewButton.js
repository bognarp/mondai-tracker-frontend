import { Button } from '@chakra-ui/react';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import storyAPI from '../../../util/storyAPI';

const PreviewButton = ({ isLoading, onClick, children, color }) => {
  return (
    <Button
      isLoading={isLoading}
      loadingText={`${children}ing`}
      colorScheme={color}
      size="xs"
      variant="outline"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

function StoryPreviewButton({ projectId, storyId, category, state }) {
  const userId = useSelector((state) => state.session.user.id);
  const queryClient = useQueryClient();

  const stopEventPropagation = (event) => {
    if (event.target === event.currentTarget) {
      event.stopPropagation();
    }
  };

  const { mutate, isLoading: updateIsLoading } = useMutation(
    storyAPI.updateStory,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['stories', projectId]);
      },
    }
  );

  const handleButtonClick = (state) => (event) => {
    stopEventPropagation(event);
    const patchObj = { state };

    if (state === 'Started' || state === 'Restarted') patchObj.owner = userId;

    mutate({ projectId, storyId, patchObj });
  };

  const buttonSwitch = () => {
    switch (state) {
      case 'Unstarted':
      case 'Unscheduled':
        return (
          <PreviewButton
            isLoading={updateIsLoading}
            onClick={handleButtonClick('Started')}
            color={'green'}
          >
            Start
          </PreviewButton>
        );
      case 'Restarted':
      case 'Started':
        return (
          <PreviewButton
            isLoading={updateIsLoading}
            onClick={handleButtonClick('Finished')}
            color={'blue'}
          >
            Finish
          </PreviewButton>
        );
      case 'Finished':
        return (
          <>
            <PreviewButton
              isLoading={updateIsLoading}
              onClick={handleButtonClick('Accepted')}
              color={'green'}
            >
              Accept
            </PreviewButton>
            <PreviewButton
              isLoading={updateIsLoading}
              onClick={handleButtonClick('Rejected')}
              color={'red'}
            >
              Reject
            </PreviewButton>
          </>
        );
      case 'Rejected':
        return (
          <PreviewButton
            isLoading={updateIsLoading}
            onClick={handleButtonClick('Restarted')}
            color={'orange'}
          >
            Restart
          </PreviewButton>
        );
      default:
        return null;
    }
  };

  return buttonSwitch();
}

export default StoryPreviewButton;
