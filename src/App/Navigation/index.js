import React from "react";
import { Link, withRouter } from "react-router-dom";
import * as routes from "../../constants/route";
import Button from "../../Button";
import Input from "../../Input";

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

class Navigation extends React.Component {
  state = { organizationName: "the-road-to-react" };

  onOrganizationSearch = (value) => {
    this.setState({ organizationName: value });
  };

  render() {
    const {
      location: { pathname },
    } = this.props;
    return (
      <header className="Navigation">
        <div className="Navigation-link">
          <Link to={routes.PROFILE}>Profile</Link>
        </div>
        <div className="Navigation-link">
          <Link to={routes.ORGANIZATION}>Organization</Link>
        </div>
        {pathname === routes.ORGANIZATION && (
          <OrganizationSearch
            organizationName={this.state.organizationName}
            onOrganizationSearch={this.onOrganizationSearch}
          />
        )}
      </header>
    );
  }
}

export default withRouter(Navigation);
