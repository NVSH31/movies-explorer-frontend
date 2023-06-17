import { BEATFILMS_URL } from "./constants";

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.statusText}`);
}

export const getMovies = () => {
  return fetch(`${BEATFILMS_URL}/beatfilm-movies`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(checkResponse);
}
