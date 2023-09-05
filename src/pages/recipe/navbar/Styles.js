import styled from "styled-components";
import { Link } from "react-router-dom";

export const MainNavStyled = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: ${(props) => props.theme.fonts.primary};
  position: relative;
  height: 40px;
  background-color: ${(props) => props.theme.colors.navbarBackgroundColor};;
  padding: 0 5px;
`;

export const MainNavLinkStyled = styled(Link)`
  color: ${(props) => props.theme.colors.navbarTextAndHamburgerMenuBackgroundColor};
  font-size: 28px;
`;

export const ButtonContainerStyled = styled.div`
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

export const HamburgerMenuStyled = styled.ul`
  z-index: 9;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  list-style: none;
  position: fixed;
  background: ${(props) => props.theme.colors.navbarTextAndHamburgerMenuBackgroundColor};
  height: auto;
  top: 0;
  right: 0;
  width: fit-content;
  overflow: hidden;
`;

export const HamburgerMenuItemStyled = styled.li`
  margin: 5px 4px;
  width: fit-content;
  font-size: 19px;
`;

export const UnderlayWindow = styled.div`
  position: fixed;
  inset: 0; // shorthand for top: 0; right: 0; bottom: 0; left: 0
  z-index: 5; // z-index below Navbar and HamburgerMenu but higher than the recipe content
`;



