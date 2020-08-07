import client from "./apigService";
import jwt from "jwt-simple";
const tokenKey = "user";

export async function login(user) {
  var body = { ...user };
  body["password"] = encodePassword(body["password"]);
  var pathTemplate = "/users";
  var method = "POST";
  return client.invokeApi({}, pathTemplate, method, {}, body);
}

function encodePassword(password) {
  return jwt.encode(password, process.env.REACT_APP_PASS_ENC_SEC_KEY);
}

export async function register(user) {
  var body = { ...user };
  body["password"] = encodePassword(body["password"]);
  var pathTemplate = "/users";
  var method = "PUT";
  return client.invokeApi({}, pathTemplate, method, {}, body);
}

export function loginWithusername(username) {
  localStorage.setItem(tokenKey, username);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    return localStorage.getItem(tokenKey);
  } catch (ex) {
    return null;
  }
}

export async function getAccount(username) {
  var pathParams = { username };
  var pathTemplate = "/users/account?username={username}";
  var method = "GET";
  return client.invokeApi(pathParams, pathTemplate, method, {}, {});
}

export async function getProfile(username) {
  var pathParams = { username };
  var pathTemplate = "/users/{username}";
  var method = "GET";
  return client.invokeApi(pathParams, pathTemplate, method, {}, {});
}

export default {
  login,
  register,
  loginWithusername,
  logout,
  getCurrentUser,
  getAccount,
  getProfile
};
