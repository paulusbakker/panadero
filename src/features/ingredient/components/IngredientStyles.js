import styled from "styled-components";

export const ItemHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
  //margin-right: -7px;
  font-size: 25px;
`;

export const IngredientDetailsContainer = styled.div`
  box-shadow: ${(props) => props.theme.boxShadow.default};
  font-family: ${(props) => props.theme.fonts.secondary};
  margin: ${(props) => props.theme.margins.marginTop} 10px 8px 8px;
  font-size: 18px;
  background-color: ${(props) => props.theme.colors.contentBackgroundColor};
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



