import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getCategories, turnToObjectList } from "./../services/categoryService";
import LoadingOverlay from "react-loading-overlay";
import auth from "../services/authService";
import { uploadFile, submitPost } from "../services/postService";
import { toast } from "react-toastify";
import { CostExplorer } from "aws-sdk";

class NewPost extends Form {
  state = {
    data: {
      title: "",
      content: "",
      category: "",
      tags: ""
    },
    categories: [],
    tags: [],
    attachments: [],
    errors: {},
    loading: false
  };

  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    content: Joi.string()
      .required()
      .label("Content"),
    category: Joi.string()
      .required()
      .label("Category"),
    tags: Joi.string()
      .required()
      .label("Tags"),
    files: Joi.label("Files")
  };

  async componentDidMount() {
    const { data } = await getCategories();
    const categories = turnToObjectList(data);
    this.setState({ categories });
    console.log("mounted !!");
  }

  doSubmit = async () => {
    this.setState({ loading: true });
    this.submitPost();
  };

  submitPost = async () => {
    const { title, content, category, tags } = this.state.data;
    const username = auth.getCurrentUser();
    const { attachments } = this.state;

    await submitPost(
      title,
      content,
      category,
      username,
      this.createTagsList(tags),
      attachments
    )
      .then(res => {
        toast.success("Your Post submitted successfully");
        const { state } = this.props.location;
        window.location = state ? state.from.pathname : "/";
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log(err);
        toast.error("Couldn't submit your Post.");
      });
  };

  createTagsList = tags => {
    const tagsList = tags
      .trim()
      .split(",")
      .filter(item => {
        return !(item === "");
      });
    return tagsList;
  };

  uploadAttachments = files => {
    const attachments = [];
    try {
      Array.from(files).forEach(async file => {
        await uploadFile(file)
          .then(res => {
            attachments.push(res.Location);
          })
          .catch(err => {
            toast.error(`Couldn't Upload ${file.name}`);
            console.log(err);
          });
      });
    } catch (error) {
      this.setState({ loading: false });
      console.log(error);
      toast.error("Couldn't Upload your attachments. Please try again later");
    }
    this.setState({ attachments });
  };

  render() {
    const { categories } = this.state;
    return (
      <LoadingOverlay
        active={this.state.loading}
        spinner
        text="Please wait ..."
      >
        <div className="container">
          <h1>New Post</h1>
          <div className="row">
            <div className="col card">
              <div className="card-body">
                <h4 className="card-title">Post Editor</h4>
                <form onSubmit={this.handleSubmit}>
                  {this.renderSelect(
                    "category",
                    "Category",
                    categories,
                    "name",
                    "name"
                  )}
                  {this.renderInput("title", "Title")}
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
      </LoadingOverlay>
    );
  }
}

export default NewPost;
