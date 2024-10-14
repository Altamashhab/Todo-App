import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'


const Todo = () => {
const navigate = useNavigate();

    const [task, setTask] = useState({
        username : "",  
        taskName : "",
        taskDesc: "",
        deadline: ""
    })

    const handleChange = (e) => {
        setTask({
            ...task,
            [e.target.name]:e.target.value
        })
    }
   
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(task)
      try {

        await axios.post('http://localhost:3000/api/v1/createTask', {
          username: task.username,
          taskName: task.taskName,
          taskDesc: task.taskDesc,
          deadline: task.deadline
        })
        
        toast.success("Todo Added successfully")
        navigate('/tasks')
      } catch (error) {
         toast.error("Something went wrong")        
      }

     
    }
     
  return (
    <div className='w-full h-screen  flex justify-center items-center'>
        <form action="" method='POST' className='w-4/5 h-82 rounded  p-5 mt-3' onSubmit={handleSubmit}>
            <h1 className='text-3xl text-center text-white p-4 font-normal uppercase'>Todo App</h1>
            <input className='p-2  mt-3 outline-none w-full rounded' 
            type="text"
            name='username'
            placeholder='Enter Your username'
            onChange={handleChange}/>

            <br/>
            
            <input className='p-2 mt-3 outline-none w-full rounded' 
            type="text" 
            name='taskName'
            placeholder='Enter Your Task Name'
            onChange={handleChange}/>

             <br/>

            <input className='p-2 mt-3 outline-none w-full rounded' 
            type="text"
            name='taskDesc' 
            placeholder='Enter Your Task Desc'
            onChange={handleChange}/>

            <br/>

            <input className='p-2 mt-3 outline-none w-full rounded' 
            type="date"
            name='deadline' 
            placeholder='Enter Date'
            onChange={handleChange}/>

            <br/>
            <button className='bg-blue-900  p-2 mt-3 w-full rounded tracking-wider text-white'>Add Todo</button>
            <Link to='/tasks'><button className='bg-orange-800 p-2 mt-3 w-full rounded text-white'>Views Todo</button></Link>
        </form>
    </div>
    
  )
}

export default Todo