import client from "./apigService";

export async function getMiniPosts(lastkey) {
  var pathParams = { lastkey };
  var pathTemplate = "/posts?lastkey={lastkey}";
  var method = "GET";
  return client.invokeApi(pathParams, pathTemplate, method, {}, {});
}

export async function getComments(postid, lastkey) {
  var pathParams;
  var pathTemplate;
  if (lastkey === "") {
    pathParams = { postid };
    pathTemplate = "/comments?postid={postid}";
  } else {
    pathParams = { postid, lastkey };
    pathTemplate = "/comments?postid={postid}&lastkey={lastkey}";
  }
  var method = "GET";
  return client.invokeApi(pathParams, pathTemplate, method, {}, {});
}

export async function deleteComment(commentid) {
  var pathParams = { commentid };
  var pathTemplate = "/comments/{commentid}";
  var method = "DELETE";
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

export async function addComment(data) {
  var body = { data };
  var pathTemplate = "/users";
  var method = "PUT";
  return client.invokeApi({}, pathTemplate, method, {}, body);
}
