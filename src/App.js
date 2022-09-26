import React from 'react';
import './App.css';
import Login from './Components/Login';
import { Route, Routes } from 'react-router-dom';
import Register from './Components/Register';
import Teams from './Components/Teams';
import Projects from './Components/Projects';
import { Toaster } from 'react-hot-toast';
import { useCheckAuth } from './hooks/useCheckAuth'
import PrivateRoutes from './utils/PrivateRoutes';
import PublicRoutes from './utils/PublicRoutes';
import Page404 from './utils/Page404';


function App() {
  const isAuthChecked = useCheckAuth();

  return !isAuthChecked ? (<div>Cheaking authentication...</div>) : (
    <div>
      <Routes>
        {/* public routes */}

        <Route path='/' element={<PublicRoutes><Login /></PublicRoutes>}></Route>
        <Route path='/register' element={<PublicRoutes><Register /></PublicRoutes>}></Route>

        {/* private routes */}
        <Route path='/teams' element={<PrivateRoutes><Teams /></PrivateRoutes>}></Route>
        <Route path='/projects' element={<PrivateRoutes><Projects /></PrivateRoutes>}></Route>
        <Route path='*' element={<Page404/>}></Route>
      </Routes>
      <Toaster />
    </div>
  )



}

export default App;
