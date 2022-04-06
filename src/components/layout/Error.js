import { List, ListItem, useToast, VisuallyHidden } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { isObject } from 'lodash-es';
import React from 'react';

function Error() {
  const toast = useToast();
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
      <VisuallyHidden>
        {toast({
          position: 'top',
          description: (
            <List>
              {message.map((m) => (
                <ListItem key={m}>{m}</ListItem>
              ))}
            </List>
          ),
          status: 'error',
          duration: 7000,
          isClosable: true,
        })}
      </VisuallyHidden>
    );
  }

  return null;
}

export default Error;
