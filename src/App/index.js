import * as routes from "../constants/route";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Profile from "../Profile";
import Navigation from "./Navigation";
import Organization from "../Organization";

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <div className="App-main">
          <Route
            exact
            path={routes.ORGANIZATION}
            component={() => (
              <div className="appp-content-large-header">
                {" "}
                <Organization
                  organizationName={"the-road-to-learn-react"}
                />{" "}
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
