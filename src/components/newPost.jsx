import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getCategories, turnToObjectList } from "./../services/categoryService";
import LoadingOverlay from "react-loading-overlay";
import Tags from "./common/tags";
import { getPresignedURL, uploadFile } from "../services/postService";
import { toast } from "react-toastify";

class NewPost extends Form {
  state = {
    data: {
      content: "",
      category: "",
      tags: ""
    },
    categories: [],
    tags: [],
    attachments: [],
    errors: {},
    UploadingAttachments: false
  };

  schema = {
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

  uploadAttachments = async files => {
    try {
      Array.from(files).forEach(file => {
        this.uploadFile(file);
      });
    } catch (error) {
      console.log(error);
      toast.error("Couldn't Upload your attachments. Please try again later");
    }
    this.setState({ UploadingAttachments: false });
  };

  uploadFile = async file => {
    let { data: presignedurl } = await getPresignedURL(
      file.name.replace(/ /g, "") //remove spaces from file name
    );
    await uploadFile(file, presignedurl);
  };

  putFilenameToURL = (url, name) => {
    return url.replace("%7Bfilename%7D", name.replace(/ /g, "")); //remove spaces from file name
  };

  renderAttachments = () => {
    const items = [];
    const { attachments } = this.state;
    for (var x = 0; x < attachments.length; x++) {
      items.push(attachments[x].name);
    }
    return <Tags tags={items} />;
  };

  render() {
    const { categories } = this.state;
    return (
      <LoadingOverlay
        active={this.state.UploadingAttachments}
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
