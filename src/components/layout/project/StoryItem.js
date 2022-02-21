import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from '@chakra-ui/react';
import React from 'react';

function StoryItem({ content }) {

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {content.title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Text>Description: {content.description}</Text>
        <Text>Priority: {content.priority}</Text>
        <Text>Difficulty: {content.difficulty}</Text>
        <Text>Requester: {content.requester}</Text>
        <Text>Owner: {content.owner}</Text>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default StoryItem;
