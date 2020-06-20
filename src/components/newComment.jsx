import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import auth from "../services/authService";

class NewComment extends Form {
  state = {
    data: {
      comment: ""
    },
    errors: {}
  };

  schema = {
    comment: Joi.string()
      .required()
      .label("Comment")
  };

  doSubmit = async () => {
    console.log("comment sybmitted");
  };

  render() {
    const user = auth.getCurrentUser();
    return (
      <div className="col card">
        <div className="card-body">
          <h6 className="card-title">Write comment as {user.username}</h6>
          <form onSubmit={this.handleSubmit}>
            {this.renderTextarea("comment", "write your comment here", "2")}
            {this.renderButton("Submit")}
          </form>
        </div>
      </div>
    );
  }
}

export default NewComment;
