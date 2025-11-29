import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AssignRider = () => {
  const axiosSecure = useAxiosSecure()
  const {data : parcels = []} = useQuery({
    queryKey : ['parcel', "pending-pickup"],
    queryFn: async () =>{
      const res = await axiosSecure.get("")
      return res.data
    }
  })
  return (
    <div>
      <h2 className="text-5xl">Assign Rider {parcels.length} </h2>
    </div>
  );
};

export default AssignRider;
