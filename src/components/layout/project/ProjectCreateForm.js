import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from 'react-query';
import { useInputChange } from '../../../hooks/useInputChange';
import projectAPI from '../../../util/projectAPI';

function ProjectCreateForm({ onClose }) {
  const [input, handleInputChange] = useInputChange();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(projectAPI.createProject, {
    onSuccess: () => {
      queryClient.invalidateQueries('projects');
      onClose();
    },
  });

  const createNewProject = (e) => {
    e.preventDefault();
    mutate(input);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      mt={6}
      as="form"
      onSubmit={createNewProject}
    >
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel fontWeight="bold" htmlFor="title">
            Project Name
          </FormLabel>
          <Input id="title" type="text" onChange={handleInputChange} />
        </FormControl>
        <FormControl>
          <FormLabel fontWeight="bold" htmlFor="description">
            Description
          </FormLabel>
          <Textarea id="description" type="text" onChange={handleInputChange} />
        </FormControl>
        <Button type="submit" colorScheme="green">
          Create
        </Button>
      </VStack>
    </Box>
  );
}

export default ProjectCreateForm;
