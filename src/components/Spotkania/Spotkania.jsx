import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Informacje } from '../Informacje/Informacje';

import {
  StyledSelect,
  StyledQuestion,
  StyledButton,
  StyledWrapper,
} from './Spotkania.styled';

export const Spotkania = () => {
  const [selectedAnimal, setSelectedAnimal] = useState('');

  const handleSelectChange = e => {
    setSelectedAnimal(e.target.value);
  };

 const handleButtonClick = () => {
   history.push('/Informacje');
 };

  const history = useHistory();


  return (
    <StyledWrapper>
      <StyledQuestion>
        <p>Co spotkałeś?</p>
      </StyledQuestion>
      <StyledSelect
        id="rodzajZwierzecia"
        name="rodzajZwierzecia"
        value={selectedAnimal} // Ustaw wartość na podstawie stanu lokalnego
        onChange={handleSelectChange} // Dodaj funkcję obsługi zmiany
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
