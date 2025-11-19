"use client";

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useState } from "react";

// Default Marker Fix for Leaflet in React
const DefaultIcon = L.icon({
  iconUrl: "/markers/marker-icon.png",
  shadowUrl: "/markers/marker-shadow.png",
});
L.Marker.prototype.options.icon = DefaultIcon;

// Component Props
interface MapProps {
  height?: string;
  width?: string;
  defaultCenter?: [number, number];
  zoom?: number;
  enableClickMarker?: boolean;
}

export default function MapView({
  height = "400px",
  width = "100%",
  defaultCenter = [33.6844, 73.0479], // Islamabad default
  zoom = 13,
  enableClickMarker = true,
}: MapProps) {
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null);

  // Handle map clicks
  function LocationMarker() {
    useMapEvents({
      click(e) {
        if (enableClickMarker) {
          setMarkerPosition([e.latlng.lat, e.latlng.lng]);
        }
      },
    });

    return markerPosition ? (
      <Marker position={markerPosition}>
        <Popup>
          📌 Selected Location <br />
          {markerPosition[0].toFixed(5)}, {markerPosition[1].toFixed(5)}
        </Popup>
      </Marker>
    ) : null;
  }

  return (
    <div
      style={{
        height,
        width,
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      }}
    >
      <MapContainer
        center={defaultCenter}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        {/* Tile Layer */}
        <TileLayer
          attribution='&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Marker on Click */}
        <LocationMarker />
      </MapContainer>
    </div>
  );
}
