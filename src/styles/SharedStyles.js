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

export const MainNavButtonContainerStyled = styled.div`
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

export const MainNavHamburgerMenuStyled = styled.ul`
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

export const MainNavHamburgerMenuItemStyled = styled.li`
  margin: 5px 4px;
  width: fit-content;
  font-size: 19px;
`;

export const CenteredListItemStyled = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
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

export const ItemHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
  margin-right: -7px;
  font-size: 25px;
`;
export const TabStyled = styled.span`
  width: 84px;
  display: flex;
  justify-content: flex-end;
`;

export const RecipeListItemStyled = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #eae2b7;
`;
const FlexContainerStyled = styled.div`
  display: flex;
  align-items: center;
`;

export const RecipeListItemLeftStyled = styled(FlexContainerStyled)``;

export const RecipeListItemRightStyled = styled(FlexContainerStyled)`
  justify-content: space-between;
  width: 150px;
`;


export const ContentUlStyled = styled.ul`
  box-shadow: ${(props) => props.theme.boxShadow.default};
  font-family: ${(props) => props.theme.fonts.secondary};
  margin-bottom: 10px;
  margin-left: 8px;
  margin-right: 8px;
  font-size: 18px;
  background-color: ${(props) => props.theme.colors.contentBackgroundColor};
`;

