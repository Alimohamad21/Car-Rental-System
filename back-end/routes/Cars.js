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
