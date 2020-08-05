import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getCategories } from "./../services/categoryService";
import LoadingOverlay from "react-loading-overlay";
import Tags from "./tags";

class NewPost extends Form {
  state = {
    data: {
      content: "",
      categoryId: "",
      tags: "",
      files: {}
    },
    categories: [],
    tags: [],
    errors: {},
    UploadingAttachments: false
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
    // console.log(this.state.data.content);
  }

  doSubmit = async () => {
    this.addAttachmentsToContent();
    this.createTagsList();
    console.log("submitting", this.state);
  };

  createTagsList = () => {
    const { tags } = this.state.data;
    const tagsList = tags
      .trim()
      .split(",")
      .filter(item => {
        return !(item === "");
      });
    this.setState({ tags: tagsList });
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

  uploadAttachments = async () => {};

  renderAttachments = () => {
    const items = [];
    const files = this.state.data.files;
    for (var x = 0; x < files.length; x++) {
      items.push(files[x].name);
    }
    return <Tags tags={items} />;
  };

  render() {
    return (
      <LoadingOverlay
        active={this.state.UploadingAttachments}
        spinner
        text="Uploading Your Attachments..."
      >
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
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">attachments</h4>
                      {this.renderAttachments()}
                    </div>
                  </div>
                  {this.renderFileUpload("files")}
                  {this.renderButton("Submit")}
                </form>
              </div>
            </div>
            {this.renderCard("content", "Post Output")}
          </div>
        </div>
      </LoadingOverlay>
    );
  }
}

export default NewPost;
