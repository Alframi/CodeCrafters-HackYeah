// Sesje.js
import React, { useState } from 'react';
import { Map } from '../components/Map/Map';

import {
  StyledSelect,
  StyledQuestion,
  StyledButton,
  StyledWrapper,
} from './Sesje.styled';

const Sesje = () => {
  const [selectedAnimal, setSelectedAnimal] = useState('');
  const [showMap, setShowMap] = useState(false);

  const handleSelectChange = e => {
    setSelectedAnimal(e.target.value);
  };

  const handleButtonClick = () => {
    if (selectedAnimal) {
      localStorage.setItem('selectedAnimal', selectedAnimal);
      setShowMap(true);
    }
  };

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
      {showMap && <Map />}
    </StyledWrapper>
  );
};

export default Sesje;
