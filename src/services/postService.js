import http from "./httpService";

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

export function getSearchResults(queru) {
  return miniPosts;
}

export function getPost(id) {
  // return posts.find(p => p._id === id);
  return http.get(`/getpost/${id}`);
}

export function getDummyPost(id) {
  return http.get(`/getpost/${id}`);
}
