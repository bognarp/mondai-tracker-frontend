import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { sample, debounce } from 'lodash-es';
import { useMutation, useQueryClient } from 'react-query';
import { useInputChange } from '../../../hooks/useInputChange';
import projectAPI from '../../../util/projectAPI';
import { useDispatch } from 'react-redux';
import { alertUserError } from '../../../actions/errorActions';

function ProjectCreateForm({ onClose }) {
  const [input, handleInputChange] = useInputChange();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { mutate, isLoading } = useMutation(projectAPI.createProject, {
    onSuccess: () => {
      queryClient.invalidateQueries('projects');
      onClose();
    },
    onError: (error) => {
      dispatch(alertUserError(error));
    },
  });

  const createNewProject = useMemo(() => {
    return debounce(
      () => {
        const avatar = sample(
          [...Array(19).keys(), 'default'].slice(1)
        ).toString();

        mutate({ ...input, avatar });
      },
      1000,
      {
        leading: true,
        trailing: false,
      }
    );
  }, [input, mutate]);

  return (
    <Box display="flex" flexDirection="column" mt={6}>
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
        <Button
          isLoading={isLoading}
          loadingText="Creating"
          type="submit"
          colorScheme="green"
          onClick={createNewProject}
        >
          Create
        </Button>
      </VStack>
    </Box>
  );
}

export default ProjectCreateForm;
