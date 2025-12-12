import { useQuery } from '@tanstack/react-query';
import React from 'react';

const TrackParcel = () => {
  const {} = useQuery({
    queryKey: ["trackingId"]
  })
  return (
    <div>

    </div>
  );
};

export default TrackParcel;
