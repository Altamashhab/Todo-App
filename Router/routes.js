const express = require('express')
const {createTask, getTask, updateTask, deleteTask } = require('../controllers/Task')

router = express.Router()



router.post('/createTask', createTask)
router.get('/getTask', getTask)
router.put('/updateTask/:task_id', updateTask)
router.delete('/deleteTask/:task_id', deleteTask)



module.exports = router 