import styled from "styled-components";
import { Link } from "react-router-dom";

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

export const LinkStyled = styled(Link)`
  color: #003049;
`;
export const ContentHeaderStyled = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: -7px;
  font-size: 25px;
`;

export const EditCategoryButtonStyled = styled.div`
  position: absolute;
  background-color: lightgrey;
  top: 20px;
  right: 7px;
  padding: 5px;
  box-shadow: 10px 10px 34px 0 rgba(0, 0, 0, 0.75);
`;

export const ItemsCountStyled = styled.div`
  font-size: large;
`;
