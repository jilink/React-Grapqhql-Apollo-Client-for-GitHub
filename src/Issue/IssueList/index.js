import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { withState } from "recompose";

import IssueItem from "../IssueItem";
import Loading from "../../Loading";
import ErrorMessage from "../../Error";
import { ButtonUnobtrusive } from "../../Button";

const GET_ISSUES_OF_REPOSITORY = gql`
  query(
    $repositoryName: String!
    $repositoryOwner: String!
    $issueState: IssueState!
  ) {
    repository(name: $repositoryName, owner: $repositoryOwner) {
      issues(first: 5, states: [$issueState]) {
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
      <ButtonUnobtrusive
        onClick={() => onChangeIssueState(TRANSITION_STATE[issueState])}
      >
        {TRANSITION_LABEL[issueState]}
      </ButtonUnobtrusive>
      {isShow(issueState) && (
        <Query
          query={GET_ISSUES_OF_REPOSITORY}
          variables={{ repositoryName, repositoryOwner, issueState }}
        >
          {({ data, loading, error }) => {
            if (error) {
              return <ErrorMessage error={error} />;
            }

            if (loading && !data) {
              return <Loading />;
            }
            const { repository } = data;

            const filterdRepository = {
              issues: {
                edges: repository.issues.edges.filter(
                  (issue) => issue.node.state === issueState
                ),
              },
            };

            if (!filterdRepository.issues.edges.length) {
              return <div className="IssueList">No Issues ...</div>;
            }

            return <IssueList issues={filterdRepository.issues} />;
          }}
        </Query>
      )}
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

export default withState(
  "issueState",
  "onChangeIssueState",
  ISSUE_STATES.NONE
)(Issues);
