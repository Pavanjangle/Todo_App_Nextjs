import React from 'react';
import { Modal, Button } from '@mantine/core';

interface ConfirmationModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: (actionType:string) => void;
  confirmButtonTitle: string;
  actionType: string;
  message: string;
}
 
const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ opened, onClose, onConfirm, confirmButtonTitle, actionType, message }) => {
  return (
    <Modal opened={opened} onClose={onClose} title="Confirmation">
      <div className="p-4">
        <p>{message}</p>
        <div className="flex justify-end mt-4">
          <Button onClick={onClose} variant="outline" className="mr-2">
            Cancel
          </Button>
          <Button onClick={()=>onConfirm(actionType)} color="red">
           {confirmButtonTitle}
          </Button>
        </div>
      </div>
    </Modal>
    
  );
};

export default ConfirmationModal;
