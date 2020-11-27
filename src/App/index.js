import React from "react";
import * as routes from "../constants/route";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Profile from "../Profile";
import Navigation from "./Navigation";
import Organization from "../Organization";

function App() {
  const [organizationName, setOrganizationName] = React.useState(
    "the-road-to-learn-react"
  );

  const onOrganizationSearch = (value) => {
    setOrganizationName(value);
  };

  return (
    <Router>
      <div className="App">
        <Navigation
          organizationName={organizationName}
          onOrganizationSearch={onOrganizationSearch}
        />
        <div className="App-main">
          <Route
            exact
            path={routes.ORGANIZATION}
            component={() => (
              <div className="appp-content-large-header">
                {" "}
                <Organization organizationName={organizationName} />{" "}
              </div>
            )}
          />
          <Route
            path={routes.PROFILE}
            component={() => (
              <div className="app-content-small-header">
                <Profile />{" "}
              </div>
            )}
          />
        </div>
      </div>
    </Router>
  );
}

export default App;
