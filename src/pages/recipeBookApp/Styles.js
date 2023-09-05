import styled from "styled-components";
// import { Link } from "react-router-dom";

export const SpaceBelowNavbarStyled = styled.div`
  height: calc(100vh - 78px);
`;

export const TabContainerUlStyled = styled.ul`
  font-family: ${(props) => props.theme.fonts.secondary};
  font-size: 25px;
  margin-bottom: 10px;
  margin-left: 8px;
  margin-right: 8px;
  margin-top: 7px;

  > li {
    background-color: ${({ theme }) => theme.colors.contentBackgroundColor};
    margin-bottom: ${(props) => props.theme.margins.spaceBetweenLi};
    padding: 5px;
    box-shadow: ${(props) => props.theme.boxShadow.default};
  }
`;

