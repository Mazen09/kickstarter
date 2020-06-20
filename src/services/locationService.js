import http from "./httpService";
import { apiUrl } from "../config.json";

const countries = [
  { _id: "1", name: "Egypt" },
  { _id: "2", name: "USA" },
  { _id: "3", name: "Saudi Arabia" },
  { _id: "4", name: "United Arab Emirates" }
];
const cities = [
  { _id: "1", name: "Cairo" },
  { _id: "2", name: "Alexandria" },
  { _id: "3", name: "New York" },
  { _id: "4", name: "Washington" },
  { _id: "5", name: "Reyad" },
  { _id: "6", name: "Dubai" },
  { _id: "7", name: "Abu Dhabi" }
];

export function getCountries() {
  //   return http.get(apiUrl + "/countries");
  return countries;
}

export function getCountry(id) {
  return countries.find(c => c._id === id);
}

export function getCities() {
  //   return http.get(apiUrl + "/" + countryID + "/cities");
  return cities;
}

export function getCity(id) {
  return cities.find(c => c._id === id);
}
