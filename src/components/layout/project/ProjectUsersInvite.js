import React, { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useQuery, useQueryClient } from 'react-query';
import { MdPeopleAlt, MdSearch } from 'react-icons/md';
import userAPI from '../../../util/userAPI';
import { debounce } from 'lodash-es';
import Users from './Users';

const SearchUsers = () => {
  const queryClient = useQueryClient();
  const [query, setQuery] = useState('');

  const { isLoading, data, isError, refetch, error, isIdle, isFetching } =
    useQuery(
      'queryUsers',
      () => {
        if (query.trim().length > 0) {
          return userAPI.queryUsers(query);
        }
      },
      {
        enabled: false,
        refetchOnWindowFocus: false,
      }
    );

  const debouncedFetch = useMemo(() => {
    return debounce(refetch, 1000);
  }, [refetch]);

  useEffect(() => {
    return () => {
      debouncedFetch.cancel();
      queryClient.resetQueries('queryUsers', { exact: true });
    };
  }, [debouncedFetch, queryClient]);

  const handleChange = (event) => {
    setQuery(event.target.value);
    debouncedFetch();
  };

  return (
    <>
      <InputGroup mb={4}>
        <InputLeftElement
          pointerEvents="none"
          children={<MdSearch color="gray.300" />}
        />
        <Input
          type="tel"
          placeholder="Find by username or email"
          value={query}
          onChange={handleChange}
        />
        <InputRightElement width="4.5rem">
          {query.trim().length > 0 && (
            <Button
              h="1.75rem"
              size="xs"
              onClick={() => {
                setQuery('');
                queryClient.resetQueries('queryUsers', { exact: true });
              }}
            >
              clear
            </Button>
          )}
        </InputRightElement>
      </InputGroup>

      {isIdle ? null : isLoading ? (
        <span>Loading...</span>
      ) : isError ? (
        <span>Error: {error.message}</span>
      ) : data ? (
        <Users queryResults={data} />
      ) : (
        <div>{isFetching ? 'Searching...' : null}</div>
      )}
    </>
  );
};

function ProjectUsersInvite() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        size="sm"
        alignSelf="flex-end"
        variant="link"
        w="120px"
        textColor="green.600"
        leftIcon={<MdPeopleAlt />}
      >
        Invite People
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} trapFocus={true}>
        <ModalOverlay />
        <ModalContent p={5}>
          <SearchUsers />
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProjectUsersInvite;
