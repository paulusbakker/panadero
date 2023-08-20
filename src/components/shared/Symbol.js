import React from "react";
import styled from "styled-components";
import { GiGrainBundle } from "react-icons/gi";
import { BsBook, BsDroplet, BsCurrencyExchange, BsFillPencilFill, BsPlusLg } from "react-icons/bs";
import { MdClose, MdDelete } from "react-icons/md";
import { BiDotsVertical } from "react-icons/bi";
import { ImCalculator } from "react-icons/im";
import { GiBread } from "react-icons/gi";
import { FaBalanceScale } from "react-icons/fa";


const SymbolWrapperStyled = styled.span`
  align-items: center;
  display: flex;
`;

// A styled component to shrink the pencil symbol
const PencilStyled = styled(BsFillPencilFill)`
  transform: scale(0.75);  // 0.9 will shrink it to 90% of its original size. Adjust this value as needed.
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
        {type === "pencil" && <PencilStyled />}
        {type === "bread" && <GiBread />}
        {type === "scale" && <FaBalanceScale />}
        {type === "delete" && <MdDelete />}
        {type === "add" && <BsPlusLg />}
        {type === "menu" && <BiDotsVertical />}
      </SymbolWrapperStyled>
  );
}

export default Symbol;
