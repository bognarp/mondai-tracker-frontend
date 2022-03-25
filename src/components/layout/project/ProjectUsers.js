import { Text, Flex, Avatar, Container } from '@chakra-ui/react';
import React from 'react';

const ProjectUser = ({ user, role }) => {
  const { name, username, email } = user;
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
        <Text>{role}</Text>
      </Flex>
    </Flex>
  );
};

function ProjectUsers({ members, owners }) {
  return (
    <>
      {owners.map((owner) => (
        <ProjectUser key={owner._id} user={owner} role={'owner'} />
      ))}
      {members.map((member) => (
        <ProjectUser key={member._id} user={member} role={'member'} />
      ))}
    </>
  );
}

export default ProjectUsers;
