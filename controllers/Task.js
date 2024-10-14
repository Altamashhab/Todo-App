const taskSchema = require('../Model/Task')



 //CREATE TASK

exports.createTask = async (req, res) => {
    try{
        const {username, taskName, taskDesc, deadline} = req.body
        const response = await taskSchema.create({username, taskName, taskDesc, deadline});

         res.status(200).json({
            success: true,
            message: "Task is created successfully",
            data: response
        })
        
    }catch(error) {
         res.status(500).json({
            success: false,
            message: "Internal error occured"
        })
    }
}


// READ TASK

exports.getTask = async (req, res) => {
    const {task_id} = req.body
    try {
    const response = await taskSchema.find({task_id})
    res.status(200).json({
        success: true,
        message: "All data get",
        data: response
    })    
    } catch (error) {
       res.status(500).json({
          success: false,
          message: "Internal error occured"
       })  
    }
}


//UPDATE TASK

exports.updateTask = async (req, res) => {
     
    try {

     const {task_id, username, taskName, taskDesc, deadline } = req.body

     const response = await taskSchema.updateOne({task_id},{username, taskName, taskDesc, deadline}, {new: true})
     res.status(200).json({
        success: true,
        message: "Task Updated successfully",
        data: response
     })
        
    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Internal error occured"
        })
        
    }
}


   //DELETE TASK

   exports.deleteTask = async (req, res) => {
    try {
      const { task_id } = req.body
      const response = await taskSchema.deleteOne({ _id: task_id });
      res.status(200).json({
        success: true,
        message: "Task deleted successfully",
        data: response,
      });
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({
        success: false,
        message: "Internal error occurred",
      });
    }
  };
  