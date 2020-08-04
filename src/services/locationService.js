import client from "./apigService";

export function getCountries() {
  var pathParams = {};
  var pathTemplate = "/utils/countries";
  var method = "GET";
  return client.invokeApi(pathParams, pathTemplate, method, {}, {});
}

export function getCities(countryid) {
  var pathParams = { countryid };
  var pathTemplate = "/utils/zones?countryid={countryid}";
  var method = "GET";
  return client.invokeApi(pathParams, pathTemplate, method, {}, {});
}
