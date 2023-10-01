import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Sesje from '../pages/Sesje';

import {
  StyledWrapper,
  StyledLink,
  StyledImage,
  StyledButton,
  StyledH2,
  StyledSpan,
  StyledKategorie,
} from './Spotkania.styled';
import addBtn from '../images/addBtn.svg';

const Spotkania = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/Sesje');
  };

  return (
    <div>
      <StyledH2>Spotkania</StyledH2>
      <StyledWrapper>
        <StyledKategorie>
          <StyledLink to="/Spotkania/Lista">Lista</StyledLink>
          <StyledSpan>|</StyledSpan>
          <StyledLink to="/Spotkania/Map">Mapy</StyledLink>
        </StyledKategorie>
        <StyledButton onClick={handleButtonClick}>
          <StyledImage src={addBtn} alt="add-button" />
        </StyledButton>
        <Outlet />
      </StyledWrapper>
    </div>
  );
};

export default Spotkania;
