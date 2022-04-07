import { Box, Flex, IconButton, useColorModeValue } from '@chakra-ui/react';
import { MdNotificationsNone, MdNotifications } from 'react-icons/md';

function Notifications() {
  return (
    <IconButton
      isRound
      size="sm"
      fontSize="2xl"
      color="white"
      bg="transparent"
      _hover={{
        background: 'blackAlpha.400',
      }}
      icon={
        <>
          <MdNotifications />
          <Box
            as="span"
            pos="absolute"
            top="5px"
            right="3px"
            px={1.5}
            py={1}
            fontSize="xs"
            fontWeight="semibold"
            lineHeight="none"
            color="red.100"
            transform="translate(50%,-50%)"
            bg="red.500"
            rounded="full"
          >
            9
          </Box>
        </>
      }
    />
  );
}

export default Notifications;
