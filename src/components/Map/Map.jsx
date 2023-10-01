// import React, { useState, useEffect } from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// const containerStyle = {
//   width: '100%',
//   height: '400px',
// };

// export const Map = () => {
//   const [location, setLocation] = useState({ lat: 0, lng: 0 });
//   const [markers, setMarkers] = useState([]);

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       position => {
//         const { latitude, longitude } = position.coords;
//         setLocation({ lat: latitude, lng: longitude });
//       },
//       error => {
//         console.error(error);
//       },
//       { enableHighAccuracy: true }
//     );
//   }, []);

//   const handleMapClick = event => {
//     const newMarker = {
//       lat: event.latLng.lat(),
//       lng: event.latLng.lng(),
//     };
//     setMarkers([...markers, newMarker]);
//     console.log(newMarker);
//   };

//   return (
//     <LoadScript googleMapsApiKey="AIzaSyAHwyAHiWWh7rcHvZpV2JNSaWAAXC7BVFw">
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={location}
//         zoom={10}
//         onClick={handleMapClick}
//       >
//         {markers.map((marker, index) => (
//           <Marker key={index} position={marker} />
//         ))}
//       </GoogleMap>
//     </LoadScript>
//   );
// };

import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Loader } from '@googlemaps/js-api-loader';

const containerStyle = {
  width: '100%',
  height: '400px',
};

export const Map = () => {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);

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

    const loader = new Loader({
      apiKey: 'AIzaSyAHwyAHiWWh7rcHvZpV2JNSaWAAXC7BVFw',
      version: 'weekly',
    });

    loader.load().then(() => {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setMap(
            new window.google.maps.Map(document.getElementById('map'), {
              center: { lat: latitude, lng: longitude },
              zoom: 8,
            })
          );
        },
        error => {
          console.error('Error getting current position: ', error);
        },
        { enableHighAccuracy: true }
      );
    });
  }, []);

  const handleMapClick = event => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      const newMarker = { lat, lng };
      setMarkers([...markers, newMarker]);
      console.log(newMarker);
    } else {
      console.error('latLng not found in event object');
    }
  };
  return (
    <div id="map" style={containerStyle} onClick={handleMapClick}>
      {map &&
        markers.map(
          (marker, index) =>
            new window.google.maps.Marker({
              position: marker,
              map: map,
            })
        )}
    </div>
  );
};
