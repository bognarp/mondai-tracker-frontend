import { Badge } from '@chakra-ui/react';
import React from 'react';

function PriorityBadge({ value }) {
  const contentSwitch = (value) => {
    const priority = {
      color: '',
      content: '',
    };

    switch (value) {
      case 1:
        return { ...priority, color: 'green', content: 'Low' };
      case 2:
        return { ...priority, color: 'yellow', content: 'Medium' };
      case 3:
        return { ...priority, color: 'pink', content: 'High' };
      case 4:
        return { ...priority, color: 'red', content: 'Critical' };
      default:
        return priority;
    }
  };

  if (value) {
    return (
      <Badge variant="subtle" colorScheme={contentSwitch(value).color}>
        {contentSwitch(value).content}
      </Badge>
    );
  }

  return null;
}

export default PriorityBadge;
