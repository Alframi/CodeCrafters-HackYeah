import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  font-size: 24px;
  gap: 110px;
  border-radius: 5px;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const StyledButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const StyledImage = styled.img`
  width: 50px;
`;

export { StyledWrapper, StyledLink, StyledImage, StyledButton };
