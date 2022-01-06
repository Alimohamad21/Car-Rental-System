const express = require('express')
const app = express()
const cors = require('cors');
app.use(express.json())
app.use(cors());


const registerRouter = require('./routes/Users')
app.use("/users", registerRouter)

const loginRouter = require('./routes/Login')
app.use("/login",loginRouter)

app.listen(3001, () => {
    console.log('server running on 3001')
});

