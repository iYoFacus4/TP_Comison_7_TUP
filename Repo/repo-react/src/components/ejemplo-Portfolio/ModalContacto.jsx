import { useState } from 'react';
import { Button,Container,Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

function ModalContacto({ showModal, setShowModal, setDatos, datos }) {
  const initialState = {
    nombre: '',
    telefono: '',
    email: '',
    mensaje: ''
  };
  const [formData, setFormData] = useState(initialState);
  

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario
  
    setDatos([...datos, formData]);
    console.log('Datos enviados:', datos);
    setFormData(initialState);
     Swal.close();
    setShowModal(false);
  }

  const handleChange = (e) => {
  
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  return (
    <>
      <Container className='formularios'>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <br />
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Enter name" value={formData.nombre} name="nombre" onChange={handleChange} />
              <br />
               <br />
              <Form.Label>Telefono</Form.Label>
              <Form.Control type="text" placeholder="Enter telefono" value={formData.telefono} name="telefono" onChange={handleChange} />
              <br />
               <br />
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={formData.email} name="email" onChange={handleChange} />
              <br />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicMessage">
              <br />
              <Form.Label>Mensaje</Form.Label>
              <br />
              <Form.Control as="textarea" rows={3} placeholder="Ingrese su mensaje" value={formData.mensaje} name="mensaje" onChange={handleChange} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </Form>
        </Container>
        {/* {datos.map((dato,index)=>
        <div key={index}>
          <h3>Mensaje {index + 1}</h3>
          <p><strong>Nombre:</strong> {dato.nombre}</p>
          <p><strong>Telefono:</strong> {dato.telefono}</p>
          <p><strong>Email:</strong> {dato.email}</p>
          <p><strong>Mensaje:</strong> {dato.mensaje}</p>
        </div>
      )} */}
    </>
  );
}

export default ModalContacto;