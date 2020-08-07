import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Textarea from "./textarea";
import Select from "./select";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";

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

  onFileUploadChangeHandler = (event, target) => {
    console.log(target);
    if (this.filesSizeCheck(event)) {
      console.log(event.target.files);
      this.addFilesToTarget(target);
    }
  };

  filesSizeCheck = event => {
    let files = event.target.files;
    let err = "";
    let maxSize = 5250880; //about 5MB
    let size = 0;
    for (var x = 0; x < files.length; x++) {
      size += files[x].size;
      if (size >= maxSize) {
        err = "Max size exceeded";
        break;
      }
    }
    if (err !== "") {
      event.target.value = null;
      console.log(err);
      alert(err);
      return false;
    }
    return true;
  };

  addFilesToTarget = target => {
    let files = event.target.files;
    const data = { ...this.state.data };
    data[target] = files;
    const UploadingAttachments = true;
    this.setState({ data, UploadingAttachments });
    this.uploadAttachments();
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

  renderButton(label, className = "btn btn-outline-secondary") {
    return (
      <button disabled={this.validate()} className={className}>
        {label}
      </button>
    );
  }

  renderSelect(name, label, options, optionsId, optionName) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        optionsId={optionsId}
        optionName={optionName}
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
