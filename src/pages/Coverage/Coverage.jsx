import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const position = [23.8041, 90.4152];
  const serviceCenters = useLoaderData();
  console.log(serviceCenters);

  return (
    <div>
      <h1 className="text-4xl capitalize p-5 text-secondary font-bold">
        We are available in 64 districts
      </h1>
      <div></div>
      <div className="w-full h-100 mx-auto">
        <MapContainer
          center={position}
          zoom={7}
          className="w-full h-160  mx-auto"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {serviceCenters.map((center, ind) => (
            <Marker key={ind} position={[center.latitude, center.longitude]}>
              <Popup>
                <strong> {center.district}.</strong> <br />{" "}
                {center.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
