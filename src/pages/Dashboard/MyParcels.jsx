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
      <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Cost</th>
        <th>Payment Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {
        parcels.map((parcel,ind) =><tr key={parcel._id}>
        <th>{ind + 1}</th>
        <td>{parcel.parcelName}</td>
        <td>{parcel.cost}</td>
        <td>Blue</td>
        <td>Delete</td>
      </tr>)
      }
      </tbody>
  </table>
</div>
    </div>
  );
};

export default MyParcels;
