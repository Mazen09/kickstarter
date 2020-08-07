import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import { getCountries, getCities } from "./../services/locationService";
import LoadingOverlay from "react-loading-overlay";
import { toast } from "react-toastify";

class RegisterForm extends Form {
  state = {
    data: {
      firstname: "",
      lastname: "",
      countryid: "",
      zoneid: "",
      city: "",
      address1: "",
      address2: "",
      telephone: "",
      postcode: "",
      username: "",
      email: "",
      password: ""
    },
    countries: [],
    cities: [],
    errors: {},
    currentcountryId: "",
    loading: false
  };

  schema = {
    firstname: Joi.string()
      .required()
      .label("First name"),

    lastname: Joi.string()
      .required()
      .label("Last name"),

    countryid: Joi.string()
      .required()
      .label("Country"),

    zoneid: Joi.string()
      .required()
      .label("Zone"),

    city: Joi.string()
      .required()
      .max(30)
      .label("City"),

    address1: Joi.string()
      .required()
      .min(10)
      .max(30)
      .label("Address 1"),

    address2: Joi.string()
      .min(10)
      .max(30)
      .label("Address 2"),

    telephone: Joi.string()
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

  async componentDidMount() {
    const { data: countries } = await getCountries();
    this.setState({ countries });
  }

  componentDidUpdate() {
    const { countryid } = this.state.data;
    const { currentcountryId } = this.state;
    if (countryid !== currentcountryId) {
      this.updateCities();
    }
  }

  updateCities = async () => {
    const { countryid } = this.state.data;
    const { data: cities } = await getCities(countryid);
    const currentcountryId = countryid;
    this.setState({ cities, currentcountryId });
  };

  doSubmit = async () => {
    this.setState({ loading: true });
    this.register();
  };

  register = async () => {
    const { data } = this.state;
    try {
      await auth.register(data);
      auth.loginWithusername(data.username);
      const { state } = this.props.location;
      this.setState({ loading: false });
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      this.setState({ loading: false });
      if (ex.response && ex.response.status === 422) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
        toast.error("User already exists. Please Login.");
      }
    }
  };

  render() {
    const { countries, cities, loading } = this.state;
    return (
      <LoadingOverlay active={loading} spinner text="Please Wait...">
        <div>
          <h1>Register</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("firstname", "First name")}
            {this.renderInput("lastname", "Last name")}
            {this.renderSelect(
              "countryid",
              "Country",
              countries,
              "CountryId",
              "Name"
            )}
            {this.renderSelect("zoneid", "Zone", cities, "ZoneId", "Name")}
            {this.renderInput("city", "City")}
            {this.renderInput("address1", "Address 1")}
            {this.renderInput("address2", "Address 2")}
            {this.renderInput("telephone", "Phone Number")}
            {this.renderInput("postcode", "Post Code")}
            {this.renderInput("username", "Username")}
            {this.renderInput("email", "Email")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Register")}
          </form>
        </div>
      </LoadingOverlay>
    );
  }
}

export default RegisterForm;
