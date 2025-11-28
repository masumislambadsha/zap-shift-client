import React from 'react';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';
import LoadingSpinner from '../Components/Spinner/LoadingSpinner';

const AdminRoute = () => {
  const {user, loading} = useAuth();
  const {role , roleLoading} = useRole();
  if(loading || roleLoading ) {
    return <LoadingSpinner/>
  }
  return (
    <div>

    </div>
  );
};

export default AdminRoute;
