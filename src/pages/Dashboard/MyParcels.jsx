import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const MyParcels = () => {
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure()
  const {data : parcels =[]} = useQuery({
    queryKey: ['myParcels', user?.email],
    queryFn: async () =>{
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data
    }
  })
  return (
    <div>
      My All Parcels : {parcels.length}
    </div>
  );
};

export default MyParcels;
