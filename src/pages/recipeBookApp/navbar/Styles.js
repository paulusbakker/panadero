import styled from "styled-components";
import { Link } from "react-router-dom";

export const TabsStyled = styled.div`
  font-family: ${(props) => props.theme.fonts.primary};
  display: flex;
  justify-content: space-around;
  background-color: ${(props) => props.theme.colors.navbarTabColor};
  height: 30px;
`;

export const TabItemStyled = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  border-top: 3px solid ${(props) => props.theme.colors.navbarTabColor};;
  border-bottom: 3px solid ${(props) => (props.active ? props.theme.colors.textColor : props.theme.colors.navbarTabColor)};
  font-size: 20px;
  color: ${(props) => props.theme.colors.textColor};;

  &:first-child {
    border-right: 1px solid grey;
  }

  &:last-child {
    border-left: 1px solid grey;
  }
`;


