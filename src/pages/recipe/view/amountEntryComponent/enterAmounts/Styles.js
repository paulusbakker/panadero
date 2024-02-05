import styled from "styled-components";

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