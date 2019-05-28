const enverioment = require("../env.js");

class SessionApi {
    static login(credentials) {
        const request = new Request(`${enverioment.API.URL}/auth/login`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(credentials)
        });


        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static signup(user) {
        const request = new Request(`${enverioment.API.URL}/auth/signup`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(user)
        });


        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static me(token) {
        const request = new Request(`${enverioment.API.URL}/users/me`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(token)
        });


        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
}

export default SessionApi;