import React, { Component } from "react";

class Search extends Component {
  state = {
    query: ""
  };

  handleChange = e => {
    const query = e.currentTarget.value;
    this.setState({ query });
  };

  doSubmit = async () => {
    console.log("submitted");
    window.location = `/search/${this.state.query}`;
  };

  render() {
    const { query } = this.state;
    return (
      <div className="form-inline my-2 my-lg-0">
        <input
          className="form-control mr-sm-2"
          placeholder="Search"
          value={query}
          onChange={this.handleChange}
        />
        <button
          className="btn btn-outline-secondary my-2 my-sm-0"
          disabled={query === ""}
          onClick={this.doSubmit}
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;
