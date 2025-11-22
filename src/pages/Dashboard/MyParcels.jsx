import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [] } = useQuery({
    queryKey: ['myParcels', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    }
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border border-gray-300 rounded-md shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">My All Parcels: {parcels.length}</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Cost</th>
              <th className="border border-gray-300 px-4 py-2">Payment Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, ind) => (
              <tr key={parcel._id} className={ind % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="border border-gray-300 px-4 py-2">{ind + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{parcel.parcelName}</td>
                <td className="border border-gray-300 px-4 py-2">{parcel.cost}</td>
                <td className="border border-gray-300 px-4 py-2">Blue</td>
                <td className="border border-gray-300 px-4 py-2">Delete</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
