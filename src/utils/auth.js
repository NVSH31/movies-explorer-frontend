import { BASE_URL } from "./constants";

const checkResponse = (res) => {
  // return res.ok ? res.json() : Promise.reject(`Error: ${res.statusText}`);
  return res.ok ? res.json() : Promise.reject(res.json());
}

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, password})
  })
  .then(checkResponse);
}

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email, password})
  })
  .then(checkResponse);
}

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })
  .then(checkResponse);
}
