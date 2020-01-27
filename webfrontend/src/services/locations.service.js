import config from "../config";
import axios from "axios";

export default class LocationService {
    constructor() {

    }

    static baseURL(){
        return `http://${config.ADMINISTRATOR_URL}:${config.ADMINISTRATOR_PORT}/mainlocations`
    }

    static async getMainLocations(){
        let mainLocationRequest = await axios.get(LocationService.baseURL());
        if (mainLocationRequest.status===200){
            return mainLocationRequest.data;
        }
    }
    static async deleteMainLocations(locationId){
        let eventsRequest = await axios.delete(`${LocationService.baseURL()}/${locationId}`);
        if (eventsRequest.status===200){
            return eventsRequest.data;
        }
    }
    static async putMainLocations(locationId, updatedLocation){
        let eventsRequest =  await axios.put(`${LocationService.baseURL()}/${locationId}`,updatedLocation);
        if (eventsRequest.status===200){
            return eventsRequest.data;
        }
    }
    static async createMainLocations(newLocation){
        let eventsRequest = await axios.post(LocationService.baseURL(), newLocation);
        if (eventsRequest.status===200){
            return eventsRequest.data;
        }
    }
}

