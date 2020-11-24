import React from "react";

const ErrorMessage = ({ error }) => {
  return (
    <div className="ErrorMessage">
      <small>{error.toString()}</small>
    </div>
  );
};

export default ErrorMessage;
