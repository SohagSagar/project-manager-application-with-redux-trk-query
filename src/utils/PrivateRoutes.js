import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoutes = ({ children }) => {
    const isLoggedIn = useAuth();
    return isLoggedIn ? children : <Navigate to={'/'}/>
}
export default PrivateRoutes;