import React from "react";
import { Link } from "react-router-dom";
import * as routes from "../../constants/route";

const Navigation = () => {
  return (
    <header className="Navigation">
      <div className="Navigation-link">
        <Link to={routes.PROFILE}>Profile</Link>
      </div>
      <div className="Navigation-link">
        <Link to={routes.ORGANIZATION}>Organization</Link>
      </div>
    </header>
  );
};

export default Navigation;
