"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function Map({ lat, lng }: { lat: number; lng: number }) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]}>
        <Popup>User location</Popup>
      </Marker>
    </MapContainer>
  );
}