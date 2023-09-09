import React from "react";

function Indent({ depth }) {
  return [...Array(depth)].map((e, index) => <span key={index}>&nbsp;</span>);
}

export default Indent;
