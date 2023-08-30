import styled from "styled-components";
import { Link } from "react-router-dom";



export const LinkStyled = styled(Link)`
  color: #003049;
  display: block; /* Makes the link take up the full space */
  width: 100%;
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
