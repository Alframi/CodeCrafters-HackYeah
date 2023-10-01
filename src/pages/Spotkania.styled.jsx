import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: block;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  margin-right: 8px;
`;

const StyledButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const StyledImage = styled.img`
  width: 50px;
`;
const StyledH2 = styled.h2`
  margin-left: 8px;
`;
const StyledSpan = styled.span`
  color: gray;
  margin-right: 8px;
`;
const StyledKategorie = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export {
  StyledWrapper,
  StyledLink,
  StyledImage,
  StyledButton,
  StyledH2,
  StyledSpan,
  StyledKategorie,
};
