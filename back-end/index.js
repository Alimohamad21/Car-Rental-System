const express = require('express')
const app = express()
const cors = require('cors');
app.use(express.json())
app.use(cors());


const registerRouter = require('./routes/Register')
app.use("/register", registerRouter)

const loginRouter = require('./routes/Login')
app.use("/login",loginRouter)

const locationsRouter = require('./routes/Locations')
app.use("/locations",locationsRouter)

const carsRouter = require('./routes/Cars')
app.use("/cars",carsRouter)

const searchRouter = require('./routes/Search')
app.use("/search",searchRouter)

app.listen(3001, () => {
    console.log('server running on 3001')
});

