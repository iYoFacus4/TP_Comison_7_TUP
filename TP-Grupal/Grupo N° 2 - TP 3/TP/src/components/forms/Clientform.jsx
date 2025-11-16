import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../common/Input';
import Button from '../common/Button';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 10px;
`;

const ClientForm = ({ onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, email, phone });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input
        label="Nombre Completo"
        id="client-name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ej: Juan Pérez"
        required
      />
      <Input
        label="Email"
        id="client-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="ejemplo@email.com"
        required
      />
      <Input
        label="Teléfono"
        id="client-phone"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="11-2345-6789"
      />
      <ButtonContainer>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          Guardar Cliente
        </Button>
      </ButtonContainer>
    </FormContainer>
  );
};

export default ClientForm;