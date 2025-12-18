"use client";

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng], map.getZoom(), {
      animate: true,
    });
  }, [lat, lng, map]);

  return null;
}


const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});
L.Marker.prototype.options.icon = DefaultIcon;

function LocationMarker({
  setLatitude,
  setLongitude,
}: {
  setLatitude: React.Dispatch<React.SetStateAction<string>>;
  setLongitude: React.Dispatch<React.SetStateAction<string>>;
}) {
  useMapEvents({
    click(e) {
      setLatitude(e.latlng.lat.toFixed(6));
      setLongitude(e.latlng.lng.toFixed(6));
    },
  });
  return null;
}

export default function ReportMap({
  lat,
  lng,
  setLatitude,
  setLongitude,
}: {
  lat: number;
  lng: number;
  setLatitude: React.Dispatch<React.SetStateAction<string>>;
  setLongitude: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <MapContainer center={[lat, lng]} zoom={13} className="h-full w-full">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      <RecenterMap lat={lat} lng={lng} />
      <Marker position={[lat, lng]}>
        <Popup>Issue Location</Popup>
      </Marker>
      <LocationMarker setLatitude={setLatitude} setLongitude={setLongitude} />
    </MapContainer>
  );
}
