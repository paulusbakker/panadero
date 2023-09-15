import styled from "styled-components";
import {Link} from 'react-router-dom'


export const NavStyled = styled.nav`
  font-family: "Fredoka One", sans-serif;
  position: relative;
  height: 40px;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.navbarBackgroundColor};
  justify-content: space-between;
  padding: 0 5px;
`;

export const NavLinkStyled = styled(Link)`
  color:  ${(props) => props.theme.colors.navbarTextAndHamburgerMenuBackgroundColor};
  font-size: 28px;
`;



export const NavButtonStyled = styled.button`
  z-index: 10;
  cursor: pointer;
  background: transparent;
  border: none;
  margin-left: 10px;
  height: 25px;
  font-size: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  outline: none;
`;

export const NavButtonContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;







