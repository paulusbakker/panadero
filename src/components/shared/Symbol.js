import React from "react";
import styled from "styled-components";
import { GiGrainBundle } from "react-icons/gi";
import { BsBook, BsDroplet } from "react-icons/bs";
import { BsCurrencyExchange } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { BsFillPencilFill } from "react-icons/bs";
import { BiDotsVertical } from "react-icons/bi";
import { ImCalculator } from "react-icons/im";
import { GiBread } from "react-icons/gi";
import { FaBalanceScale } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsPlusLg } from "react-icons/bs";

const SymbolWrapperStyled = styled.span`
  align-items: center;
  display: flex;
`;

function Symbol({ type, ...props }) {
  return (
    <SymbolWrapperStyled data-action='symbol' {...props}>
      {type === "flour" && <GiGrainBundle />}
      {type === "isLiquid" && <BsDroplet />}
      {type === "recipe" && <BsBook />}
      {type === "coins" && <BsCurrencyExchange />}
      {type === "calculator" && <ImCalculator />}
      {type === "openMenu" && <BiDotsVertical />}
      {type === "closeMenu" && <MdClose />}
      {type === "pencil" && <BsFillPencilFill />}
      {type === "bread" && <GiBread />}
      {type === "scale" && <FaBalanceScale />}
      {type === "delete" && <MdDelete />}
      {type === "add" && <BsPlusLg />}
      {type === "menu" && <BiDotsVertical />}
    </SymbolWrapperStyled>
  );
}

export default Symbol;
