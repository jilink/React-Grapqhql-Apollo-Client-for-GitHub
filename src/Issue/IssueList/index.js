import React from "react";
import { Query, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import { withState } from "recompose";
import FetchMore from "../../FetchMore";

import IssueItem from "../IssueItem";
import Loading from "../../Loading";
import ErrorMessage from "../../Error";
import { ButtonUnobtrusive } from "../../Button";

const GET_ISSUES_OF_REPOSITORY = gql`
  query(
    $repositoryName: String!
    $repositoryOwner: String!
    $issueState: IssueState!
    $cursor: String
  ) {
    repository(name: $repositoryName, owner: $repositoryOwner) {
      issues(first: 5, states: [$issueState], after: $cursor) {
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
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

const getUpdateQuery = () => (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult;
  }

  return {
    ...previousResult,
    repository: {
      ...previousResult.repository,
      issues: {
        ...previousResult.repository.issues,
        ...fetchMoreResult.repository.issues,
        edges: [
          ...previousResult.repository.issues.edges,
          ...fetchMoreResult.repository.issues.edges,
        ],
      },
    },
  };
};

const ISSUE_STATES = {
  NONE: "NONE",
  OPEN: "OPEN",
  CLOSED: "CLOSED",
};

const TRANSITION_LABEL = {
  [ISSUE_STATES.NONE]: "Show open issues",
  [ISSUE_STATES.OPEN]: "Show closed issues",
  [ISSUE_STATES.CLOSED]: "Hide Issues",
};
const TRANSITION_STATE = {
  [ISSUE_STATES.NONE]: ISSUE_STATES.OPEN,
  [ISSUE_STATES.OPEN]: ISSUE_STATES.CLOSED,
  [ISSUE_STATES.CLOSED]: ISSUE_STATES.NONE,
};

const isShow = (issueState) => issueState !== ISSUE_STATES.NONE;

const Issues = ({
  repositoryOwner,
  repositoryName,
  issueState,
  onChangeIssueState,
}) => {
  return (
    <div className="Issues">
      <IssuesFilter
        issueState={issueState}
        onChangeIssueState={onChangeIssueState}
        repositoryOwner={repositoryOwner}
        repositoryName={repositoryName}
      />
      {isShow(issueState) && (
        <Query
          query={GET_ISSUES_OF_REPOSITORY}
          variables={{ repositoryName, repositoryOwner, issueState }}
        >
          {({ data, loading, error, fetchMore }) => {
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

            return (
              <IssueList issues={repository.issues} fetchMore={fetchMore} />
            );
          }}
        </Query>
      )}
    </div>
  );
};

const IssueList = ({ issues, fetchMore }) => (
  <div className="IssueList">
    {issues.edges.map(({ node }) => (
      <IssueItem key={node.id} issue={node} />
    ))}
    <FetchMore
      hasNextPage={issues.pageInfo.hasNextPage}
      variables={{ cursor: issues.pageInfo.endCursor }}
      updateQuery={getUpdateQuery()}
      fetchMore={fetchMore}
    />
  </div>
);

const prefetchIssues = (
  client,
  repositoryOwner,
  repositoryName,
  issueState
) => {
  const nextIssuesState = TRANSITION_STATE[issueState];

  if (isShow(nextIssuesState)) {
    client.query({
      query: GET_ISSUES_OF_REPOSITORY,
      variables: {
        repositoryOwner,
        repositoryName,
        issueState: nextIssuesState,
      },
    });
  }
};

const IssuesFilter = ({
  issueState,
  onChangeIssueState,
  repositoryName,
  repositoryOwner,
}) => (
  <ApolloConsumer>
    {(client) => (
      <ButtonUnobtrusive
        onClick={() => onChangeIssueState(TRANSITION_STATE[issueState])}
        onMouseOver={() =>
          prefetchIssues(client, repositoryOwner, repositoryName, issueState)
        }
      >
        {TRANSITION_LABEL[issueState]}
      </ButtonUnobtrusive>
    )}
  </ApolloConsumer>
);

export default withState(
  "issueState",
  "onChangeIssueState",
  ISSUE_STATES.NONE
)(Issues);
