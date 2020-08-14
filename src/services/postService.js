import client from "./apigService";
import axios from "axios";
import * as AWS from "aws-sdk";
import v4 from "uuid";

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

export async function getPresignedURL(filename) {
  var pathParams = { filename };
  var pathTemplate = "/utils/presignedurls?filename={filename}";
  var method = "GET";
  return client.invokeApi(pathParams, pathTemplate, method, {}, {});
}

export async function uploadFile(file) {
  const s3 = new AWS.S3({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: "us-east-1",
  });
  const params = {
    Bucket: "kickstarter-attachments",
    Key: v4(),
    Body: file,
    ContentType: file["type"],
  };
  return s3.upload(params).promise();
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
