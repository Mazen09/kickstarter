import React, { Component } from "react";
import { getPost, getComments } from "./../services/postService";
import LoadingOverlay from "react-loading-overlay";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Tags from "./tags";
import Comment from "./comment";
import NewComment from "./newComment";

class Post extends Component {
  state = {
    post: {},
    comments: [],
    lastKey: "",
    loading: true
  };

  async componentDidMount() {
    console.log("mounting");
    const { id } = this.props.match.params;
    const { data: post } = await getPost(id);
    this.updateComments();
    this.setState({ post, loading: false });
    document.addEventListener("scroll", this.handleScroll);
  }

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

  updateComments = async () => {
    const { id } = this.state.post;
    let { comments, lastKey } = this.state;
    // console.log("lastkey: ", lastKey);
    const { data } = await getComments(id, lastKey);
    // console.log("data: ", data);
    const { comments: newComments, lastKey: newlastKey } = data;
    if (lastKey !== newlastKey) {
      comments = comments.concat(newComments);
      lastKey = newlastKey;
      this.setState({ comments, lastKey });
      // console.log("State: ", this.state);
    }
  };

  handleDeleteComment = comment_id => {
    if (confirm("Your comment will be deleted !")) {
      // console.log(comment_id);
      //TODO delete comment
    }
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

    if (!title) {
      return <React.Fragment></React.Fragment>;
    }

    return (
      <LoadingOverlay active={loading} spinner text="Please Wait...">
        {console.log(loading)}
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
                <NewComment />
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
