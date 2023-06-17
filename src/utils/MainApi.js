import { BASE_URL } from "./constants";

class Api {
  constructor({
    baseUrl
  }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(res.json());
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  editMe(name, email) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        name: name,
        email: email,
      })
    });
  }

  register(name, email, password) {
    return this._request(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name, email, password
      })
    });
  }

  authorize (password, email) {
    return this._request(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email, password
      })
    });
  }

  checkToken = (token) => {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    });
  }

  saveMovie(data) {
    return this._request(`${this._baseUrl}/movies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify(data)
    });
  }

  getSavedMovies() {
      return this._request(`${this._baseUrl}/movies`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          },
      });
  }

  deleteMovie(id) {
      return this._request(`${this._baseUrl}/movies/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          },
      });
  }

}

const api = new Api({
  baseUrl: BASE_URL
});

export default api;
