import React from "react";
import Link from "../../Link";

const IssueItem = ({ issue }) => {
  return (
    <div className="IssueItem">
      <div className="IssueItem-content">
        <h3>
          <Link href={issue.url}>{issue.title}</Link>
        </h3>
        <div dangerouslySetInnerHTML={{ __html: issue.bodyHTML }} />
      </div>
    </div>
  );
};

export default IssueItem;
