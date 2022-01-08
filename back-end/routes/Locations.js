const express = require('express')
const router = express.Router()
const db = require('../database');

router.get("/", (async (req, res) => {
     db.query(`SELECT location FROM office`,(error, rows) => {
        if (rows.length > 0) {
            res.json(rows);
        }
    });
}));
module.exports = router;
