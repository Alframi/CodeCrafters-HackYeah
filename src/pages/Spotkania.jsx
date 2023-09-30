import { useNavigate } from 'react-router-dom';

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
    navigate('/');
  };

  return (
    <StyledWrapper>
      <StyledLink to="/Sesje">Lista</StyledLink>
      <StyledLink to="/Mapy">Mapy</StyledLink>
      <StyledButton onClick={handleButtonClick}>
        <StyledImage src={addBtn} alt="add-button" />
      </StyledButton>
    </StyledWrapper>
  );
};

export default Spotkania;
