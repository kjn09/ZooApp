import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import styles from "./map.module.css"

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

export default function MapComponent() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const L = require('leaflet');

      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: '../../public/pin.png',
      });
    }
  }, []);

  const locations = [
    { id: 1, name: 'Location 1', lat: 51.505, lng: -0.09 },
    { id: 2, name: 'Location 2', lat: 51.515, lng: -0.1 },
    { id: 3, name: 'Location 3', lat: 51.525, lng: -0.12 },
  ];

  return (
  <div className={styles.Container}>
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '70vh', width: '75%' }}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map(location => (
            <Marker key={location.id} position={[location.lat, location.lng]}>
            <Popup>{location.name}</Popup>
            </Marker>
        ))}
        </MapContainer>
    </div>
  );
}
