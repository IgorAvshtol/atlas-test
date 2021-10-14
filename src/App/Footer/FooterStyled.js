import styled from "styled-components";

export const FooterStyled = styled.footer`
  text-align: center;
  font-size: smaller;
  color: ${({theme}) => theme.colors.woodsmoke};
  padding: 15px;
  background-color: ${({theme}) => theme.colors.selectiveYellow};
`;
