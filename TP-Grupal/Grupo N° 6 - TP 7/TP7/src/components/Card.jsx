import React  from "react";
import {Card, Col} from "react-bootstrap";


const CardComponent = ({titulo, valor, variante, icono}) => {

    return(
        <Col md={3} className="mb-3">

            <Card bg={variante} text="white" className="shadow-sm">

            <Card.Body>

                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <Card.Title as="h5">{titulo}</Card.Title>
                        <Card.Text className="fs-3 fw-bold">{valor}</Card.Text>
                    </div>
                    <div className="fs-1 opacity-75">
                        {icono}
                    </div>
                </div>

            </Card.Body>

            </Card>
        
        </Col>
    )
}

export default CardComponent;