import styled from "styled-components";
import { Link } from "react-router-dom";
export const TabsStyled = styled.div`
  font-family: ${(props) => props.theme.fonts.primary};
  display: flex;
  background-color: ${(props) => props.theme.colors.navbarTabColor};
  height: 30px;
`;

export const TabStyled = styled(Link)`
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

export const MainNavStyled = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: ${(props) => props.theme.fonts.primary};
  height: 40px;
  background-color: ${(props) => props.theme.colors.navbarBackgroundColor};;
  padding: 0 5px;
`;

export const MainNavLinkStyled = styled(Link)`
  color: ${(props) => props.theme.colors.navbarTextAndHamburgerMenuBackgroundColor};
  font-size: 28px;
`;

export const ButtonContainerStyled = styled.button`
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: transparent;
  border: none;
  margin-left: 10px;
  height: 25px;
  font-size: 35px;
`;

// Inside your Styles.js
export const HamburgerMenuStyled = styled.div`
  z-index: 9;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  background: ${(props) => props.theme.colors.navbarTextAndHamburgerMenuBackgroundColor};
  height: auto;
  top: 0;
  right: 0;
  width: fit-content;
  overflow: hidden;
`;


export const HamburgerMenuItemStyled = styled(Link)`
  margin: 5px 4px;
  width: fit-content;
  font-size: 19px;
`;



