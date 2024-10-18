import React from 'react';
import { Modal, Button } from '@mantine/core';

interface ConfirmationModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ opened, onClose, onConfirm }) => {
  return (
    <Modal opened={opened} onClose={onClose} title="Confirm Deletion">
      <div className="p-4">
        <p>Do you really want to delete this todo?</p>
        <div className="flex justify-end mt-4">
          <Button onClick={onClose} variant="outline" className="mr-2">
            Cancel
          </Button>
          <Button onClick={onConfirm} color="red">
            Delete
          </Button>
        </div>
      </div>
    </Modal>
    
  );
};

export default ConfirmationModal;
