import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";
import { getCountries, getCities } from "./../services/locationService";

class RegisterForm extends Form {
  state = {
    data: {
      firstname: "",
      lastname: "",
      countryId: "",
      cityId: "",
      address1: "",
      address2: "",
      phone: "",
      postcode: "",
      username: "",
      email: "",
      password: ""
    },
    countries: [],
    cities: [],
    errors: {}
  };

  schema = {
    firstname: Joi.string()
      .required()
      .label("First name"),

    lastname: Joi.string()
      .required()
      .label("Last name"),

    countryId: Joi.string()
      .required()
      .label("Country"),

    cityId: Joi.string()
      .required()
      .label("City"),

    address1: Joi.string()
      .required()
      .min(10)
      .max(30)
      .label("Address"),

    address2: Joi.string()
      .min(10)
      .max(30)
      .label("Address"),

    phone: Joi.string()
      .required()
      .min(7)
      .max(15)
      .label("Phone Number"),

    postcode: Joi.string()
      .required()
      .label("Post Code"),

    username: Joi.string()
      .required()
      .label("Username"),

    email: Joi.string()
      .required()
      .email()
      .label("Email"),

    password: Joi.string()
      .required()
      .min(5)
      .label("Password")
  };

  componentDidMount() {
    const countries = getCountries();
    const cities = getCities();
    this.setState({ countries, cities });
  }

  doSubmit = async () => {
    try {
      // const response = await userService.register(this.state.data);
      // auth.loginWithJwt(response.headers["x-auth-token"]);
      const token = userService.register(this.state.data);
      auth.loginWithJwt(token);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("firstname", "First name")}
          {this.renderInput("lastname", "Last name")}
          {this.renderSelect("countryId", "Country", this.state.countries)}
          {this.renderSelect("cityId", "City", this.state.cities)}
          {this.renderInput("address1", "Address1")}
          {this.renderInput("address2", "Address2")}
          {this.renderInput("phone", "Phone Number")}
          {this.renderInput("postcode", "Post Code")}
          {this.renderInput("username", "Username")}
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
