import styled, { css } from "styled-components";
import loading from "../assets/loader.png";


export const Input = styled.input`
  padding: 10px;
  margin: 0 30px;
  border: 1px solid ${({theme}) => theme.colors.alto};
  box-shadow: ${({theme}) => theme.shadow};
  color: hsl(0, 0%, 60%);
  border-radius: 5px;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }

  ${({select}) => select && css`
    height: 40px;
  `}
`;

export const Loading = styled.img.attrs({
  src: loading,
})`
  align-self: center;
  width: 100px;
  margin-bottom: 60px;
`;
