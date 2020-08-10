import React from "react";
import Joi from "joi-browser";
import auth from "../services/authService";
import Form from "./common/form";
import { getPost, getvote, vote } from "./../services/postService";
import {
  getComments,
  addComment,
  deleteComment
} from "./../services/commentService";
import LoadingOverlay from "react-loading-overlay";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Tags from "./common/tags";
import Comment from "./common/comment";
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
    loading: true,
    vote: "none"
  };

  schema = {
    comment: Joi.string()
      .required()
      .label("Comment")
  };

  async componentDidMount() {
    console.log("mounting");
    const { id } = this.props.match.params;
    const username = auth.getCurrentUser();
    const { data: post } = await getPost(id);
    const { data: vote } = await getvote(id, username);
    this.loadComments("");
    this.setState({ post, loading: false, vote });
  }

  doSubmit = async () => {
    this.setState({ loading: true });
    const username = auth.getCurrentUser();
    const { id } = this.props.match.params;
    const { comment } = this.state.data;
    try {
      await addComment(username, id, comment);
      toast.success("your comment is added successfully.");
      this.loadComments("");
    } catch (error) {
      console.log(error);
      toast.error("counldn't add your comment. Please try again later.");
    }
  };

  handleDeleteComment = async commentid => {
    this.setState({ loading: true });
    const username = auth.getCurrentUser();
    try {
      await deleteComment(commentid, username);
      toast.success("your comment is deleted successfully.");
      this.loadComments("");
    } catch (error) {
      console.log(error);
      toast.error("counldn't delete your comment. Please try again later.");
    }
  };

  loadComments = async key => {
    console.log("loading comments ...");
    try {
      const { id } = this.props.match.params;
      let { comments, lastKey } = this.state;
      // console.log("lastkey: ", lastKey);
      const { data } = await getComments(id, key);
      // console.log("data: ", data);
      const { comments: newComments, lastKey: newlastKey } = data;
      if (key === "") {
        comments = newComments;
        document.addEventListener("scroll", this.handleScroll);
      } else if (lastKey !== newlastKey) {
        comments = comments.concat(newComments);
      }
      lastKey = newlastKey;
      this.setState({ comments, lastKey, loading: false });
      // console.log("State: ", this.state);
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
    const cur_vote = this.state.vote;
    if (b) {
      this.setState({ vote: "up" });
      this.doVote("up", cur_vote);
    } else {
      this.setState({ vote: "down" });
      this.doVote("down", cur_vote);
    }
  };

  doVote = async (v, cur_vote) => {
    const { id } = this.props.match.params;
    const username = auth.getCurrentUser();
    try {
      await vote(id, username, v);
      toast.success("Your vote is recorded successfully.");
    } catch (error) {
      toast.error("Couldn't record your vote.");
      this.setState({ vote: cur_vote });
    }
  };

  render() {
    const { title, username, date, category, tags, content } = this.state.post;

    const { comments, loading, vote } = this.state;
    const user = auth.getCurrentUser();
    const likeButtonClass =
      vote === "up" ? "btn btn-success" : "btn btn-secondary";
    const dislikeButtonClass =
      vote === "down" ? "btn btn-danger" : "btn btn-secondary";

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
              {user && (
                <div
                  className="btn-group"
                  role="group"
                  style={{ marginLeft: 20 }}
                >
                  <button
                    className={likeButtonClass}
                    onClick={() => this.handleLikes(true)}
                  >
                    <i className="fa fa-thumbs-up"></i>
                  </button>
                  <button
                    className={dislikeButtonClass}
                    onClick={() => this.handleLikes(false)}
                  >
                    <i className="fa fa-thumbs-down"></i>
                  </button>
                </div>
              )}
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
