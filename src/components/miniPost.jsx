import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getCategory } from "../services/categoryService";

class MiniPost extends Component {
  state = {};
  render() {
    const { id, title, username, date, category } = this.props;
    return (
      <div className="card" style={{ margin: 10 }}>
        <div className="card-body">
          <h4 className="card-title">
            <Link to={`/post/${id}`}>{title}</Link>{" "}
            <span className="badge badge-secondary">
              {getCategory(category)}
            </span>
          </h4>
          <p className="mb-1 text-muted">
            by <Link to={`/profile/${username}`}>{username}</Link> at {date}
          </p>
        </div>
      </div>
    );
  }
}

export default MiniPost;
