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
  const [events, setEvents] = useState(
    JSON.parse(localStorage.getItem('events')) || []
  );

  const [selectedAnimal, setSelectedAnimal] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const handleSelectChange = e => {
    setSelectedAnimal(e.target.value);
  };

  const handleButtonClick = () => {
    if (selectedAnimal) {
      localStorage.setItem('selectedAnimal', selectedAnimal);
      setShowMap(true);
      setShowButton(true);
    }
  };

  const addEvent = event => {
    const newEvents = [...events, event];
    localStorage.setItem('events', JSON.stringify(newEvents));
    setEvents(newEvents);
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
      {showButton && (
        <StyledButton
          onClick={() => addEvent({ name: 'Nowe Zdarzenie', date: new Date() })}
        >
          Dodaj
        </StyledButton>
      )}
    </StyledWrapper>
  );
};

export default Sesje;
