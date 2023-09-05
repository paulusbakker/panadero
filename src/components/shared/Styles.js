import styled from "styled-components";
import {BsFillPencilFill} from 'react-icons/bs'
import {ImCalculator} from 'react-icons/im'

export const SymbolWrapperStyled = styled.span`
  align-items: center;
  display: flex;
`;

// A styled component to shrink the pencil symbol
export const PencilStyled = styled(BsFillPencilFill)`
  transform: scale(0.75);
  color: ${(props) => props.theme.colors.textColor};
`;

export const CalculatorStyled = styled(ImCalculator)`
  margin-left: 10px;
`;