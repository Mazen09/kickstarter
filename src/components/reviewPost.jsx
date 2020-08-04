import React, { Component } from "react";
import { getPost, getComments } from "./../services/postService";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Tags from "./tags";
import Comment from "./comment";
import NewComment from "./newComment";

class reviewPost extends Component {
  state = {
    post: {}
  };

  async componentDidMount() {
    console.log("mounting");
    const { id } = this.props.match.params;
    const { data: post } = await getPost(id);
    this.setState({ post });
  }

  render() {
    const { title, username, date, category, tags, content } = this.state.post;

    if (!title) {
      return <React.Fragment></React.Fragment>;
    }

    return (
      <div className="card" style={{ margin: 10 }}>
        <div className="card-body">
          <h4 className="card-title">
            {` ${title} \t`}
            <span className="badge badge-secondary">{category}</span>
            <div className="btn-group" role="group" style={{ marginLeft: 20 }}>
              <button
                className="btn btn-secondary"
                onClick={() => this.handleLikes(true)}
              >
                <i className="fa fa-arrow-up"></i> Upvote
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => this.handleLikes(false)}
              >
                <i className="fa fa-arrow-down"></i> Downvote
              </button>
            </div>
          </h4>
          <p className="mb-1 text-muted">
            by <Link to={`/profile/${username}`}>{username}</Link> at {date}
          </p>
          <Tags tags={tags} />
          <div className="col card">
            <div className="card-body">
              <ReactMarkdown source={content} escapeHtml={false} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default reviewPost;
