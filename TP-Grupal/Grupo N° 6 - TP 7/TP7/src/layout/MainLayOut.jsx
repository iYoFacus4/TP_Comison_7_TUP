import React from "react";
import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import AppNavbar from "./Navbar";
import Sidebar from "./Sidebar";



const MainLayOut = () => {

    return(

        <div className="d-flex flex-column vh-100">
            <AppNavbar />
            <Container fluid className="flex-grow-1">
                <Row className="h-100">
                    <Col md={3} lg={2} className="d-none d-md-block bg-light p-0 h-100">
                        <Sidebar />
                    </Col>

                    <Col md={9} lg={10} className="ms-sm-auto px-md-4 overflow-auto">
                        <Outlet />
                    </Col>
                </Row>
            </Container>
        </div>





    )
}
export default MainLayOut;