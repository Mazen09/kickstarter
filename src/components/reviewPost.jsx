import React, { Component } from "react";
import { getReviewPost, approvePost } from "./../services/postService";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import LoadingOverlay from "react-loading-overlay";
import { toast } from "react-toastify";
import Tags from "./common/tags";

class reviewPost extends Component {
  state = {
    post: {},
    loading: false
  };

  async componentDidMount() {
    const { id, category } = this.props.match.params;
    console.log("mounting, id: ", id, category);
    const { data: post } = await getReviewPost(category, id);
    this.setState({ post });
  }

  handleApproval = async () => {
    this.setState({ loading: true });
    this.approve();
  };

  approve = async () => {
    this.setState({ loading: true });
    const { id, category } = this.props.match.params;
    try {
      await approvePost(category, id);
      toast.success("Your approval recorded successfully");
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/review";
    } catch (ex) {
      console.log(ex);
      this.setState({ loading: false });
      toast.error("an error occured. Please try again later.");
    }
  };

  renderAttachments = () => {
    const items = [];
    const { attachments } = this.state.post;
    console.log("attachments: ", attachments, attachments.length);
    for (let i = 0; i < attachments.length; i++) {
      console.log("attachment: ", attachments[i]);
    }
    attachments.forEach(attachment => {
      items.push(
        <li className="list-group-item" key={attachment}>
          <a href={attachment}>{attachment}</a>
        </li>
      );
    });
    return items;
  };

  render() {
    const { title, username, date, category, tags, content } = this.state.post;

    if (!title) {
      return <React.Fragment></React.Fragment>;
    }

    return (
      <LoadingOverlay active={this.state.loading} spinner text="Please Wait...">
        <div className="card" style={{ margin: 10 }}>
          <div className="card-body">
            <h4 className="card-title">
              {` ${title} \t`}
              <span className="badge badge-secondary">{category}</span>
              <button
                className="btn btn-success"
                onClick={() => this.handleApproval()}
                style={{ marginLeft: 10 }}
              >
                Approve
              </button>
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
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">attachments</h4>
                <ul className="list-group">{this.renderAttachments()}</ul>
              </div>
            </div>
          </div>
        </div>
      </LoadingOverlay>
    );
  }
}

export default reviewPost;
