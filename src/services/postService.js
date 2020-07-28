import http from "./httpService";
import client from "./apigService";

const miniPosts = [
  {
    _id: "2315",
    username: "john doe",
    date: "1-1-2001",
    category_id: "1",
    title: "Title"
  }
];

export async function getMiniPosts(lastkey) {
  // return miniPosts;
  var pathParams = lastkey;
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

export async function getPost(id) {
  var pathParams = { postId: id };
  var pathTemplate = "/posts/{postId}";
  var method = "GET";
  return client.invokeApi(pathParams, pathTemplate, method, {}, {});
}

export function getDummyPost(id) {
  return http.get(`/getpost/${id}`);
}
