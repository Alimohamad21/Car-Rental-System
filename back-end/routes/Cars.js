const express = require('express')
const router = express.Router()
const db = require('../database');

router.post("/", (async (req, res) => {
    const pickup_time = req.body.pickupDate;
    const pickup_office = req.body.pickupLocation;
    db.query(`SELECT c.* FROM reservation r
                  JOIN (SELECT car_plate,MAX(return_time) time FROM reservation GROUP BY car_plate) x
                  ON x.car_plate = r.car_plate AND x.time = r.return_time
                  RIGHT JOIN car c ON c.plate = r.car_plate
                  WHERE c.status = 'Active'
                  AND (return_time < ? OR r.return_time IS NULL)
                  AND (return_office = ? OR (r.return_office IS NULL AND current_office = ?))`,
        [pickup_time,pickup_office,pickup_office],
        async (error, rows) => {
            if (rows.length > 0) {
                res.json(rows);
            }
        });
}));

router.post("/", (async (req, res) => {
    const username = req.body.username;
    const car_plate = req.body.car_plate;
    const pickup_time = req.body.pickup_time;
    const return_time = req.body.return_time;
    const return_office = req.body.return_office;
    const payment = req.body.payment;
    db.query(`INSERT INTO reservation (username, car_plate, pickup_time, return_time, return_office, payment) VALUES (?,?,?,?,?,?)`,
        [username, car_plate, pickup_time, return_time, return_office, payment],
        async (error) => {
            res.json({error});
        });
}));

router.get("/search", (async (req, res) => {
    // const brand = '';
    // const model = '';
    // const engine = '';
    // const colour = 'Red';
    // const price = '22';
    const brand = req.body.brand;
    const model = req.body.model;
    const engine = req.body.engine;
    const colour = req.body.colour;
    const price = req.body.price;
    let advancedSearch = false;
    let conditions = '';
    let valueList = [];
    if(brand!=='' &&  brand!=null)
    {
        if(!advancedSearch) {
            advancedSearch = true;
            conditions+=' WHERE brand = ? '
        }
        valueList.push(brand)
    }
    if(model!=='' &&  model!=null)
    {
        if(!advancedSearch) {
            advancedSearch = true;
            conditions+=' WHERE model = ? '
        }
        else {
            conditions+=' AND model = ? '
        }
        valueList.push(model)
    }
    if(engine!=='' &&  engine!=null)
    {
        if(!advancedSearch) {
            advancedSearch = true;
            conditions+=' WHERE engine = ? '
        } else {
            conditions+=' AND engine = ? '
        }
        valueList.push(engine)
    }
    if(colour!=='' &&  colour!=null)
    {
        if(!advancedSearch) {
            advancedSearch = true;
            conditions+=' WHERE colour = ? '
        } else {
            conditions+=' AND colour = ? '
        }
        valueList.push(colour)
    }
    if(price!=='' &&  price!=null)
    {
        if(!advancedSearch) {
            conditions+=' WHERE rent_price < ? '
        } else {
            conditions+=' AND rent_price <= ? '
        }
        valueList.push(parseInt(price))
    }
    db.query(`SELECT * FROM car ${conditions}`, valueList,
        async (error,result) => {
            res.json(result);
        });
}));

module.exports = router;