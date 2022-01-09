import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Card,ListGroup,Form} from "react-bootstrap";

function CarsSelection(){
    const [cars,setCars] = useState([]);

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
            {cars.map(createCard)}
        </div>
    );

}
export default CarsSelection;