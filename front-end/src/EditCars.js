import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router";
import {Navbar, Container, NavDropdown, Nav} from 'react-bootstrap';

function EditCars() {
    const {state} = useLocation();
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);
    const homeNavigator = () => {
        navigate('/adminHome', {state: {'auth': true}})
    }
    const reservationsNavigator=()=>{
        navigate('/reservations',{state:{'auth':true}})
    }
    const editCar=(car)=>{
      console.log(car)
    }
    const addCarNavigator=()=>{
        navigate('/addCars',{state:{'auth':true}})
    }
    const carsNavigator = () => {
        navigate('/editCars', {state: {'auth': true}})
    }

    useEffect(() => {
        fetch("http://localhost:3001/cars", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else
                throw Error(res.status);
        }).then(carsList => {

            setCars(carsList)
        }).catch(e => {
            console.log('ERROR 1: ', e);
        })
        console.log(`$AFTER`)
    }, [])
    return state === null ? 'unauthorized' : (
        <div className="Home">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand  onClick={homeNavigator} href="/adminHome">Admin Portal</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={reservationsNavigator}>Reservations</Nav.Link>
                            <Nav.Link href="">Edit Cars</Nav.Link>
                            <Nav.Link onClick={addCarNavigator}>Add Car</Nav.Link>
                        </Nav>
                        <Nav className="float-end">
                            <Nav.Link href="/login">Log out</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {
                cars.map((car,key) => {
                        return (
                            <div>
                                <label>Car plate:</label><input value={car.plate}/> <button onClick={()=>editCar(cars[key])}>Edit</button>
                                <br/>
                                <br/>
                                <br/>
                            </div>
                        );

                    }
                )
            }
        </div>

    );
}

export default EditCars;
