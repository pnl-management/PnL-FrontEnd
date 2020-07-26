import axios from "axios";
import { baseURL } from "../enum/Consts";

export function getAllStoreByBrand(IdToken) {
  return axios({
    method: "GET",
    url: "/api/brands/stores",
    baseURL: baseURL,
    // params: {
    //     offset: params.offset,
    //     limit: params.limit,
    //     sort: "created-time-des"
    // },
    headers: {
      Authorization: "Bearer " + IdToken
    },
    crossDomain: true
  });
}

export function getStoreByID(IdToken, id) {
  return axios({
    method: "GET",
    url: `/api/stores/${id}`,
    baseURL: baseURL,
    // params: {
    //     offset: params.offset,
    //     limit: params.limit,
    //     sort: "created-time-des"
    // },
    headers: {
      Authorization: "Bearer " + IdToken
    },
    crossDomain: true
  });
}
