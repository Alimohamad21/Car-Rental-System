const express = require('express')
const router = express.Router()
const db = require('../database');
const md5 = require('md5')

async function checkIfAdmin(username) {
    let isAdmin = false;

    console.log(isAdmin)
    return isAdmin;
}

router.post("/", (async (req, res) => {
    const account = req.body.account;
    const signInMethod = account.includes("@") ? "email" : "username";
    const password = md5(req.body.password);
    db.query(
        `SELECT username FROM user WHERE ${signInMethod} = ? AND password = ?`,
        [account, password],
        async (error, rows) => {
            if (error)
                console.log(error);
            if (rows.length > 0) {
                console.log(rows[0].username)
                let username = signInMethod === 'username' ? account : rows[0].username;
                await db.query('SELECT *  FROM ADMIN WHERE username = ?', [username],
                    (error, rows) => {
                        if (rows.length > 0) {
                            res.json({
                                'data': 'success',
                                'admin': true
                            })
                        } else {
                            res.json({
                                'data': 'success',
                                'admin': false
                            })
                        }
                    }
                );
            } else
                res.json({'data': 'Invalid credentials'})
        }
    );
}));

module.exports = router;