import client from "./apigService";
import axios from "axios";

export async function getMiniPosts(lastkey) {
  var pathParams = { lastkey };
  var pathTemplate = "/posts?lastkey={lastkey}";
  var method = "GET";
  return client.invokeApi(pathParams, pathTemplate, method, {}, {});
}

export function getSearchResults(q, s) {
  var pathParams = { q, s };
  var pathTemplate = "/search?q={q}&s={s}";
  var method = "GET";
  return client.invokeApi(pathParams, pathTemplate, method, {}, {});
}

export async function getPost(postId) {
  var pathParams = { postId };
  var pathTemplate = "/posts/{postId}";
  var method = "GET";
  return client.invokeApi(pathParams, pathTemplate, method, {}, {});
}

export async function getPresignedURL() {
  var pathTemplate = "/utils/presignedurls";
  var method = "GET";
  return client.invokeApi({}, pathTemplate, method, {}, {});
}

export async function uploadFile(file, url) {
  console.log(file, url);
  var options = {
    headers: { "Content-Type": file["type"], "x-amz-acl": "public-read" }
  };
  console.log("options", options);
  return axios.put(url, file, options);
}

export async function getvote(postId, username) {
  var pathParams = { postId, username };
  var pathTemplate = "/posts/{postId}/votes?username={username}";
  var method = "GET";
  return client.invokeApi(pathParams, pathTemplate, method, {}, {});
}

export async function vote(postId, username, vote) {
  var pathParams = { postId, username, vote };
  var pathTemplate =
    "/posts/{postId}/votes?username={username}&direction={vote}";
  var method = "POST";
  return client.invokeApi(pathParams, pathTemplate, method, {}, {});
}

export async function getReviewPost(category, postid) {
  var pathParams = { category, postid };
  var pathTemplate = "/posts/pending/{category}/{postid}";
  var method = "GET";
  return client.invokeApi(pathParams, pathTemplate, method, {}, {});
}

export async function approvePost(category, postid) {
  var pathParams = { category, postid };
  var pathTemplate = "/posts/pending/{category}/{postid}";
  var method = "POST";
  return client.invokeApi(pathParams, pathTemplate, method, {}, {});
}

export async function getReviewPosts(category, lastkey) {
  var pathParams;
  var pathTemplate;
  if (lastkey === "" || lastkey === null) {
    pathParams = { category };
    pathTemplate = "/posts/pending/{category}";
  } else {
    pathParams = { category, lastkey };
    pathTemplate = "/posts/pending/{category}?lastkey={lastkey}";
  }
  var method = "GET";
  return client.invokeApi(pathParams, pathTemplate, method, {}, {});
}
