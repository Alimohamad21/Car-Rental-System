import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router";
import {Navbar, Container, NavDropdown, Nav, DropdownButton, Dropdown} from 'react-bootstrap';

function EditCars() {
    const {state} = useLocation();
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);
    const [updatedAttributeVal, setUpdatedAttributeVal] = useState('');
    const [attributesTitle, setAttributesTitle] = useState('Attribute to update')
    const [carPlateTitle, setCarPlateTitle] = useState('Car plates')
    const [updateResponse, setUpdateResponse] = useState('')

    const homeNavigator = () => {
        navigate('/adminHome', {state: {'auth': true}})
    }
    const reservationsNavigator = () => {
        navigate('/reservations', {state: {'auth': true}})
    }
    const updateCar = () => {

        if (updatedAttributeVal === '') {
            setUpdateResponse('Please insert a value')
        } else if(carPlateTitle==='Car plates' || attributesTitle==='Attribute to update'){
            setUpdateResponse('Please select a value from both drop downs')
        }
        else {
            let updatedAttribute = '';
            console.log(attributesTitle)
            if (attributesTitle === 'Rent Price') {
                updatedAttribute = 'rent_price'
            } else if (attributesTitle === 'Colour') {
                updatedAttribute = 'colour'
            } else if (attributesTitle === 'Status') {
                updatedAttribute = 'status'

            } else if (attributesTitle === 'Current Office') {
                updatedAttribute = 'current_office'
            }
            fetch("http://localhost:3001/cars/update", {
                method: "POST",
                body: JSON.stringify({
                    updatedValue: updatedAttributeVal,
                    plate: carPlateTitle,
                    updatedAttribute: updatedAttribute
                }),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }).then(res => {
                if (res.ok) {
                    return res.json();
                } else
                    throw Error(res.status);
            }).then(response => {
                setUpdateResponse(response.data)
            }).catch(e => {
                console.log('ERROR 1: ', e);
            })
        }
    }
    const addCarNavigator = () => {
        navigate('/addCars', {state: {'auth': true}})
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
                    <Navbar.Brand onClick={homeNavigator} href="/adminHome">Admin Portal</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
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
            <DropdownButton
                id="pickup-office"
                variant="secondary"
                menuVariant="dark"
                title={carPlateTitle}
                className="mt-2"
            >
                {
                    cars.map((car, key) => {
                            return (
                                <div>
                                    <Dropdown.Item eventKey={key}>
                                        <div onClick={() => setCarPlateTitle(car.plate)}>{car.plate}</div>
                                    </Dropdown.Item>
                                    <Dropdown.Divider/>
                                </div>
                            );
                        }
                    )
                }
            </DropdownButton>
            <DropdownButton
                id="pickup-office"
                variant="secondary"
                menuVariant="dark"
                title={attributesTitle}
                className="mt-2"
            >
                <Dropdown.Item eventKey='rent'>
                    <div onClick={() => setAttributesTitle('Rent Price')}>Rent Price</div>
                </Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item eventKey='status'>
                    <div onClick={() => setAttributesTitle('Status')}>Status</div>
                </Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item eventKey='current office'>
                    <div onClick={() => setAttributesTitle('Current Office')}>Current office</div>
                </Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item eventKey='colour'>
                    <div onClick={() => setAttributesTitle('Colour')}>Colour</div>
                </Dropdown.Item>
            </DropdownButton>
            <input type='text' onChange={(event) => {
                setUpdatedAttributeVal(event.target.value)
            }}
            />
            <button onClick={() => updateCar()}>Update</button>
            <div>{updateResponse}</div>
        </div>

    );
}

export default EditCars;
