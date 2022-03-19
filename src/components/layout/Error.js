import { Alert, AlertIcon, Center, List, ListItem } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { isObject } from 'lodash-es';

function Error() {
  const getErrors = useSelector((state) => {
    return state.errors;
  });

  if (getErrors.length !== 0) {
    let message = getErrors[0].message;

    if (isObject(message)) {
      message = Object.keys(message).reduce((prev, curr) => {
        return [...prev, message[curr]];
      }, []);
    } else {
      message = [message];
    }

    return (
      <Center position="fixed" top={50} zIndex="1" w="100%">
        <Alert status="error" borderRadius={8} boxShadow="md" w="45%">
          <AlertIcon />
          <List>
            {message.map((msg) => (
              <ListItem key={msg}>{msg}</ListItem>
            ))}
          </List>
        </Alert>
      </Center>
    );
  }

  return null;
}

export default Error;
