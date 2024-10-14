import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {Link} from 'react-router-dom'

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [updatedTask, setUpdatedTask] = useState({
     _id: "",
     username: "",
     taskName: "",
     taskDesc: "",
     deadline: ""
  });

  const [isUpdating, setIsUpdating] = useState(false)


  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/v1/getTask');
        console.log(res);
        setTasks(res.data.data);
      } catch (error) {
        toast.error("Failed to fetch tasks");
      }
    };
    fetchTask();
  }, []);


  // Delete Todo

  const deleteTodo = async (task_id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/v1/deleteTask/${task_id}`,{
        data: {task_id}
      });
      console.log(res);
      setTasks(tasks.filter(task => task._id !== task_id));
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  //Update Todo

  const updateTodo = async () => {
    try {
      const res = await axios.put(`http://localhost:3000/api/v1/updateTask/${updatedTask._id}`, updatedTask)
      console.log(res.data.data);
      setTasks(tasks.map(task => (task._id === updatedTask._id ? res.data.data : task)));
      toast.success("Task updated successfully");
      setIsUpdating(true);
      setUpdatedTask({ _id: "", username: "", taskName: "", taskDesc: "", deadline: ""});
    } catch (error) {
      toast.error("Failed to update task");
    }
  };
  

  const handleInputChange = (e) => {
       const {name, value} = e.target;
       setUpdatedTask({...updatedTask, [name]: value});
  };

  const handleEditClick = (task) => {
     setIsUpdating(true);
     setUpdatedTask(task);
  };

  return (
    <div className='w-full h-full bg-zinc-900'>
      <div className='flex justify-between'>
      <h1 className='text-3xl text-center p-4 font-bold text-white'>Task List</h1>
      <Link to={'/'}><button className='bg-yellow-500 p-2 m-4 text-1xl font-medium'>Add New Task</button></Link>
      </div>
      <div className='bg-blue-400 w-full h-full p-3'>
          {tasks.map((item, index) => (
            <div key={index} className='bg-zinc-500 mt-6 p-5'>
              <h1 className='font-bold text-2xl'>{item.username}</h1>
              <h2>{item.taskName}</h2>
              <h2>{item.taskDesc}</h2>
              <h2>{item.deadline}</h2>
              <button className='bg-blue-900 text-white p-2 mt-4 font-light' onClick={() => deleteTodo(item._id)}>Delete Todo</button>
              <button className='bg-zinc-900 text-white p-2 ml-4 font-light' onClick={() => handleEditClick(item)}>Update Todo</button>
            </div>
          ))}
           {isUpdating && (
          <div className='bg-zinc-700 mt-6 p-5'>
            <h2 className='font-bold text-xl text-white'>Update Task</h2>
            <input
              type='text'
              name='username'
              value={updatedTask.username}
              onChange={handleInputChange}
              placeholder='Username'
              className='w-full p-2 mt-2'
            />
            <input
              type='text'
              name='taskName'
              value={updatedTask.taskName}
              onChange={handleInputChange}
              placeholder='Task Name'
              className='w-full p-2 mt-2'
            />
            <input
              type='text'
              name='taskDesc'
              value={updatedTask.taskDesc}
              onChange={handleInputChange}
              placeholder='Task Description'
              className='w-full p-2 mt-2'
            />
            <input
              type='date'
              name='deadline'
              value={updatedTask.deadline}
              onChange={handleInputChange}
              className='w-full p-2 mt-2'
            />
            <button className='bg-green-600 text-white p-2 mt-4' onClick={updateTodo}>Update Task</button>

          </div>
        )}
      </div>
    </div>
  );
}

export default TaskList;
