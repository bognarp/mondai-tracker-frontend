import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import ProjectCreateForm from './ProjectCreateForm';

function ProjectCreateModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} trapFocus={false}>
      <ModalOverlay />
      <ModalContent p={5}>
        <ModalCloseButton />
        <ProjectCreateForm onClose={onClose} />
      </ModalContent>
    </Modal>
  );
}

export default ProjectCreateModal;
