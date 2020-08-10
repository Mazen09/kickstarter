import React, { Component } from "react";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import MiniPost from "./common/miniPost";
import { getMiniPosts } from "./../services/postService";
import auth from "../services/authService";

class Home extends Component {
  state = {
    posts: [],
    lastKey: "",
    loading: true
  };

  async componentDidMount() {
    this.updateState();
    this.sayHi();
    document.addEventListener("scroll", this.handleScroll);
  }

  handleScroll = async () => {
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const { lastKey } = this.state;
    // console.log(scrollable, scrolled, lastKey);
    if (scrollable - scrolled < 10 && lastKey !== null) {
      this.updateState();
    }
    if (lastKey === null) {
      document.removeEventListener("scroll", this.handleScroll);
    }
  };

  updateState = async () => {
    let { posts, lastKey } = this.state;
    let loading = false;
    // console.log("lastkey:", lastKey);
    const { data } = await getMiniPosts(lastKey);
    // console.log("data", data);
    const { posts: newposts, lastKey: newlastkey } = data;
    if (lastKey !== newlastkey) {
      posts = posts.concat(newposts);
      lastKey = newlastkey;
      this.setState({ posts, lastKey, loading });
      // console.log(this.state);
    }
  };

  sayHi = () => {
    const username = auth.getCurrentUser();
    username
      ? toast.success(`Welcome ${username}`)
      : toast.success("Welcome to KickStarter");
  };

  render() {
    const { posts, loading } = this.state;
    return (
      <LoadingOverlay active={loading} spinner text="Please Wait...">
        <div className="container" style={{ margin: 10 }}>
          {posts.map(minipost => (
            <MiniPost
              key={minipost.id}
              id={minipost.id}
              username={minipost.username}
              date={minipost.date}
              category={minipost.category}
              title={minipost.title}
              type={"post"}
            />
          ))}
        </div>
      </LoadingOverlay>
    );
  }
}

export default Home;
