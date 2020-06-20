import http from "./httpService";
import jwt from "jwt-simple";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/users";
const secret = "my secret word for encoding :)";

const users = [
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdG5hbWUiOiJNYXplbiIsImxhc3RuYW1lIjoiRWxtZXNlcnkiLCJjb3VudHJ5SWQiOiIxIiwiY2l0eUlkIjoiMiIsImFkZHJlc3MxIjoiMjMgYmFrZXIgc3RyZWV0IiwiYWRkcmVzczIiOiIyMyBiYWtlciBzdHJlZXQiLCJwaG9uZSI6IisyMDEwOTk4MTA4MzQiLCJ1c2VybmFtZSI6Im1hemVuMDkiLCJlbWFpbCI6Im1hemVuZWxtZXNlcnlAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0NSJ9.5FhEOS9IRT4tnen-x-3LM1ykgPthfRORgRtM4MzFqvQ"
];

export function register(user) {
  // return http.post(apiEndpoint, {
  //   email: user.username,
  //   password: user.password,
  //   name: user.name
  // });
  const token = jwt.encode(user, secret);
  users.push(token);
  return token;
}
