import {useEffect, useState} from 'react'
import { Button } from 'react-bootstrap';
import ModalContacto from '../components/ejemplo-Portfolio/ModalContacto';
import '../../src/styles/Footer.css'
import Swal from 'sweetalert2';//importando a libreria de añertas 
import withReactContent from 'sweetalert2-react-content'; // estamos importando la parte de react de la libreria

const MySwal = withReactContent(Swal);

const Footer = () => {
  const [showModal, setShowModal] = useState(false);
const [datos,setDatos] = useState([]);

  const handleOpenModal = () => {
  setShowModal(true);
 
}

useEffect(() => {
if(!showModal) return;

 MySwal.fire({
  title: <strong>Bienvenido a mi Portfolio</strong>,
  html: <ModalContacto showModal={showModal} setShowModal={setShowModal} setDatos={setDatos} datos={datos} />,
 showConfirmButton: false,
  showCloseButton: true,
  
 })
 

}, [showModal]);

  return (
    <div>
     
      {showModal ? "" : <Button onClick={handleOpenModal} >Contactame</Button>}
       {showModal && <div>
        <h2>Contactame</h2>
      
      </div>}
      
    </div>
  )
}

export default Footer


