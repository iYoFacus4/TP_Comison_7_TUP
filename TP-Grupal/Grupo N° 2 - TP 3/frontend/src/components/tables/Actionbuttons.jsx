import React from 'react';
import styled from 'styled-components';

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Aligns buttons to the left of the cell */
  gap: 8px; /* Space between buttons */
`;

const ActionButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%; /* Makes the button circular */
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: #f3f4f6; /* Light grey background on hover */
    color: var(--primary-blue);
  }

  /* Specific hover color for the delete button */
  &.danger:hover {
    color: #DC2626; /* Red */
  }
`;

const ActionButtons = ({ onEdit, onDelete }) => {
  return (
    <ButtonsContainer>
      <ActionButton onClick={onEdit} title="Edit">
        <i className="fa-solid fa-pencil"></i>
      </ActionButton>
      <ActionButton className="danger" onClick={onDelete} title="Delete">
        <i className="fa-solid fa-trash"></i>
      </ActionButton>
    </ButtonsContainer>
  );
};

export default ActionButtons;