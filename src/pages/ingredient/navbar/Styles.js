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

export const BackgroundOverlayStyled = styled.div`
  z-index: 10000;
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.colors.overlayBackgroundColor};
  left: 0;
  top: 0;
`;

export const PopupStyled = styled.div`
  z-index: 10001;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1em;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: ${(props) => props.theme.boxShadow.default};
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
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







