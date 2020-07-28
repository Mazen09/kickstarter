import React, { Component } from "react";
import { getSearchResults } from "../services/postService";
import MiniPost from "./miniPost";

class SearchResults extends Component {
  state = {
    posts: [],
    count: 0,
    size: 0
  };

  async componentDidMount() {
    this.updateState();
    document.addEventListener("scroll", this.handleScroll);
  }

  handleScroll = async () => {
    const { count, size } = this.state;
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    console.log(scrollable, scrolled, count, size);
    if (scrollable - scrolled < 10 && size < count) {
      this.updateState();
    }
  };

  updateState = async () => {
    const { query } = this.props.match.params;
    let { posts, count, size } = this.state;
    const { data } = await getSearchResults(query, size);
    const { posts: newposts, count: newcount } = data;
    posts = posts.concat(newposts);
    count = newcount;
    size = posts.length;
    this.setState({ posts, count, size });
    console.log(this.state);
  };

  render() {
    const { query } = this.props.match.params;
    const { count, posts } = this.state;
    // console.log(count, posts);
    return (
      <div className="container" style={{ margin: 10 }}>
        <h3>
          We found {count} results for ({query}){" "}
        </h3>
        {posts &&
          posts.map(minipost => (
            <MiniPost
              key={minipost.id}
              id={minipost.id}
              username={minipost.username}
              date={minipost.date}
              category={minipost.categoryId}
              title={minipost.title}
            />
          ))}
      </div>
    );
  }
}

export default SearchResults;
