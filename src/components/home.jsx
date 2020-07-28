import React, { Component } from "react";
import MiniPost from "./miniPost";
import { getMiniPosts } from "./../services/postService";

class Home extends Component {
  state = {
    posts: [],
    lastkey: ""
  };

  async componentDidMount() {
    const { data } = await getMiniPosts("");
    this.setState(data);
    console.log(this.state);
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
    const { lastkey } = this.state;
    console.log(scrollable, scrolled, this.state.lastkey);
    if (scrollable - scrolled < 10 && this.state.lastkey !== null) {
      console.log("now");
      this.updateState();
    }
  };

  updateState = async () => {
    let { posts, lastkey } = this.state;
    const { data } = await getMiniPosts(lastkey);
    const { posts: newposts, lastkey: newlastkey } = data;
    posts = posts.concat(newposts);
    lastkey = newlastkey;
    this.setState({ posts, lastkey });
    console.log(this.state);
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
