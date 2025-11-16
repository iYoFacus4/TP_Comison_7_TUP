import React from 'react';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';

const Modal = ({ 
  show, 
  onHide, 
  title, 
  children, 
  onSave, 
  onCancel,
  saveText = 'Guardar',
  cancelText = 'Cancelar',
  size = 'lg'
}) => {
  return (
    <BootstrapModal show={show} onHide={onHide} size={size} centered>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>{title}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        {children}
      </BootstrapModal.Body>
      <BootstrapModal.Footer>
        <Button variant="secondary" onClick={onCancel || onHide}>
          {cancelText}
        </Button>
        <Button variant="primary" onClick={onSave}>
          {saveText}
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};

export default Modal;
