import styled from "styled-components";
import { BiDotsVertical } from "react-icons/bi";
import {
  BsBook,
  BsCurrencyExchange,
  BsDroplet,
  BsPlusLg,
  BsFillPencilFill,
} from "react-icons/bs";
import { FaBalanceScale, FaInfo } from "react-icons/fa";
import { GiBread, GiGrainBundle } from "react-icons/gi";
import { ImCalculator } from "react-icons/im";
import { MdClose, MdDelete } from "react-icons/md";
import { IoChevronForwardCircleOutline } from "react-icons/io5";

export const SymbolWrapperStyled = styled.span`
  align-items: center;
  display: flex;
`;

export const PencilStyled = styled(BsFillPencilFill)`
  transform: scale(0.75);
`;

export const CalculatorStyled = styled(ImCalculator)`
  margin-left: 10px;
`;


function SymbolStyles({ type, ...props }) {
  // symbolClass needed to avoid sending the same isFaultyOverallRecipe prop to all flattenedRecipeItem items..
  return (
    <SymbolWrapperStyled data-action="symbol" {...props}>
      {type === "flour" && <GiGrainBundle />}
      {type === "isLiquid" && <BsDroplet />}
      {type === "recipe" && <BsBook />}
      {type === "coins" && <BsCurrencyExchange />}
      {type === "calculator" && <CalculatorStyled />}
      {type === "openMenu" && <BiDotsVertical />}
      {type === "closeMenu" && <MdClose />}
      {type === "pencil" && <PencilStyled />}
      {type === "bread" && <GiBread />}
      {type === "scale" && <FaBalanceScale />}
      {type === "delete" && <MdDelete />}
      {type === "add" && <BsPlusLg />}
      {type === "forward" && <IoChevronForwardCircleOutline />}
      {type === "info" && <FaInfo />}
      {type === "menu" && <BiDotsVertical />}
      {type === "empty" && <div style={{ width: "20px" }} />}{" "}
      {/* Placeholder for an empty symbol */}
    </SymbolWrapperStyled>
  );
}

export default SymbolStyles;
