

import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PublicRoutes = ({ children }) => {
    const isLoggedIn = useAuth();

    return !isLoggedIn ? children : <Navigate to={'/teams'} />
}
export default PublicRoutes;