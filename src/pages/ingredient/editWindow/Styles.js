import styled from "styled-components";

export const ItemHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
  //margin-right: -7px;
  font-size: 25px;
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



