import styled from "styled-components";

export const FormButton = styled.button`
  background-color: ${({theme}) => theme.colors.robinsEggBlue};
  border: none;
  margin: 50px 30px 0px;
  padding: 15px;
  border-radius: 5px;
  color: ${({theme}) => theme.colors.woodsmoke};
  font-weight: 600;
  box-shadow: ${({theme}) => theme.shadow};
  transition: filter 0.5s;
  text-transform: uppercase;
  word-spacing: 5px;
  letter-spacing: 3px;

  &:hover {
    filter: brightness(110%);
  }

  &:active {
    filter: brightness(130%);
  }
`;