import React from "react";

const Tags = ({ tags }) => {
  const items = [];
  tags &&
    tags.forEach(tag =>
      items.push(
        <span
          key={tags.indexOf(tag)}
          className="badge badge-primary"
          style={{ margin: 3, marginBottom: 10 }}
        >
          {tag}
        </span>
      )
    );
  return <React.Fragment>{items}</React.Fragment>;
};

export default Tags;
