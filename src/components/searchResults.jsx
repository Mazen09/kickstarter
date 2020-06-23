import React, { Component } from "react";
import { getSearchResults } from "../services/postService";
import MiniPost from "./miniPost";

class SearchResults extends Component {
  state = {
    data: {}
  };

  async componentDidMount() {
    const { query } = this.props.match.params;
    const { data } = await getSearchResults(query);
    // console.log("data:", data);
    this.setState({ data });
  }

  render() {
    const { query } = this.props.match.params;
    const { count, posts } = this.state.data;
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
