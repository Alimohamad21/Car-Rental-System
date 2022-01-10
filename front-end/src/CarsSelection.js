import React, {useEffect, useState} from "react";
import {Card, Form, ListGroup} from "react-bootstrap";
import {useLocation,useNavigate} from "react-router";

function CarsSelection(){
    const [cars,setCars] = useState([]);
    const [carBrand,setCarBrand] = useState(null);
    const [carModel,setCarModel] = useState(null);
    const [carEngine,setCarEngine] = useState(null);
    const [carColor,setCarColor] = useState(null);
    const [carPrice,setCarPrice] = useState(null);
    const [checkedIndex,setChecked] = useState(-1);
    let [error, setError] = useState('');
    const {state} = useLocation();
    const {pickupDate,pickupLocation,returnDate,returnLocation,pickupName,returnName, username} = state;
    const navigate = useNavigate();



    useEffect(() => {
        fetch("http://localhost:3001/cars", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }, body: JSON.stringify({
                pickupDate : pickupDate,
                pickupLocation: pickupLocation
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else
                throw Error(res.status);
        }).then((data) => { setCars(data)
            console.log(pickupName);
                console.log(returnName);
        }
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
                    <Form.Check type='radio' label='Select Car' id={`c${index}`} name='option'
                                onClick={event => setChecked(index)}
                    />
                    </Card.Body>
            </Card>
        );
    }

    const carSearch = () =>
    {
         fetch("http://localhost:3001/search", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                    pickupLocation: pickupLocation,
                    pickupDate: pickupDate,
                    carBrand : carBrand,
                    carModel: carModel,
                    carEngine : carEngine,
                    carColour: carColor,
                    carPrice : carPrice
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else
                throw Error(res.status);
        }).then(result => {
            setCars(result)
        }).catch(e => {
            console.log('ERROR 1: ', e);
        })
    }

    const goToPayment = () => {
        if (checkedIndex === -1)
            setError('Please Select Car');
        else {
            navigate("/payment",{state:{
                    'pickupDate':pickupDate,
                    'pickupName':pickupName,
                    'returnDate': returnDate,
                    'returnName':returnName,
                    'returnLocation':returnLocation,
                    'username':username,
                    'car': cars[checkedIndex]
                }})
        }
    }

    return(
        <div className="carsOptions">

            <div>
                <label>Brand: </label>
                <input type='text' onChange={(event) => {
                    setCarBrand(event.target.value);
                }}
                />
            </div>
            <div>
                <label>Model: </label>
                <input type='text' onChange={(event) => {
                    setCarModel(event.target.value);
                }}
                />
            </div>
            <div>
                <label>Engine: </label>
                <input type='text' onChange={(event) => {
                    setCarEngine(event.target.value);
                }}
                />
            </div>
            <div>
                <label>Color: </label>
                <input type='text' onChange={(event) => {
                    setCarColor(event.target.value);
                }}
                />
            </div>
            <div>
                <label>Max Price: </label>
                <input type='text' onChange={(event) => {
                    setCarPrice(event.target.value);
                }}
                />
            </div>
            <button onClick={carSearch}>
                Search
            </button>
            {cars.map(createCard)}
            <div>{error}</div>
            <button onClick={goToPayment}>Continue to Payment</button>
        </div>
    );

}
export default CarsSelection;