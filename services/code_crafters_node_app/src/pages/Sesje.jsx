import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  StyledSelect,
  StyledQuestion,
  StyledButton,
  StyledWrapper,
} from './Sesje.styled';

const Sesje = () => {
  const [selectedAnimal, setSelectedAnimal] = useState('');

  const navigate = useNavigate();

  const handleSelectChange = e => {
    setSelectedAnimal(e.target.value);
  };

  const handleButtonClick = () => {
    navigate('/');
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
    </StyledWrapper>
  );
};

export default Sesje;
