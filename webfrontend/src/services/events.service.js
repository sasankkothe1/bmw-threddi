import config from "../config";
import axios from "axios";

export default class EventService {
    constructor() {

    }

    static baseURL(){
        return `http://${config.BACKEND_URL}:${config.BACKEND_PORT}/events`
    }

    static async getEvents(){
        let eventsRequest = await axios.get(EventService.baseURL());
        if (eventsRequest.status===200){
            return eventsRequest.data;
        }
    }
}

