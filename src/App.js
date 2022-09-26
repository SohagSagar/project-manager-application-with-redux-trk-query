import React from 'react';
import './App.css';
import Login from './Components/Login';
import { Route, Routes } from 'react-router-dom';
import Register from './Components/Register';
import Teams from './Components/Teams';
import Projects from './Components/Projects';

function App() {
  return (
    <div >

      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/teams' element={<Teams/>}></Route>
        <Route path='/projects' element={<Projects/>}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
