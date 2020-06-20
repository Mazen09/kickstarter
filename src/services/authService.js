import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  // const { data: jwt } = await http.post(apiEndpoint, { email, password });
  const jwt =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmaXJzdG5hbWUiOiJNYXplbiIsImxhc3RuYW1lIjoiRWxtZXNlcnkiLCJjb3VudHJ5SWQiOiI1YjIxY2EzZWViN2Y2ZmJjY2Q0NzE4MTUiLCJjaXR5SWQiOiI1YjIxY2EzZWViN2Y2ZmJjY2Q0NzE4MWIiLCJhZGRyZXNzMSI6IjIzIGJha2VyIHN0cmVldCIsImFkZHJlc3MyIjoiMjMgYmFrZXIgc3RyZWV0IiwicGhvbmUiOiIrMjAxMDk5ODEwODM0IiwidXNlcm5hbWUiOiJtYXplbjA5IiwiZW1haWwiOiJtYXplbmVsbWVzZXJ5QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzNDUifQ.usvr0sEegNu4P3uL6pMNcAuPY2ngZ8YHWuxg0AjspNY";
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
};
