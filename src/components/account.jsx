import React, { Component } from "react";
import auth from "../services/authService";

class Account extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
    console.log(user);
  }

  render() {
    return <h1>account page</h1>;
  }
}

export default Account;
