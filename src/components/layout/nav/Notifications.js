import {
  Button,
  Center,
  Container,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { MdNotificationsNone, MdNotifications } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { selectSessionInfo } from '../../../reducers/selector';
import userAPI from '../../../util/userAPI';
import projectAPI from '../../../util/projectAPI';
import CounterBadge from './CounterBadge';
import { useMemo } from 'react';
import { debounce } from 'lodash-es';
import { alertUserError } from '../../../actions/errorActions';

const InviteNotification = ({ data, user }) => {
  const { project, sender } = data;
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { mutate: mutateAccept, isLoading: acceptIsLoading } = useMutation(
    projectAPI.acceptInvite,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('UserNotifications');
        queryClient.invalidateQueries('projects');
      },
      onError: (error) => {
        dispatch(alertUserError(error));
      },
    }
  );

  const { mutate: mutateReject, isLoading: rejectIsLoading } = useMutation(
    userAPI.removeInvite,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('UserNotifications');
      },
      onError: (error) => {
        dispatch(alertUserError(error));
      },
    }
  );

  const acceptInvite = useMemo(() => {
    return debounce(
      () => {
        mutateAccept({ projectId: project._id, userId: user.id });
      },
      1000,
      {
        leading: true,
        trailing: false,
      }
    );
  }, [mutateAccept, project, user.id]);

  const rejectInvite = useMemo(() => {
    return debounce(
      () => {
        mutateReject({ userId: user.id, inviteId: data._id });
      },
      1000,
      {
        leading: true,
        trailing: false,
      }
    );
  }, [mutateReject, user.id, data._id]);

  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        p={3}
        boxShadow="xs"
      >
        <Flex alignItems="center">
          <Icon as={MdNotifications} color="blue.500" boxSize={5} />
          <Container lineHeight={1.3}>
            <Text color={useColorModeValue('blue.500', 'blue.400')}>
              @{sender.username} invited you
            </Text>
            <Text
              color={useColorModeValue('gray.600', 'gray.200')}
              fontSize="xs"
            >
              Join {project.title} project?
            </Text>

            <Flex gap={2} mt={1}>
              <Button
                size={'xs'}
                colorScheme={'green'}
                variant={'outline'}
                isLoading={acceptIsLoading}
                onClick={acceptInvite}
              >
                Accept
              </Button>
              <Button
                size={'xs'}
                colorScheme={'red'}
                variant={'outline'}
                isLoading={rejectIsLoading}
                onClick={rejectInvite}
              >
                Reject
              </Button>
            </Flex>
          </Container>
        </Flex>
      </Flex>
    </>
  );
};

function Notifications() {
  const { user } = useSelector(selectSessionInfo);

  const { isLoading, data } = useQuery('UserNotifications', () => {
    return userAPI.fetchUserById({ userId: user.id, fields: ['invites'] });
  });

  return (
    <Menu isLazy>
      <MenuButton
        as={IconButton}
        isRound
        size="sm"
        fontSize="2xl"
        color="gray.100"
        bg="transparent"
        _hover={{
          background: 'blackAlpha.100',
        }}
        _active={{
          background: 'blackAlpha.100',
        }}
        icon={
          data && data.invites.length > 0 ? (
            <>
              <MdNotifications />
              <CounterBadge value={data.invites.length} />
            </>
          ) : (
            <MdNotificationsNone />
          )
        }
      />
      <MenuList pb={0}>
        <Center>
          <Text fontSize="xs">Notifications</Text>
        </Center>
        <MenuDivider mb={0} />
        {isLoading
          ? 'Loading'
          : data.invites.map((invite) => (
              <InviteNotification key={invite._id} data={invite} user={user} />
            ))}
      </MenuList>
    </Menu>
  );
}

export default Notifications;
