import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

export const Map = () => {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
      },
      error => {
        console.error(error);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  const handleMapClick = event => {
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarkers([...markers, newMarker]);
  };

  return (
    // <LoadScript googleMapsApiKey="AIzaSyCVxYeoVNl2XgRZsg8bxG1e_ftVflamRdQ">
    <LoadScript googleMapsApiKey="AIzaSyAHwyAHiWWh7rcHvZpV2JNSaWAAXC7BVFw">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        zoom={10}
        onClick={handleMapClick}
      >
        {markers.map((marker, index) => (
          <Marker key={index} position={marker} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};
