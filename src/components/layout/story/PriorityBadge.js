import { Badge } from '@chakra-ui/react';
import React from 'react';
import { priorityValues } from '../../../util/storyHelpers';

function PriorityBadge({ value }) {
  if (value) {
    const { color, content } = priorityValues[value];

    return (
      <Badge variant="subtle" colorScheme={color}>
        {content}
      </Badge>
    );
  }

  return null;
}

export default PriorityBadge;
