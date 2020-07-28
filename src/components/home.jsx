import React, { Component } from "react";
import MiniPost from "./miniPost";
import { getMiniPosts } from "./../services/postService";

class Home extends Component {
  state = {
    posts: [],
    lastKey: ""
  };

  async componentDidMount() {
    this.updateState();
    document.addEventListener("scroll", this.handleScroll);
  }

  // laodMorePosts = async () => {
  //   let lastkey = this.state.lastkey;
  //   if (lastkey) {
  //     console.log("loading more posts");
  //     const oldposts = this.state.posts;
  //     const { data } = await getMiniPosts(lastkey);
  //     const posts = oldposts.concat(data.posts);
  //     lastkey = data.lastkey;
  //     this.setState({ posts, lastkey });
  //   }
  // };

  handleScroll = async () => {
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const { lastKey } = this.state;
    console.log(scrollable, scrolled, lastKey);
    if (scrollable - scrolled < 10 && lastKey !== null) {
      this.updateState();
    }
  };

  updateState = async () => {
    let { posts, lastKey } = this.state;
    console.log("lastkey:", lastKey);
    const { data } = await getMiniPosts(lastKey);
    console.log("data", data);
    const { posts: newposts, lastKey: newlastkey } = data;
    if (lastKey !== newlastkey) {
      posts = posts.concat(newposts);
      lastKey = newlastkey;
      this.setState({ posts, lastKey });
      console.log(this.state);
    }
  };

  render() {
    const { posts } = this.state;
    return (
      <React.Fragment>
        <div className="container" style={{ margin: 10 }}>
          {posts.map(minipost => (
            <MiniPost
              key={minipost.id}
              id={minipost.id}
              username={minipost.username}
              date={minipost.date}
              category={minipost.category}
              title={minipost.title}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
