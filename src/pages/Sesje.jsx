import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import {
  StyledSelect,
  StyledQuestion,
  StyledButton,
  StyledWrapper,
} from './Sesje.styled';

const Sesje = () => {
  const [selectedAnimal, setSelectedAnimal] = useState('');
  const [showMap, setShowMap] = useState(false); // <-- stan dla widoczności mapy
  const mapRef = useRef(); // <-- referencja do mapy

  const handleSelectChange = e => {
    setSelectedAnimal(e.target.value);
  };

  const handleButtonClick = () => {
    setShowMap(!showMap); // <-- zmienia wartość stanu showMap
  };

  const handleMapClick = event => {
    const { lat, lng } = event.latlng;
    // Zapamiętaj współrzędne w localStorage
    const savedPoints = JSON.parse(localStorage.getItem('points') || '[]');
    savedPoints.push({ lat, lng });
    localStorage.setItem('points', JSON.stringify(savedPoints));
  };

  useEffect(() => {
    if (showMap && mapRef.current) {
      const mapInstance = mapRef.current;
      setTimeout(() => {
        mapInstance.leafletElement.invalidateSize();
      }, 100);
    }
  }, [showMap]);

  return (
    <StyledWrapper>
      <StyledQuestion>
        <p>Co udało Ci się spotkać?</p>
      </StyledQuestion>
      <StyledSelect
        id="rodzajZwierzecia"
        name="rodzajZwierzecia"
        value={selectedAnimal}
        onChange={handleSelectChange}
      >
        <option value="lis">Lis</option>
        <option value="sarna">Sarna</option>
        <option value="dzik">Dzik</option>
        <option value="bezpańskiPies">Bezpański pies</option>
      </StyledSelect>
      <StyledButton onClick={handleButtonClick}>Wybierz</StyledButton>
      {showMap && (
        <MapContainer
          ref={mapRef}
          center={[51.505, -0.09]}
          zoom={13}
          style={{ width: '100%', height: '400px' }}
          onClick={handleMapClick}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
      )}
    </StyledWrapper>
  );
};

export default Sesje;
