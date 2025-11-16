import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../common/Input';
import Button from '../common/Button';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 10px;
`;

const ProductForm = ({ onSave, onCancel }) => {
  // State for form fields
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [stock, setStock] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, sku, category, price, size, color, stock });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input
        label="Nombre del Producto"
        id="product-name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ej: Camisa de Algodón"
        required
      />
      <Grid>
        <Input
          label="SKU"
          id="product-sku"
          type="text"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          placeholder="CAM-ALG-001"
          required
        />
        <Input
          label="Categoría"
          id="product-category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Camisas"
          required
        />
      </Grid>
      <Grid>
        <Input
          label="Talle"
          id="product-size"
          type="text"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          placeholder="M, L, 32, 42..."
          required
        />
        <Input
          label="Color"
          id="product-color"
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          placeholder="Azul, Negro, etc."
          required
        />
      </Grid>
      <Grid>
        <Input
          label="Precio"
          id="product-price"
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="35.00"
          required
        />
        <Input
          label="Stock Inicial"
          id="product-stock"
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="15"
          required
        />
      </Grid>

      <ButtonContainer>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          Guardar Producto
        </Button>
      </ButtonContainer>
    </FormContainer>
  );
};

export default ProductForm;