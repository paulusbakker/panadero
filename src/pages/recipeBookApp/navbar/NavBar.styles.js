import styled from "styled-components";
import { Link } from "react-router-dom";

export const MainNavStyled = styled.nav`
  font-family: "Fredoka One", sans-serif;
  position: relative;
  height: 40px;
  display: flex;
  align-items: center;
  background-color: #d62828;
  justify-content: space-between;
  padding: 0 5px;
`;

export const MainNavLinkStyled = styled(Link)`
  color: #fcbf49;
  font-size: 28px;
`;

export const MainNavButtonContainerStyled = styled.div`
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
`;

export const MainNavListStyled = styled.ul`
  list-style: none;
  position: fixed;
  top: 0;
  background: #fcbf49;
  right: 0;
  height: auto;
  overflow: hidden;
  width: fit-content;
  z-index: 9;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const MainNavItemStyled = styled.li`
  margin: 5px 4px;
  width: fit-content;
  font-size: 19px;
`;

export const TabsStyled = styled.div`
  font-family: "Fredoka One", sans-serif;
  display: flex;
  justify-content: space-around;
  background-color: #f77f00;
  height: 30px;
`;

export const TabItemStyled = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  border-top: 3px solid #f77f00;
  border-bottom: 3px solid ${(props) => (props.active ? "#003049" : "#F77F00")};
  font-size: 20px;
  color: black;

  &:first-child {
    border-right: 1px solid grey;
  }

  &:last-child {
    border-left: 1px solid grey;
  }
`;

TabItemStyled.defaultProps = {
  active: false,
};
