import { BiDotsVertical } from "react-icons/bi";
import {
  BsBook,
  BsCurrencyExchange,
  BsDroplet,
  BsPlusLg,
} from "react-icons/bs";
import { FaBalanceScale } from "react-icons/fa";
import { GiBread, GiGrainBundle } from "react-icons/gi";
import { MdClose, MdDelete } from "react-icons/md";
import { IoChevronForwardCircleOutline } from "react-icons/io5";
import { CalculatorStyled, PencilStyled, SymbolWrapperStyled } from "./Styles";
import { FaInfo } from "react-icons/fa";


function Symbol({ type, ...props }) {
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

export default Symbol;
