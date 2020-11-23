import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Loading from "../Loading";

const GET_CURRENT_USER = gql`
  {
    viewer {
      login
      name
    }
  }
`;

const Profile = () => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading }) => {
      if (loading || !data.viewer) {
        return <Loading />;
      }
      const { viewer } = data;

      return (
        <div>
          {viewer.name} {viewer.login}
        </div>
      );
    }}
  </Query>
);

export default Profile;
