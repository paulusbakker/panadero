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
import { CalculatorStyled, PencilStyled, SymbolWrapperStyled } from "./Styles";

function Symbol({ type, ...props }) {
  let symbolClass = "";
  if (type === "calculator") {
    symbolClass = "calculator-symbol";
  } else if (type === "menu") {
    symbolClass = "menu-symbol";
  }
  // symbolClass needed to avoid sending the same isFaultyOverallRecipe prop to all flattenedRecipeItem items..
  return (
    <SymbolWrapperStyled
      className={symbolClass}
      data-action="symbol"
      {...props}
    >
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
      {type === "menu" && <BiDotsVertical />}
      {type === "empty" && <div style={{ width: "20px" }} />}{" "}
      {/* Placeholder for an empty symbol */}
    </SymbolWrapperStyled>
  );
}

export default Symbol;
