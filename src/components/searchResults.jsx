import React, { Component } from "react";
import { getSearchResults } from "../services/postService";
import MiniPost from "./miniPost";

class SearchResults extends Component {
  state = {
    search_results: []
  };

  componentDidMount() {
    const { query } = this.props.match.params;
    const search_results = getSearchResults(query);
    this.setState({ search_results });
  }

  render() {
    const { search_results } = this.state;
    const { query } = this.props.match.params;
    return (
      <div className="container" style={{ margin: 10 }}>
        <h3>
          We found {search_results.length} results for ({query}){" "}
        </h3>
        {search_results.map(minipost => (
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

export default SearchResults;
