import React from 'react';
import useAuth from '../Hooks/useAuth';
import LoadingSpinner from '../Components/Spinner/LoadingSpinner';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
  const {user, loading} = useAuth();
  const 
  // const location = useloda
  if(loading){
   return <LoadingSpinner/>
  }
  if(!user){
    return <Navigate to={'/login'} />
  }
  return children
};

export default PrivateRoute;
