import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import styles from "./components/map.module.css";
import Header from './components/header';
import Navbar from './components/navbar';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

export default function restaurantMapPage() {
  const [leaflet, setLeaflet] = useState(null);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const closeNavbar = () => {
    setIsNavbarOpen(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const L = require('leaflet');

      const LeafIcon = L.Icon.extend({
        options: {
          iconSize: [64, 64],
          iconAnchor: [32, 64],
          shadowSize: [80, 80],
          shadowAnchor: [40, 60],
          popupAnchor: [0, -64],
        },
      });

      setLeaflet({
        HotDog: new LeafIcon({ iconUrl: '/pin.png' }),
        BurgerHouse: new LeafIcon({ iconUrl: '/pin.png' }),
        Pizzeria: new LeafIcon({ iconUrl: '/pin.png' }),
      });
    }
  }, []);

  const locations = [
    { id: 1, name: 'HotDog', lat: 47.3855, lng: 8.5730, icon: 'HotDog' },
    { id: 2, name: 'BurgerHouse', lat: 47.3860, lng: 8.5745, icon: 'BurgerHouse' },
    { id: 3, name: 'Pizzeria', lat: 47.3847, lng: 8.5750, icon: 'Pizzeria' },
  ];

  if (!leaflet) return <div>Loading map...</div>;

  return (
    <div>
      <Header onMenuClick={toggleNavbar} title={"Restaurants im Zürich Zoo"} />

      {isNavbarOpen && <Navbar onClose={closeNavbar} />}

      <div className={styles.Container}>
        <MapContainer
          center={[47.3847, 8.5730]}
          zoom={16}
          style={{ height: '70vh', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {locations.map(location => (
            <Marker
              key={location.id}
              position={[location.lat, location.lng]}
              icon={leaflet[location.icon]}
            >
              <Popup>{location.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
