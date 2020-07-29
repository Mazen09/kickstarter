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
    pathTemplate = "/comments/{postid}";
  } else {
    pathParams = { postid, lastkey };
    pathTemplate = "/comments/{postid}?lastkey={lastkey}";
  }
  var method = "GET";
  return client.invokeApi(pathParams, pathTemplate, method, {}, {});
}

export function getSearchResults(q, s) {
  var pathParams = { q, s };
  var pathTemplate = "/search?q={q}&s={s}";
  var method = "GET";
  return client.invokeApi(pathParams, pathTemplate, method, {}, {});
}

export async function getPost(id) {
  var pathParams = { postId: id };
  var pathTemplate = "/posts/{postId}";
  var method = "GET";
  return client.invokeApi(pathParams, pathTemplate, method, {}, {});
}
