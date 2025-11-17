import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const position = [23.8041, 90.4152];
  const serviceCenters = useLoaderData();
  const mapRef = useRef(null)
  console.log(serviceCenters);

  const handleSearch = e  =>{
    e.preventDefault()
    const location = e.target.location.value
    const district = serviceCenters.find(c => c.district.toLowerCase().includes(location.toLowerCase()))
    if(district) {
      const coord = [district.latitude,district.longitude ]
      console.log(district, coord);
      mapRef.current.flyTo(coord,10)

    }
  }

  return (
    <div>
      <h1 className="text-4xl capitalize p-5 text-secondary font-bold">
        We are available in 64 districts
      </h1>
      <div>
        <form onSubmit={handleSearch}>
          <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" className="grow" placeholder="Search"
          name="location" />
        </label>
        </form>
      </div>
      <div className="w-full h-100 mx-auto">
        <MapContainer
          center={position}
          zoom={7}
          ref={mapRef}
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
