import React from 'react'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Todo from './components/Todo'
import TaskList from './components/TaskList';
import { Toaster } from 'react-hot-toast';
import './App.css'


const App = () => {
  return (
    <div>
      <Router>
      <Toaster/>
      <Routes>
        <Route path='/' element={<Todo/>} exact/>
        <Route path='/tasks' element={<TaskList/>}/>
      </Routes>
      </Router>
    </div>
  )
}

export default App;