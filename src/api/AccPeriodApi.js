import axios from "axios";
import { baseURL } from "../enum/Consts";

export function getAllAccPeriod(IdToken) {
  return axios({
    method: "GET",
    url: "/api/periods",
    baseURL: baseURL,
    headers: {
      Authorization: "Bearer " + IdToken
    },
    crossDomain: true
  });
}

export function getAccPeriodByID(IdToken, id) {
  return axios({
    method: "GET",
    url: "/api/periods/" + id,
    baseURL: baseURL,
    headers: {
      Authorization: "Bearer " + IdToken
    },
    crossDomain: true
  });
}

export function createPeriod(IdToken, period) {
  let json = {
    Brand: {
      id: period.brandId
    },
    status: 0,
    title: period.title,
    startDate: period.startDate,
    endDate: period.endDate,
    deadline: period.deadline
  };
  return fetch(baseURL + "api/periods", {
    method: "POST",
    // url: '/api/periods',
    // baseURL: baseURL,
    headers: {
      "content-type": "application/json;charset=utf-8",
      Accept: "application/json",
      Authorization: "Bearer " + IdToken
    },
    body: JSON.stringify(json)
  });
}

export function updatePeriod(IdToken, id, period) {
  let json = {
    Brand: {
      id: period.brandId
    },
    status: 0,
    title: period.title,
    startDate: period.startDate,
    endDate: period.endDate,
    deadline: period.deadline
  };
  var a = fetch(baseURL + "api/periods/" + id, {
    method: "PUT",
    // url: '/api/periods/'+id,
    // baseURL: baseURL,
    headers: {
      "content-type": "application/json;charset=utf-8",
      Accept: "application/json",
      Authorization: "Bearer " + IdToken
    },
    body: JSON.stringify(json)
  });
  console.log(a);
  return a;
}

export function addTransactionToPeriod(IdToken, periodId, tranId) {
  return axios({
    method: "PUT",
    url: `api/transactions/${tranId}/periods/${periodId}`,
    baseURL: baseURL,
    headers: {
      Authorization: "Bearer " + IdToken
    }
  });
}

export function changeStatusPeriod(IdToken, periodId, status) {
  return axios({
    method: "PUT",
    url: `api/periods/${periodId}/status/${status}`,
    baseURL: baseURL,
    headers: {
      Authorization: "Bearer " + IdToken
    }
  });
}

export function updateReport(IdToken) {
  return axios({
    method: "GET",
    url: `api/reports`,
    baseURL: baseURL,
    headers: {
      Authorization: "Bearer " + IdToken
    },
    crossDomain: true
  });
}
