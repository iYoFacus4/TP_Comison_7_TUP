import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../common/Input';
import Button from '../common/Button';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 8px;
    font-weight: 500;
    font-size: 0.9rem;
  }

  select {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    font-size: 1rem;
    background-color: white;
  }
`;

const ProductSelector = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 15px;
`;

const ProductSearch = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
`;

const AddedProductsList = styled.div`
  margin-top: 10px;
  /* Styles for the list of products added to the sale */
`;

const TotalContainer = styled.div`
  text-align: right;
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 10px;
`;


const SaleForm = ({ onSave, onCancel }) => {
  const [selectedClient, setSelectedClient] = useState('');
  const [addedProducts, setAddedProducts] = useState([]);
  
  const handleAddProduct = () => {
    // In a real app, this would add a searched product to the list
    console.log("Product added");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ client: selectedClient, products: addedProducts });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <SelectWrapper>
        <label htmlFor="client-select">Seleccionar Cliente</label>
        <select 
          id="client-select" 
          value={selectedClient} 
          onChange={(e) => setSelectedClient(e.target.value)}
        >
          <option value="" disabled>-- Elige un cliente --</option>
          <option value="1">Juan Pérez</option>
          <option value="2">María García</option>
        </select>
      </SelectWrapper>

      <ProductSelector>
        <h4>Añadir Productos a la Venta</h4>
        <ProductSearch>
          <Input 
            id="product-search"
            type="text"
            placeholder="Buscar producto por SKU o nombre..."
            style={{ flexGrow: 1 }}
          />
          <Button type="button" variant="secondary" onClick={handleAddProduct}>Añadir</Button>
        </ProductSearch>
        <AddedProductsList>
          {/* List of added products would render here */}
          <p>Los productos añadidos aparecerán aquí.</p>
        </AddedProductsList>
      </ProductSelector>
      
      <TotalContainer>
        Total: $0.00
      </TotalContainer>
      
      <ButtonContainer>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          Registrar Venta
        </Button>
      </ButtonContainer>
    </FormContainer>
  );
};

export default SaleForm;