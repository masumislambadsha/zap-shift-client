import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Coverage = () => {
  const position = [23.8041, 90.4152];
  return (
    <div>
      <h1 className="text-4xl capitalize p-5 text-secondary font-bold">
        We are available in 64 districts
      </h1>
      <div className="w-full h-100 mx-auto">
        <MapContainer
          center={position}
          zoom={13}
          className="w-1/2 h-100  mx-auto"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      <div></div>
    </div>
  );
};

export default Coverage;
