"use client";

import { useEffect } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
} from "react-leaflet";

import L from "leaflet";


// ================= Marker Fix =================
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});


// ================= Recenter Component =================
// Jab bhi location change ho, map wahan move ho jaye
function RecenterMap({ lat, lng }) {

  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng], map.getZoom());
  }, [lat, lng, map]);

  return null;

}


// ================= Main Map Component =================
export default function LiveMap({ trackingData }) {

 // Nayi lines (Fixed)
  // parseFloat() isay String se Number mein badal dega
  const latitude = parseFloat(trackingData?.latitude) || 31.4504;
  const longitude = parseFloat(trackingData?.longitude) || 73.1350;


  return (

    // ✅ Inline style use karo className ki jagah
    <div style={{ height: "450px", width: "100%" }} className="rounded-2xl overflow-hidden">

      <MapContainer
        center={[latitude, longitude]}
        zoom={16}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }} // ✅ Inline style
      >

        {/* OpenStreetMap Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* ✅ Live Recenter */}
        <RecenterMap lat={latitude} lng={longitude} />

        {/* Location Marker */}
        <Marker position={[latitude, longitude]}>
          <Popup>
            📍 Blind Person Current Location <br />
            Lat: {latitude.toFixed(4)} <br />
            Lng: {longitude.toFixed(4)}
          </Popup>
        </Marker>

      </MapContainer>

    </div>

  );

}