"use strict";

import Axios from "axios";

export default class HttpService {
    constructor() {
    }


    static get(url, onSuccess, onError) {
        const token = window.localStorage.getItem("token")
        const config = {
            headers: { authentication: `Bearer ${token}` }
        };
        console.log(url);

        let header = new Headers();
        header.append('Content-Type', 'application/json');
        if(token) {
            header.append('authentication', `Bearer ${token}`);
        }

        Axios.get(url, 
            config
        ).then((resp) => {
            if(this.checkIfUnauthorized(resp)) {
                console.log("this is line 26")
                window.location = "/login";
            }
            else {
                return resp.json();
            }
        }).then((resp) => {
            if(resp.error) {
                onError(resp.error);
            }
            else {
                if(resp.hasOwnProperty('token')) {
                    window.localStorage['token'] = resp.token;
                }
                onSuccess(resp);
            }
        }).catch((e) => {
                onError(e.message);
        });
    }

    static put(url, data, onSuccess, onError) {
        let token = window.localStorage.getItem('token');
        let header = new Headers();
        if(token) {
            header.append('authentication', `Bearer ${token}`);
        }
        header.append('Content-Type', 'application/json');

        fetch(url, {
            method: 'PUT',
            headers: header,
            body: JSON.stringify(data)
        }).then((resp) => {
            if(this.checkIfUnauthorized(resp)) {
                window.location = "/login";
                return;
            }
            else {
                return resp.json();
            }
        }).then((resp) => {
            if(resp.error) {
                onError(resp.error);
            }
            else {
                if(resp.hasOwnProperty('token')) {
                    window.localStorage['token'] = resp.token;
                }
                onSuccess(resp);
            }
        }).catch((e) => {
            onError(e.message);
        });
    }

    static post(url, data, onSuccess, onError) {
        let token = window.localStorage.getItem('token');
        let header = new Headers();
        if(token) {
            header.append('authentication', `Bearer ${token}`);
        }
        header.append('Content-Type', 'application/json');

        fetch(url, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(data)
        }).then((resp) => {
            if(this.checkIfUnauthorized(resp)) {
                window.location = "/login";
                return;
            }
            else {
                return resp.json();
            }
        }).then((resp) => {
            if(resp.error) {
                onError(resp.error);
            }
            else {
                if(resp.hasOwnProperty('token')) {
                    window.localStorage['token'] = resp.token;
                }
                onSuccess(resp);
            }
        }).catch((e) => {
            onError(e.message);
        });
    }

    static remove(url, onSuccess, onError) {
        let token = window.localStorage.getItem('token');
        let header = new Headers();
        if(token) {
            header.append('Authentication', `Bearer ${token}`);
        }

        fetch(url, {
            method: 'DELETE',
            headers: header
        }).then((resp) => {
            if(this.checkIfUnauthorized(resp)) {
                window.location = "/login";
                return;
            }
            else {
                return resp.json();
            }
        }).then((resp) => {
            if(resp.error) {
                onError(resp.error);
            }
            else {
                onSuccess(resp)
            }
        }).catch((e) => {
            onError(e.message);
        });
    }

    static checkIfUnauthorized(res) {
        if(res.status === 401) {
            return true;
        }
        return false;
    }

}
