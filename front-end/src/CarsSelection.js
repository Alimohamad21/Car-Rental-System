import React, {useEffect, useState} from "react";
import {Card, Form, ListGroup} from "react-bootstrap";
import {useLocation} from "react-router";

function CarsSelection(){
    const [cars,setCars] = useState([]);
    const [carBrand,setCarBrand] = useState(null);
    const [carModel,setCarModel] = useState(null);
    const [carEngine,setCarEngine] = useState(null);
    const [carColor,setCarColor] = useState(null);
    const [carPrice,setCarPrice] = useState(null);
    const {state} = useLocation();
    const {pickupDate,pickupLocation,returnDate,returnLocation}=state;


    useEffect(() => {
        fetch("http://localhost:3001/cars", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }, body: JSON.stringify({
                pickupDate : pickupDate,
                pickupLocation: 2
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else
                throw Error(res.status);
        }).then((data) => { setCars(data) }
        ).catch(e => {
            console.log('ERROR 1: ', e);
        })
    }, [])



    const createCard = (card,index) =>{
        return (
            <Card style={{ width: '18rem' }} key={index}>
               <Card.Img variant="top" src={card.picture_url}/>
                    <Card.Body>
                    <Card.Title>{card.brand}</Card.Title>
                    <Card.Subtitle>{card.model}</Card.Subtitle>
                    <ListGroup variant="flush">
                    <ListGroup.Item>Color: {card.colour}</ListGroup.Item>
                    <ListGroup.Item>Engine: {card.engine}</ListGroup.Item>
                    <ListGroup.Item>Status: {card.status}</ListGroup.Item>
                    <ListGroup.Item>Price: {card.rent_price}$/day</ListGroup.Item>
                    </ListGroup>
                    <Form.Check type='radio' label='Select Car' id={`Select Car ${index}`} name='option'/>
                    </Card.Body>
            </Card>
        );
    }


    return(
        <div className="carsOptions">
            <select
                className="mt-2"
                onChange={e => setCarBrand(e.target.value)}
            >
                <option selected disabled hidden>Brand</option>
                {cars.map((card, index) =>
                    <option
                        key={index}> {card.brand}
                    </option>
                )}
            </select>
            <select
                className="mt-2"
                onChange={e => setCarModel(e.target.value)}
            >
                <option selected disabled hidden>Model</option>
                {cars.map((card,index) =>
                    <option key={index}>{card.model}</option>
                )}
            </select>
            <select
                className="mt-2"
                onChange={e => setCarEngine(e.target.value)}
            >
                <option selected disabled hidden>Engine</option>
                {cars.map((card,index) =>
                    <option key={index}>{card.engine}</option>
                )}
            </select>
            <select
                className="mt-2"
                onChange={e => setCarColor(e.target.value)}
            >
                <option selected disabled hidden>Color</option>
                {cars.map((card,index) =>
                    <option key={index}>{card.colour}</option>
                )}
            </select>
            <select
                className="mt-2"
                onChange={e => setCarPrice(e.target.value)}
            >
                <option selected disabled hidden>Price</option>
                {cars.map((card,index) =>
                    <option key={index}>{card.rent_price}</option>
                )}
            </select>
            <button>
                Search
            </button>
            {cars.map(createCard)}
        </div>
    );

}
export default CarsSelection;