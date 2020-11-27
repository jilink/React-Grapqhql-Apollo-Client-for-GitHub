import React from "react";
import { Link, withRouter } from "react-router-dom";
import * as routes from "../../constants/route";
import Button from "../../Button";
import Input from "../../Input";

import "./style.css";

class OrganizationSearch extends React.Component {
  state = {
    value: this.props.organizationName,
  };

  onChange = (event) => {
    this.setState({ value: event.target.value });
  };

  onSubmit = (event) => {
    this.props.onOrganizationSearch(this.state.value);
    event.preventDefault();
  };

  render() {
    const { value } = this.state;

    return (
      <div className="Navigation-Search">
        <form onSubmit={this.onSubmit}>
          <Input
            color={"white"}
            type="text"
            value={value}
            onChange={this.onChange}
          />{" "}
          <Button color={"white"} type="submit">
            Search
          </Button>
        </form>
      </div>
    );
  }
}

const Navigation = ({
  location: { pathname },
  organizationName,
  onOrganizationSearch,
}) => {
  return (
    <header className="Navigation">
      <div
        className={`Navigation-link ${
          pathname === routes.PROFILE ? "active" : ""
        }`}
      >
        <Link to={routes.PROFILE}>Profile</Link>
      </div>
      <div
        className={`Navigation-link ${
          pathname === routes.ORGANIZATION ? "active" : ""
        }`}
      >
        <Link to={routes.ORGANIZATION}>Organization</Link>
      </div>
      {pathname === routes.ORGANIZATION && (
        <OrganizationSearch
          organizationName={organizationName}
          onOrganizationSearch={onOrganizationSearch}
        />
      )}
    </header>
  );
};

export default withRouter(Navigation);
