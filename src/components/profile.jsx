import React, { Component } from "react";

class Profile extends Component {
  state = {};

  render() {
    const { user } = this.props.match.params;
    return <h1>profile page for {user}</h1>;
  }
}

export default Profile;
