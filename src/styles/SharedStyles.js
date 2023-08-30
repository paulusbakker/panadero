import styled, { css } from "styled-components";

// Shared Styles
const boxShadowStyle = css`
  box-shadow: 10px 10px 34px -11px rgba(0, 0, 0, 0.75);
`;

const fontFamilyStyle = css`
  font-family: "Arial Rounded MT Bold", sans-serif;
`;

// Base Styled Ul
const UlBaseStyled = styled.ul`
  ${boxShadowStyle}
  ${fontFamilyStyle}
  margin-bottom: 10px;
  margin-left: 8px;
  margin-right: 8px;
`;

// Styled Components
export const BackgroundOverlayStyled = styled.div`
  z-index: 10000;
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7f1f185;
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
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

export const ItemHeaderStyled = styled.li`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: -7px;
  font-size: 25px;
`;

export const BelowNavbarSpaceStyled = styled.div`
  height: calc(100vh - 78px);
`;

export const TabContainerUlStyled = styled(UlBaseStyled)`
  font-size: 25px;
  background-color: lightgrey;

  > li {
    background-color: #eae2b7;
    margin-top: 8px;
    padding: 5px;
    ${boxShadowStyle}
  }
`;

export const ContentUlStyled = styled(UlBaseStyled)`
  font-size: 18px;
  background-color: #eae2b7;
`;

export const DottedLine = styled.div`
  border-top: 1px dotted #000;
  margin-bottom: 16px;
`;
