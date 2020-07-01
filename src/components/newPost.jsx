import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getCategories } from "./../services/categoryService";
import { ToastContainer } from "react-toastify";

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
    this.addAttachmentsToContent();
    console.log("submitting", this.state);
  };

  addAttachmentsToContent = () => {
    const data = this.state.data;
    const files = data.files;
    for (var x = 0; x < files.length; x++) {
      if (files[x].type.includes("image")) {
        data["content"] += `\n<img src="${files[x].name}" class="rounded">`;
      } else if (files[x].type.includes("video")) {
        data[
          "content"
        ] += `\n<iframe width="420" height="345" src="${files[x].name}"/>`;
      } else {
        data["content"] += `\n [${files[x].name}](${files[x].name})`;
      }
    }
    this.setState({ data });
  };

  render() {
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
                  {this.renderTextarea(
                    "content",
                    "write your post here in markdown",
                    "10"
                  )}
                  {this.renderFileUpload("files")}
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
