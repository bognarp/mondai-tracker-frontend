import { Alert, AlertIcon, Center, List, ListItem } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { isObject } from 'lodash-es';

function Error() {
  const getErrors = useSelector((state) => {
    return state.errors.session;
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
      <Center m={4} position="fixed" top={6}>
        <Alert status="error" borderRadius={8} boxShadow="md">
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
