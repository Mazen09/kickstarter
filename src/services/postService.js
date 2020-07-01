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

export function getMiniPosts() {
  return miniPosts;
}

export function getSearchResults(query) {
  // return miniPosts;
  return http.get(`/search?q=${query}`);
}

export async function getPost(id) {
  var pathParams = { postId: id };
  var pathTemplate = '/posts/{postId}';
  var method = 'GET';
  client.invokeApi(pathParams, pathTemplate, method, {}, {})
}

export function getDummyPost(id) {
  return http.get(`/getpost/${id}`);
}
