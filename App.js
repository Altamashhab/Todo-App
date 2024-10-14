const express = require('express')
require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

const db = require('./Config/db')
db()

//middleware



app.use(cors({
   origin: 'http://localhost:5173',
   methods: ['POST', 'GET', 'PUT', 'DELETE']
}))

app.use(express.json())


const router = require('./Router/routes')
app.use('/api/v1', router)


app.get('/',(req, res)=>{
   console.log(req.body);
   res.send("Welcome to server")
})

const PORT = process.env.PORT  || 3000
app.listen(PORT,()=>{
   console.log(`Server is now running on port no ${PORT}`);
})