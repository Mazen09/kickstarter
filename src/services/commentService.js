import client from "./apigService";

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

export async function addComment(username, postid, content) {
  var body = { username, postid, content };
  var pathTemplate = "/comments";
  var method = "PUT";
  return client.invokeApi({}, pathTemplate, method, {}, body);
}

export async function deleteComment(commentid, username) {
  var pathParams = { commentid, username };
  var pathTemplate = "/comments/{commentid}?username={username}";
  var method = "DELETE";
  return client.invokeApi(pathParams, pathTemplate, method, {}, {});
}
