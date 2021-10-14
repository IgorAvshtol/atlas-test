import styled from "styled-components";

export const Paragraph = styled.p`
  text-align: right;
  font-family: "Source Code Pro", monospace;
  font-size: 12px;
  color: ${({theme}) => theme.colors.crimson};
  margin-right: 10px;
`;