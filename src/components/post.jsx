import React from "react";
import Joi from "joi-browser";
import auth from "../services/authService";
import Form from "./common/form";
import { getPost, getComments, addComment } from "./../services/postService";
import LoadingOverlay from "react-loading-overlay";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Tags from "./tags";
import Comment from "./comment";
import { toast } from "react-toastify";

class Post extends Form {
  state = {
    data: {
      comment: ""
    },
    errors: {},
    post: {},
    comments: [],
    lastKey: "",
    loading: true
  };

  schema = {
    comment: Joi.string()
      .required()
      .label("Comment")
  };

  doSubmit = async () => {
    const username = auth.getCurrentUser();
    const { id } = this.props.match.params;
    const { comment } = this.state.data;
    const data = {
      username: username,
      postid: id,
      content: comment
    };
    console.log(data);
    try {
      await addComment(data);
    } catch (error) {
      toast.error("error in new comment");
    }
    this.loadComments("");
  };

  async componentDidMount() {
    console.log("mounting");
    const { id } = this.props.match.params;
    const { data: post } = await getPost(id);
    this.loadComments("");
    this.setState({ post, loading: false });
    document.addEventListener("scroll", this.handleScroll);
  }

  loadComments = async key => {
    try {
      const { id } = this.state.post;
      let { comments, lastKey } = this.state;
      // console.log("lastkey: ", lastKey);
      const { data } = await getComments(id, key);
      // console.log("data: ", data);
      const { comments: newComments, lastKey: newlastKey } = data;
      if (lastKey !== newlastKey) {
        comments = comments.concat(newComments);
        lastKey = newlastKey;
        this.setState({ comments, lastKey });
        // console.log("State: ", this.state);
      }
    } catch (ex) {
      toast.error("error");
    }
  };

  handleScroll = async () => {
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const { lastKey } = this.state;
    // console.log(scrollable, scrolled, lastKey);
    if (scrollable - scrolled < 10 && lastKey !== null) {
      this.updateComments();
    }
    if (lastKey === null) {
      document.removeEventListener("scroll", this.handleScroll);
    }
  };

  updateComments = () => {
    this.loadComments(this.state.lastKey);
  };

  handleLikes = b => {
    const post = this.state.post;
    if (b) {
      post.likes = parseInt(post.likes) + 1;
    } else {
      post.dislikes = parseInt(post.dislikes) + 1;
    }
    this.setState({ post });
  };

  render() {
    const {
      title,
      username,
      date,
      category,
      tags,
      content,
      likes,
      dislikes
    } = this.state.post;

    const { comments, loading } = this.state;
    const user = auth.getCurrentUser();

    if (!title) {
      return <React.Fragment></React.Fragment>;
    }

    return (
      <LoadingOverlay active={loading} spinner text="Please Wait...">
        <div className="card" style={{ margin: 10 }}>
          <div className="card-body">
            <h4 className="card-title">
              {` ${title} \t`}
              <span className="badge badge-secondary">{category}</span>
              <div
                className="btn-group"
                role="group"
                style={{ marginLeft: 20 }}
              >
                <button
                  className="btn btn-secondary"
                  onClick={() => this.handleLikes(true)}
                >
                  <i className="fa fa-thumbs-up"></i> {likes}
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => this.handleLikes(false)}
                >
                  <i className="fa fa-thumbs-down"></i> {dislikes}
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
            <div className="col card">
              <div className="card-body">
                <h5 className="card-title">Comments</h5>
                {auth.getCurrentUser() && (
                  <div className="col card">
                    <div className="card-body">
                      <h6 className="card-title">Write comment as {user}</h6>
                      <form onSubmit={this.handleSubmit}>
                        {this.renderTextarea(
                          "comment",
                          "write your comment here",
                          "2"
                        )}
                        {this.renderButton("Submit")}
                      </form>
                    </div>
                  </div>
                )}
                {comments.map(comment => (
                  <Comment
                    key={comment.id}
                    username={comment.username}
                    date={comment.date}
                    content={comment.content}
                    onDelete={() => {
                      this.handleDeleteComment(comment.id);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </LoadingOverlay>
    );
  }
}

export default Post;
