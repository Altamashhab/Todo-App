const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    
    username:{
        type:String,
        required:true
    },
    taskName:{
        type:String,
        required:true
    },
    taskDesc:{
        type:String,
        required:true
    },
    deadline:{
        type:Date,
        required:true
    }
})

module.exports = mongoose.model("task", taskSchema)