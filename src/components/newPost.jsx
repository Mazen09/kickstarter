import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getCategories } from "./../services/categoryService";

class NewPost extends Form {
  state = {
    data: {
      content: "",
      categoryId: "",
      tags: "",
      files: {}
    },
    categories: [],
    errors: {}
  };

  schema = {
    content: Joi.string()
      .required()
      .label("Content"),
    categoryId: Joi.string()
      .required()
      .label("Category"),
    tags: Joi.string()
      .required()
      .label("Tags"),
    files: Joi.label("Files")
  };

  componentDidMount() {
    const categories = getCategories();
    this.setState({ categories });
    console.log(this.state.data.content);
  }

  doSubmit = async () => {
    console.log(this.state);
  };

  render() {
    const buttons = [
      { key: 1, label: "header", func: "\n# " },
      { key: 2, label: "code", func: "\n<pre></pre>" },
      { key: 3, label: "link", func: `\n[](https://)` }
    ];

    return (
      <React.Fragment>
        <div className="container">
          <h1>New Post</h1>
          <div className="row">
            <div className="col card">
              <div className="card-body">
                <h4 className="card-title">Post Editor</h4>
                <form onSubmit={this.handleSubmit}>
                  {this.renderSelect(
                    "categoryId",
                    "Category",
                    this.state.categories
                  )}
                  {this.renderInput("tags", "Tags (comma separated)")}
                  {this.renderTextareaEditButtonGroup(buttons, "content")}
                  {this.renderTextarea("content", "write your post here", "10")}
                  {this.renderFileUpload("content")}
                  {this.renderButton("Submit")}
                </form>
              </div>
            </div>
            {this.renderCard("content", "Post Output")}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default NewPost;
