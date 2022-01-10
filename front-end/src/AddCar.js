import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router";
import {Navbar, Container, NavDropdown, Nav} from 'react-bootstrap';
import './index.css';

function AddCar() {
    const {state} = useLocation();
    const navigate = useNavigate();
    const [plate, setPlate] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [engine, setEngine] = useState('');
    const [colour, setColour] = useState('');
    const [currentOffice, setCurrentOffice] = useState('');
    const [rentPrice, setRentPrice] = useState('');
    const [status, setStatus] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');
    let [response, setResponse] = useState('');
    const homeNavigator = () => {
        navigate('/adminHome', {state: {'auth': true}})
    }
    const reservationsNavigator = () => {
        navigate('/reservations', {state: {'auth': true}})
    }
    const carsNavigator = () => {
        navigate('/editCars', {state: {'auth': true}})
    }
    const addCar = () => {
        if (plate === '' || brand === '' || model === '' || engine === '' || colour === '' || currentOffice === '' || rentPrice === '' || status === '' || pictureUrl === '') {
            setResponse('Please enter all required fields')
        } else {
            fetch("http://localhost:3001/cars/add", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "plate": plate,
                    "brand": brand,
                    "model": model,
                    "engine": engine,
                    "colour": colour,
                    "currentOffice": currentOffice,
                    "rentPrice": rentPrice,
                    "status": status,
                    "pictureUrl": pictureUrl
                }),
            }).then(res => {
                if (res.ok) {
                    console.log()
                    return res.json();
                } else
                    throw Error(res.status);
            }).then(result => {
                const response = result.data;
                console.log('Printed here 2')
                setResponse(response);
            }).catch(e => {
                console.log('ERROR 1: ', e);
            })
        }
    }
    return state === null ? 'unauthorized' : (
        <div className="Home">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand onClick={homeNavigator} href="/adminHome">Admin Portal</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={reservationsNavigator}>Reservations</Nav.Link>
                            <Nav.Link onClick={carsNavigator}>Edit Cars</Nav.Link>
                            <Nav.Link>Add Car</Nav.Link>
                        </Nav>
                        <Nav className="float-end">
                            <Nav.Link href="/">Log out</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="add-car">
                <h1>Add Car</h1>
                <div>
                <label>Plate: </label>
                <input type='text' onChange={(event) => {
                    setPlate(event.target.value);
                }}
                />
                </div>
                <div>
                <label>Brand: </label>
                <input type='text' onChange={(event) => {
                    setBrand(event.target.value);
                }}
                />
                </div>
                <div>
                <label>Model: </label>
                <input type='text' onChange={(event) => {
                    setModel(event.target.value);
                }}
                />
                </div>
                <div>
                <label>Engine: </label>
                <input type='text' onChange={(event) => {
                    setEngine(event.target.value);
                }}
                />
                </div>
                <div>
                <label>Colour: </label>
                <input type='text' onChange={(event) => {
                    setColour(event.target.value);
                }}
                />
                </div>
                <div>
                <label>Current Office: </label>
                <input type='text' onChange={(event) => {
                    setCurrentOffice(event.target.value);
                }}
                />
                </div>
                <div>
                <label>Rent Price: </label>
                <input type='text' onChange={(event) => {
                    setRentPrice(event.target.value);
                }}
                />
                </div>
                <div>
                <label>Status: </label>
                <input type='text' onChange={(event) => {
                    setStatus(event.target.value);
                }}
                />
                </div>
                <div>
                <label>Image Url: </label>
                <input type='text' onChange={(event) => {
                    setPictureUrl(event.target.value);
                }}
                />
                </div>
                <button onClick={addCar}>Add Car</button>
            </div>
            <div>{response}</div>
        </div>

    );
}

export default AddCar;
