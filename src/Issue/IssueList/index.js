import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import IssueItem from "../IssueItem";
import Loading from "../../Loading";
import ErrorMessage from "../../Error";

const GET_ISSUES_OF_REPOSITORY = gql`
  query($repositoryName: String!, $repositoryOwner: String!) {
    repository(name: $repositoryName, owner: $repositoryOwner) {
      issues(first: 5) {
        edges {
          node {
            id
            number
            state
            title
            url
            bodyHTML
          }
        }
      }
    }
  }
`;

const Issues = ({ repositoryOwner, repositoryName }) => {
  return (
    <div className="Issues">
      <Query
        query={GET_ISSUES_OF_REPOSITORY}
        variables={{ repositoryName, repositoryOwner }}
      >
        {({ data, loading, error }) => {
          if (error) {
            return <ErrorMessage error={error} />;
          }

          if (loading && !data) {
            return <Loading />;
          }
          const { repository } = data;

          if (!repository.issues.edges.length) {
            return <div className="IssueList">No Issues ...</div>;
          }

          return <IssueList issues={repository.issues} />;
        }}
      </Query>
    </div>
  );
};

const IssueList = ({ issues }) => (
  <div className="IssueList">
    {issues.edges.map(({ node }) => (
      <IssueItem key={node.id} issue={node} />
    ))}
  </div>
);

export default Issues;
