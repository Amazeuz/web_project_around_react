class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._authorization = options.headers.authorization;
  }

  loadUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
      .then((res) => {
        if (res.ok) {
          return res;
        }
        return Promise.reject(`Algo deu errado: ${res.status}`);
      })
      .catch((err) => {
        console.log("Erro. A solicitação falhou: ", err);
      });
  }

  getServerCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authorization,
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Algo deu errado: ${res.status}`);
      })
      .catch((err) => {
        console.log("Erro. A solicitação falhou: ", err);
      });
  }

  addServerCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Algo deu errado: ${res.status}`);
      })
      .catch((err) => {
        console.log("Erro. A solicitação falhou: ", err);
      })
  }

  editUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Algo deu errado: ${res.status}`);
      })
      .catch((err) => {
        console.log("Erro. A solicitação falhou: ", err);
      })
  }

  toggleCardLike(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: {
        authorization: this._authorization
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Algo deu errado: ${res.status}`);
      })
      .catch((err) => {
        console.log("Erro. A solicitação falhou: ", err);
      })
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Algo deu errado: ${res.status}`);
      })
      .catch(err => {
        console.log("Erro. A solicitação falhou: ", err);
      })
  }

  changeProfilePicture(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Algo deu errado: ${res.status}`);
      })
      .catch(err => {
        console.log("Erro. A solicitação falhou: ", err);
      })
  }
}

const api = new Api({
  baseUrl: "https://api.around-full.awiki.org",
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    "Content-Type": "application/json"
  }
});

export default api;