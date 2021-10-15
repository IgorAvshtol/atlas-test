import styled, { css } from "styled-components";

export const Wrapped = styled.div`
    text-align: center;
    margin: 20px;
`;

export const Paragraph = styled.p`
    font-size: 16px;
    padding-top: 10px;

    ${({ result }) => result && css`
        font-weight: 200;
        font-size: 14px;
        color:  ${({ theme }) => theme.colors.selectiveYellow};
    `}

    ${({ highlight }) => highlight && css`
        font-weight: 600;
        font-size: 20px;
        color:  ${({ theme }) => theme.colors.crimson};
    `}
`;