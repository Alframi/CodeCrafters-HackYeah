import styled from 'styled-components';

const StyledSelect = styled.select`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: white;
  appearance: none;

  &:focus {
    border-color: blue;
    outline: none;
  }
`;

const StyledQuestion = styled.span`
  font-size: 28px;
`;

const StyledButton = styled.button`
  width: 110px;
  background-color: black;
  padding: 10px 12px;
  text-align: center;
  justify-content: center;
  gap: 10px;
  border-radius: 22px;
  cursor: pointer;
  border: none;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0%;
  color: white;
`;
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
`;

export { StyledSelect, StyledQuestion, StyledButton, StyledWrapper };
