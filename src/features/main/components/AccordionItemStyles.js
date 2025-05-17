import styled from "styled-components";
import { Link } from "react-router-dom";

export const ItemsCountStyled = styled.div`
  font-size: large;
`;

export const LinkStyled = styled(Link)`
  color: ${(props) => props.theme.colors.textColor};
  display: block; /* Makes the link take up the full space */
  width: 100%;
`;

export const ItemHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
  margin-right: -7px;
  font-size: 25px;
`;

