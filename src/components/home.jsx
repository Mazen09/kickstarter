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

  handleScroll = async () => {
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const { lastKey } = this.state;
    console.log(scrollable, scrolled, lastKey);
    if (scrollable - scrolled < 10 && lastKey !== null) {
      this.updateState();
    }
    if (lastKey === null) {
      document.removeEventListener("scroll", this.handleScroll);
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
              type={"reviewPost"}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
