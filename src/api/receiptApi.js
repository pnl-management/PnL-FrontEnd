import axios from "axios";
import { baseURL } from "../enum/Consts";

export function getAllReceipt(IdToken, brandId) {
  return axios({
    method: "GET",
    url: `/api/receipts/brands/${brandId}`,
    baseURL: baseURL,
    headers: {
      Authorization: "Bearer " + IdToken
    },
    crossDomain: true
  });
}

export function getDetailReceipt(IdToken, id) {
  return axios({
    method: "GET",
    url: `/api/receipts/${id}`,
    baseURL: baseURL,
    headers: {
      Authorization: "Bearer " + IdToken
    },
    crossDomain: true
  });
}

export function getReceiptEvidences(IdToken, id) {
  return axios({
    method: "GET",
    url: `/api/receipts/${id}/evidences`,
    baseURL: baseURL,
    headers: {
      Authorization: "Bearer " + IdToken
    },
    crossDomain: true
  });
}

export function changeStatusReceipt(IdToken, id, type) {
  return fetch(baseURL + `/api/receipts/${id}/judge?type=${type}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json;charset=utf-8",
      Accept: "application/json",
      Authorization: "Bearer " + IdToken
    },
    crossDomain: true
  });
}

export function getReceiptByStore(IdToken, storeId) {
  return axios({
    method: "GET",
    url: `/api/receipts/stores/${storeId}`,
    baseURL: baseURL,
    headers: {
      Authorization: "Bearer " + IdToken
    },
    crossDomain: true
  });
}
