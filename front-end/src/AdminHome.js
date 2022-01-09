import React from "react";
import {useLocation, useNavigate} from "react-router";
import {Navbar,Container,Nav} from 'react-bootstrap';
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
                            <Nav.Link href="/login">Log out</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div >

    );
}

export default AdminHome;
