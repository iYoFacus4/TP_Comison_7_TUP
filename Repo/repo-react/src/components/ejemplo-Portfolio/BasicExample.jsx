import {Button,Card} from 'react-bootstrap';
import certificado1 from "../../assets/certificado1.png"
import certificado2 from "../../assets/certificado2.png"
import certificado3 from "../../assets/certificado3.png"
import "../../styles/Card.css"




function BasicExample() {

const certificados = [{imagen:certificado1, titulo:"Certificado JS", descripcion:"Curso intensivo de JavaScript para desarrollo web."},
                      {imagen:certificado2, titulo:"Certificado React", descripcion:"Curso completo de React y sus principales librerias."},
                      {imagen:certificado3, titulo:"Certificado Node.js", descripcion:"Aprendiendo backend con Node.js y Express."}]; 



  return (
    <div className="card-container">
    {certificados.map((cert,index)=>
    <Card style={{ width: '18rem' }} key = {index} className="card-certificados"  >
      <Card.Img variant="top" src= {cert.imagen}/>
      <Card.Body>
        <Card.Title>{cert.titulo}</Card.Title>
        <Card.Text>
          {cert.descripcion}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    )}
    </div>
  );
}

export default BasicExample;