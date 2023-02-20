import React from "react";
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

function Symbol({ type }) {
  return (
    <>
      {type === "flour" && <GiGrainBundle className="symbol" />}
      {type === "isLiquid" && <BsDroplet className="symbol" />}
      {type === "recipe" && <BsBook className="symbol" />}
      {type === "coins" && <BsCurrencyExchange className="symbol" />}
      {type === "calculator" && <ImCalculator className="symbol" />}
      {type === "menu" && <BiDotsVertical className="symbol" />}
      {type === "closeMenu" && <MdClose className="symbol" />}
      {type === "pencil" && <BsFillPencilFill className="symbol" />}
      {type === "bread" && <GiBread className="symbol" />}
      {type === "scale" && <FaBalanceScale className="symbol" />}
      {type === "delete" && <MdDelete className="symbol" />}
      {type === "add" && <BsPlusLg className="symbol" />}
    </>
  );
}

export default Symbol