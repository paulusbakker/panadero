import styled from 'styled-components'

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
  padding: 1em 1em 1em 1em;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

export const ContentHeaderStyled = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: -7px;
  font-size: 25px;
`;

export const MainCardStyled = styled.div`
  background-color: #eae2b7;
  box-shadow: 10px 10px 34px -11px rgba(0, 0, 0, 0.75);
  font-family: "Arial Rounded MT Bold", sans-serif;
  margin-bottom: 10px;
  margin-left: 8px;
  margin-right: 8px;
  font-size: 25px;

  > li {
    background-color: #eae2b7;
    margin-top: 8px;
    padding: 5px;
    box-shadow: 10px 10px 34px -11px rgba(0, 0, 0, 0.75);
    color: #003049;
  }
`;