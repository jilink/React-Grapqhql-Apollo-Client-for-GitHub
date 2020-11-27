import React from "react";

const Input = ({ children, color = "black", ...props }) => {
  return (
    <input className={`Input Input_${color}`} {...props}>
      {children}
    </input>
  );
};

export default Input;
