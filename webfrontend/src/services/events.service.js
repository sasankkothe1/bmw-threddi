import config from "../config";
import HttpService from "./http.service";

export default class EventService {
    constructor() {

    }
    

    static baseURL(){
        return `http://${config.BACKEND_URL}:${config.BACKEND_PORT}/events`
    }

    static getEvents(){
        return HttpService.get(EventService.baseURL());
    }
}

