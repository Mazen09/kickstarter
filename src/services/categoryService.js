import client from "./apigService";

export async function getCategories() {
  var pathTemplate = "/utils/categories";
  var method = "GET";
  return client.invokeApi({}, pathTemplate, method, {}, {});
}

export function turnToObjectList(arr) {
  const obj_list = [];
  arr.forEach(element => {
    obj_list.push({ name: element });
  });
  return obj_list;
}

export function getExpertCategories(username) {
  var pathParams = { username };
  var pathTemplate = "/users/expertises?username={username}";
  var method = "GET";
  return client.invokeApi(pathParams, pathTemplate, method, {}, {});
}
