import { Avatar, Button, Container, Flex, Text } from '@chakra-ui/react';
import { debounce } from 'lodash-es';
import React, { useEffect, useMemo } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { alertUserError } from '../../../actions/errorActions';
import userAPI from '../../../util/userAPI';

const UserResult = ({ user }) => {
  const { name, username, email } = user;
  const { projectId } = useParams();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const isInvited = user.invites.some((invite) => {
    return invite.project === projectId;
  });
  const isMember = [...user.memberProjects, ...user.ownProjects].some(
    (project) => {
      return project === projectId;
    }
  );

  const { mutate, isLoading } = useMutation(userAPI.inviteUser, {
    onSuccess: () => {
      queryClient.refetchQueries('queryUsers', { exact: true });
    },
    onError: (error) => {
      console.log(error);
      dispatch(alertUserError(error));
    },
  });

  const sendInvite = useMemo(() => {
    return debounce(
      () => {
        mutate({ userId: user._id, projectId });
      },
      1000,
      {
        leading: true,
        trailing: false,
      }
    );
  }, [mutate, user._id, projectId]);

  useEffect(() => {
    return () => {
      sendInvite.cancel();
    };
  }, [sendInvite]);

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      p={3}
      boxShadow="xs"
      borderRadius="md"
    >
      <Flex alignItems="center">
        <Avatar
          name={name || username}
          bg="red.500"
          textColor="white"
          size="sm"
        />
        <Container lineHeight={1.3}>
          {name && <Text fontSize="md">{`${name} • ${username}`}</Text>}
          <Text fontSize="sm">{`${email}`}</Text>
        </Container>
      </Flex>
      <Flex>
        <Button
          isLoading={isLoading}
          disabled={isInvited || isMember}
          variant="solid"
          colorScheme="green"
          size="sm"
          onClick={sendInvite}
        >
          {isInvited ? 'Invited' : isMember ? 'Member' : 'Invite'}
        </Button>
      </Flex>
    </Flex>
  );
};

function Users({ queryResults }) {
  return (
    <Flex direction="column" gap={2}>
      {queryResults.map((user) => (
        <UserResult key={user._id} user={user} />
      ))}
    </Flex>
  );
}

export default Users;
