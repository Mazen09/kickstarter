import React, { Component } from "react";
import MiniPost from "./miniPost";
import { getMiniPosts } from "./../services/postService";

class Home extends Component {
  state = {
    miniposts: []
  };

  componentDidMount() {
    const miniposts = getMiniPosts();
    this.setState({ miniposts });
  }

  render() {
    const { miniposts } = this.state;
    return (
      <div className="container" style={{ margin: 10 }}>
        {miniposts.map(minipost => (
          <MiniPost
            key={minipost._id}
            id={minipost._id}
            username={minipost.username}
            date={minipost.date}
            category={minipost.category_id}
            title={minipost.title}
          />
        ))}
      </div>
    );
  }
}

export default Home;
