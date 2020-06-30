import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Textarea from "./textarea";
import Select from "./select";
import ReactMarkdown from "react-markdown";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  handleTextareaEditButtonGroup(target, func) {
    const data = { ...this.state.data };
    data[target] += func;
    this.setState({ data });
  }

  onFileUploadChangeHandler = (event, target) => {
    console.log(target);
    if (this.fileErrorCheck(event)) {
      console.log(event.target.files);
      this.addFilesToTarget(target);
    }
  };

  fileErrorCheck = event => {
    let files = event.target.files;
    let err = "";
    const types = ["image/png", "image/jpeg", "image/gif", "video/mp4"];
    for (var x = 0; x < files.length; x++) {
      if (types.every(type => files[x].type !== type)) {
        err += files[x].type + " is not a supported format\n";
      }
    }
    if (err !== "") {
      event.target.value = null;
      console.log(err);
      return false;
    }
    return true;
  };

  addFilesToTarget = target => {
    let files = event.target.files;
    const data = { ...this.state.data };

    for (var x = 0; x < files.length; x++) {
      if (files[x].type.includes("image")) {
        data[target] += `\n<img src="${files[x].name}" class="rounded">`;
      } else if (files[x].type.includes("video")) {
        data[
          target
        ] += `\n<video width="420" height="345" src="${files[x].name}"/>`;
      }
    }
    data["files"] = files;
    console.log(data);
    this.setState({ data });
  };

  renderFileUpload = target => {
    return (
      <div className="form-group files">
        <input
          type="file"
          name="file"
          multiple
          onChange={() => this.onFileUploadChangeHandler(event, target)}
        />
      </div>
    );
  };
  renderTextareaEditButtonGroup(buttons, targetTextarea) {
    return (
      <div className="btn-group" role="group">
        {buttons.map(button => (
          <button
            key={button.key}
            className="btn btn-secondary"
            onClick={() =>
              this.handleTextareaEditButtonGroup(targetTextarea, button.func)
            }
          >
            {button.label}
          </button>
        ))}
      </div>
    );
  }

  renderButton(label, className = "btn btn-outline-secondary") {
    return (
      <button disabled={this.validate()} className={className}>
        {label}
      </button>
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderTextarea(name, label, rows, type = "text") {
    const { data, errors } = this.state;

    return (
      <Textarea
        type={type}
        name={name}
        rows={rows}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderCard(name, header) {
    const { data } = this.state;
    return (
      <div className="col card">
        <div className="card-body">
          <h4 className="card-title">{header}</h4>
          <ReactMarkdown source={data[name]} escapeHtml={false} />
        </div>
      </div>
    );
  }
}

export default Form;
