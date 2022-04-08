import { Box } from '@chakra-ui/react';

function CounterBadge({ value }) {
  return (
    <Box
      as="span"
      pos="absolute"
      top="7px"
      right="6px"
      px={1}
      py={0.5}
      fontSize="xs"
      fontWeight="semibold"
      lineHeight="none"
      color="red.100"
      transform="translate(50%,-50%)"
      bg="red.500"
      rounded="full"
    >
      {value}
    </Box>
  );
}

export default CounterBadge;
