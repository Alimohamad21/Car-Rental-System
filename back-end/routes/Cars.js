const express = require('express')
const router = express.Router()
const db = require('../database');

router.get("/", (async (req, res) => {
    db.query(`SELECT * FROM CAR`,(error, rows) => {
        if (rows.length > 0) {
            res.json(rows);
        }
    });
}));
router.post("/add", (async (req, res) => {
    const plate = req.body.plate;
    const brand = req.body.brand;
    const model = req.body.model;
    const engine = req.body.engine;
    const colour = req.body.colour;
    const currentOffice= req.body.currentOffice;
    const rentPrice=req.body.rentPrice;
    const status=req.body.status;
    const pictureUrl=req.body.pictureUrl;
    db.query(`INSERT INTO CAR VALUES(?,?,?,?,?,?,?,?,?)`,[plate,brand,model,engine,colour,currentOffice,rentPrice,status,pictureUrl],(error, rows) => {
        if(error===null)
        {
            res.json({data:"Car added successfully"})
        }
        else {
            res.json({data:"Failed to add car, a car with the same plate number already exists or office doesn't exist"})
        }
    });
}));

router.post("/update", (async (req, res) => {
    const updatedValue = req.body.updatedValue;
    const updatedAttribute=req.body.updatedAttribute;
    const plate=req.body.plate;
    db.query(`UPDATE CAR SET ${updatedAttribute} = ? WHERE plate = ?`,[updatedValue,plate],(error, rows) => {
         if (error==null)
             res.json({data:`Successfully updated ${updatedAttribute} for car ${plate} with value=${updatedValue}`})
        else
            res.json({data:`Failed to update ${updatedAttribute} for car ${plate}, error is ${error}`})
    });
}));
module.exports = router;
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
module.exports = router;
