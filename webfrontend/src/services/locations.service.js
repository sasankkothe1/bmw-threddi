import config from "../config";
import axios from "axios";
import HttpService from "./http.service";

export default class LocationService {
    constructor() {

    }

    static baseURL(){
        return `http://${config.ADMIN_BACKEND_URL}:${config.ADMIN_BACKEND_PORT}/mainlocations`

    }

    static async getMainLocations(){
        return HttpService.get(LocationService.baseURL());
        // if (mainLocationRequest.status===200){
        //     return mainLocationRequest.data;
        // }
    }
    static async deleteMainLocations(locationId){
        let eventsRequest = await HttpService.remove(`${LocationService.baseURL()}/${locationId}`);
        if (eventsRequest.status===200){
            return eventsRequest.data;
        }
    }
    static async putMainLocations(locationId, updatedLocation){
        let eventsRequest =  await HttpService.put(`${LocationService.baseURL()}/${locationId}`,updatedLocation);
        if (eventsRequest.status===200){
            return eventsRequest.data;
        }
    }
    static async createMainLocations(newLocation){
        return HttpService.post(LocationService.baseURL(), newLocation);

    }
}
