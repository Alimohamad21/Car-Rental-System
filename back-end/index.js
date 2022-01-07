const express = require('express')
const app = express()
const cors = require('cors');
app.use(express.json())
app.use(cors());


const registerRouter = require('./routes/Register')
app.use("/register", registerRouter)

const loginRouter = require('./routes/Login')
app.use("/login",loginRouter)

app.listen(3001, () => {
    console.log('server running on 3001')
});

