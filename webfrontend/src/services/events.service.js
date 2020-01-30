import config from "../config";
import axios from "axios";
import HttpService from "./http.service";

export default class EventService {
    constructor() {

    }

    static baseURL(){
        return `http://${config.BACKEND_URL}:${config.BACKEND_PORT}/events`
    }

    static async getEvents(){
        let eventsRequest = await HttpService.get(EventService.baseURL());
        console.log(eventsRequest);
        if (eventsRequest.status===200){
            return eventsRequest.data;
        }
    }
}

