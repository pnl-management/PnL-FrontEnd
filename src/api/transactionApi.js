import axios from "axios";

import { baseURL } from "../enum/Consts";

export function getWaitingTransactions(IdToken) {
  return axios({
    method: "GET",
    url: "api/Transactions/Index",
    baseURL: baseURL,
    headers: {
      Authorization: "Bearer " + IdToken
    },
    crossDomain: true
  });
}

export function getAllTransactions(params) {
  console.log(params);
  return axios({
    method: "GET",
    url: "api/brands/transactions/",
    params: {
      offset: params.offset,
      limit: params.limit,
      sort: "created-time-des"
    },
    baseURL: baseURL,
    headers: {
      Authorization: "Bearer " + params.token
    },
    crossDomain: true
  });
}

export function getAvailableTransaction(idToken) {
  return axios({
    method: "GET",
    url: "api/brands/transactions/",
    params: {
      limit: 10,
      sort: "created-time-des",
      query: "lastest-status[eq]101"
    },
    baseURL: baseURL,
    headers: {
      Authorization: "Bearer " + idToken
    },
    crossDomain: true
  });
}

export function getDetailTransaction(IdToken, id) {
  return axios({
    method: "GET",
    url: "api/Transactions/" + id,
    baseURL: baseURL,
    headers: {
      Authorization: "Bearer " + IdToken
    },
    crossDomain: true
  });
}

export function getTransactionLength(IdToken) {
  return axios({
    method: "GET",
    url: "/api/brands/transactions/length",
    baseURL: baseURL,
    headers: {
      Authorization: "Bearer " + IdToken
    },
    crossDomain: true
  });
}

export function createTransaction(IdToken, transaction) {
  let json = {
    Brand: {
      id: transaction.brandId
    },
    Store: {
      id: transaction.storeId
    },
    Category: {
      id: transaction.categoryId
    },
    name: transaction.name,
    value: transaction.value,
    description: transaction.description,
    listReceipt: transaction.listReceipt
  };
  return fetch(baseURL + "api/transactions", {
    method: "POST",
    headers: {
      "content-type": "application/json;charset=utf-8",
      Accept: "application/json",
      Authorization: "Bearer " + IdToken
    },
    body: JSON.stringify(json)
  });
}

export function getTransactionCategory(idToken) {
  return axios({
    method: "GET",
    url: "/api/brands/transaction-categories",
    params: {
      limit: 20
    },
    baseURL: baseURL,
    headers: {
      Authorization: "Bearer " + idToken
    },
    crossDomain: true
  });
}

export function updateTransaction(IdToken, transaction) {
  let json = {
    Brand: {
      id: transaction.brandId
    },
    Store: {
      id: transaction.storeId
    },
    Category: {
      id: transaction.categoryId
    },
    name: transaction.name,
    value: transaction.value,
    description: transaction.description
  };
  return fetch(baseURL + "api/transactions/" + transaction.id, {
    method: "PUT",
    headers: {
      "content-type": "application/json;charset=utf-8",
      Accept: "application/json",
      Authorization: "Bearer " + IdToken
    },
    body: JSON.stringify(json)
  });
}
