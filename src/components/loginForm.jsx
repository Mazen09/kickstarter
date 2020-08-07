import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import LoadingOverlay from "react-loading-overlay";
import { toast } from "react-toastify";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
    loading: false
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    this.setState({ loading: true });
    this.login();
  };

  login = async () => {
    const { data } = this.state;
    try {
      await auth.login(data);
      auth.loginWithusername(data.username);
      const { state } = this.props.location;
      this.setState({ loading: false });
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      this.setState({ loading: false });
      if (ex.response && ex.response.status === 404) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
        toast.error("User not found. Please register instead");
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    const { loading } = this.state;
    return (
      <LoadingOverlay active={loading} spinner text="Please Wait...">
        <div>
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("username", "Username")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Login")}
          </form>
        </div>
      </LoadingOverlay>
    );
  }
}

export default LoginForm;
