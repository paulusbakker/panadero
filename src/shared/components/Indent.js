import React from "react";

function Indent({ depth }) {
  return [...Array(depth)].map((e, index) => (
    <span key={`indent-${depth}-${index}`}>&nbsp;</span>
  ));
}

export default Indent;
