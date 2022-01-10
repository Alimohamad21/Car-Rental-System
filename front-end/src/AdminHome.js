import React from "react";
import {useLocation, useNavigate} from "react-router";
import {Navbar, Container, Nav, Card, ListGroup, Form} from 'react-bootstrap';
import './index.css';

function AdminHome() {
    const {state}=useLocation()
    const navigate = useNavigate();
    const reservationsNavigator=()=>{
        navigate('/reservations',{state:{'auth':true}})
    }
    const carsNavigator=()=>{
        navigate('/editCars',{state:{'auth':true}})
    }
    const addCarNavigator=()=>{
        navigate('/addCars',{state:{'auth':true}})
    }
    return state ===null?'unauthorized':(
        <div className="Home">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="">Admin Portal</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={reservationsNavigator}>Reservations</Nav.Link>
                            <Nav.Link onClick={carsNavigator}>Edit Cars</Nav.Link>
                            <Nav.Link onClick={addCarNavigator}>Add Car</Nav.Link>
                        </Nav>
                        <Nav className="float-end">
                            <Nav.Link href="/">Log out</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <h1 className="text-center">Admin Home</h1>
            <Card style={{ width: '118rem',height:'118rem' }}>
                <Card.Img variant="top" src='https://www.teslarati.com/wp-content/uploads/2018/08/tesla-roadster-matte-black-1-e1534872442960.jpeg'/>
                <Card.Body>
                </Card.Body>
            </Card>
        </div >

    );
}

export default AdminHome;
