
export default class HttpService {
    constructor() {
    }

    static get(url) {
        return this.doRequest(url, null, "GET");
    }

    static put(url, data) {
        return this.doRequest(url, data, 'PUT');
    }

    static remove(url, data) {
        return this.doRequest(url, data, 'DELETE');
    }

    static post(url, data) {
        return this.doRequest(url, data, 'POST');
    }

    static doRequest(url, body, method) {

        let possible_methods = ['GET', 'PUT', 'DELETE', 'POST'];
        if (!possible_methods.includes(method))
            return new Promise((_, reject) => reject("NO VALID METHOD FOR METHOD EVOCATION USED"));

        const token = window.localStorage.getItem('token');

        let header = new Headers();
        header.append('Content-Type', 'application/json');

        if (token) {
            header.append('authentication', `Bearer ${token}`);
        }

        let config = {method: method, headers: header};

        if (body) {
            config.body = JSON.stringify(body);
        }

        return new Promise((resolve, reject) => {
            fetch(url, config).then((resp) => {
                if (this.checkIfUnauthorized(resp)) {
                    window.location = "/login";
                } else {
                    return resp.json();
                }
            }).then((resp) => {
                if (resp.error) {
                    reject(resp.error);
                } else {
                    if (resp.hasOwnProperty('token')) {
                        window.localStorage.setItem("token", resp.token);
                    }
                    resolve(resp);
                }
            }).catch((e) => {
                reject(e.message);
            })
        });
    }

    static checkIfUnauthorized(res) {
        return res.status === 401;
    }

}
