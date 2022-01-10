const express = require('express')
const router = express.Router()
const db = require('../database');

router.post("/", (async (req, res) => {
    const username = req.body.username;
    db.query(`SELECT * FROM reservation WHERE username = ?`,
        [username],
        async (error, rows) => {
            if (rows.length > 0) {
                res.json(rows);
            }
        });
}));

module.exports = router;