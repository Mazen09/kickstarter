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
