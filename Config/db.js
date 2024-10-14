const mongoose = require('mongoose')
require('dotenv').config()

const db = () => {
   mongoose.connect(process.env.DATABASE_URL, {
       useNewUrlParser: true,
       useUnifiedTopology: true
   })
   .then((data)=>{
     console.log(`Database is now connected ${data.connection.host}`);
   }).catch((error)=>{
     console.log(`Database is not connected  ${error}`);
   }) 
}

module.exports = db;