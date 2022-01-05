const express = require('express')
const router=express.Router()
const {Users} = require('../models')
router.get('/',(async(req, res) => {
    const allUsers=await Users.findAll();
    res.json(allUsers)
}));
router.post("/",(async (req, res) => {
    const user=req.body;
    console.log(user)
    await Users.create(user);
    res.json(user)
}))
module.exports=router;
