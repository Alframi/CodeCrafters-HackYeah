import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import {
  StyledWrapper,
  StyledLink,
  StyledImage,
  StyledButton,
} from './Spotkania.styled';
import addBtn from '../images/addBtn.svg';

const Spotkania = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/Sesje');
  };

  return (
    <StyledWrapper>
      <StyledLink to="/">Lista</StyledLink>
      <StyledLink to="/Map">Mapy</StyledLink>
      <StyledButton onClick={handleButtonClick}>
        <StyledImage src={addBtn} alt="add-button" />
      </StyledButton>
      <Outlet />
    </StyledWrapper>
  );
};

export default Spotkania;
