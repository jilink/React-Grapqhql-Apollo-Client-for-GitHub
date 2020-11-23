import React from "react";

const Link = ({ children, ...props }) => (
  <a {...props} target="_blank" rel="noopener noreferre">
    {children}
  </a>
);

export default Link;
