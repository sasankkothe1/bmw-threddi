import config from "../config";
import axios from "axios";

export default class EventService {
    constructor() {

    }

    static baseURL(){
        return `http://${config.BACKEND_URL}:${config.BACKEND_PORT}/mainlocations`
    }

    static async getMainLocations(){
        let eventsRequest = await axios.get(EventService.baseURL());
        if (eventsRequest.status===200){
            return eventsRequest.data;
        }
    }
    static async deleteMainLocations(locationId){
        let eventsRequest = await axios.delete(`${EventService.baseURL()}/${locationId}`);
        if (eventsRequest.status===200){
            return eventsRequest.data;
        }
    }
    static async putMainLocations(updatedLocation){
        let eventsRequest =  await axios.put(`${EventService.baseURL()}/${locationId}`,updatedLocation);
        if (eventsRequest.status===200){
            return eventsRequest.data;
        }
    }
    static async createMainLocations(newLocation){
        let eventsRequest = await axios.post(EventService.baseURL(), newLocation);
        if (eventsRequest.status===200){
            return eventsRequest.data;
        }
    }
}

