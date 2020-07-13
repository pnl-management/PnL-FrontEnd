import axios from "axios";
import { baseURL } from "../enum/Consts";

export function loginAuthen(IdToken) {
  return axios({
    method: "POST",
    url: "api/login",
    baseURL: baseURL,
    headers: {
      Authorization: IdToken
      // "X-Requested-With": "XMLHttpRequest",
      // 'Accept': 'application/json',
      // 'Content-Type': 'application/json',
    },
    crossDomain: true
  });
}
