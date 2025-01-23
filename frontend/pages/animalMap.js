import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import styles from './components/map.module.css';
import Header from './components/header';
import Navbar from './components/navbar';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

export default function AnimalMapPage() {
  const [leafletIcons, setLeafletIcons] = useState(null);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);

  const locations = [
    { id: 1, name: 'Löwen', lat: 47.3845, lng: 8.5735, icon: '/pin.png' },
    { id: 2, name: 'Pinguine', lat: 47.3847, lng: 8.5740, icon: '/pin.png' },
    { id: 3, name: 'Tiger', lat: 47.3850, lng: 8.5730, icon: '/pin.png' },
    { id: 4, name: 'Elefanten', lat: 47.3852, lng: 8.5725, icon: '/pin.png' },
    { id: 5, name: 'Giraffen', lat: 47.3858, lng: 8.5738, icon: '/pin.png' },
    { id: 6, name: 'Flamingos', lat: 47.3860, lng: 8.5742, icon: '/pin.png' },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const L = require('leaflet');

      const LeafIcon = L.Icon.extend({
        options: {
          iconSize: [64, 64],
          iconAnchor: [32, 64],
          popupAnchor: [0, -64],
        },
      });

      const icons = {};
      locations.forEach(({ icon }) => {
        if (!icons[icon]) {
          icons[icon] = new LeafIcon({ iconUrl: icon });
        }
      });

      setLeafletIcons(icons);
    }
  }, []);

  if (!leafletIcons) return <div>Loading map...</div>;

  return (
    <div>
      <Header onMenuClick={toggleNavbar} title="Tiere im Zürich Zoo" />
      {isNavbarOpen && <Navbar onClose={() => setIsNavbarOpen(false)} />}
      <div className={styles.Container}>
        <MapContainer center={[47.3847, 8.5730]} zoom={16} style={{ height: '70vh', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {locations.map(({ id, name, lat, lng, icon }) => (
            <Marker key={id} position={[lat, lng]} icon={leafletIcons[icon]}>
              <Popup>{name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
