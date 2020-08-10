import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../../services/authService";

class Comment extends Component {
  state = {};
  render() {
    const { id, username, date, content, onDelete } = this.props;
    const current_user = auth.getCurrentUser();
    return (
      <div className="col card" style={{ margin: 10 }}>
        <div className="card-body">
          <h5 className="card-title">
            <Link to={`/profile/${username}`}>{username}</Link>
          </h5>
          <p className="mb-1 text-muted">at {date}</p>
          <p>{content}</p>
          {current_user && current_user === username && (
            <button
              className="btn btn-danger"
              onClick={() => {
                onDelete(id);
              }}
            >
              Delete Comment
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Comment;
