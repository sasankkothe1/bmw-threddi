import config from "../config";
import axios from "axios";
//import HTTPService from "./http.service"

export default class ConfigCreateService {
    constructor() {

    }

    static baseURL(){
        return `http://${config.ADMIN_BACKEND_URL}:${config.ADMIN_BACKEND_PORT}/administrators`
    }

    static async createConfig(configData){
        let createConfigRequest = await axios.post(ConfigCreateService.baseURL() + "/", configData);
        if (createConfigRequest.status===200){
            console.log("status is 200");
            console.log(createConfigRequest.data);
            return createConfigRequest.data;
        } else {
            console.log(createConfigRequest.message);
        }
    }
}
