import config from "../config";
import axios from "axios";
import HttpService from "./http.service";

export default class RegisterService {

    static baseURL(){
        return `http://${config.ADMIN_BACKEND_URL}:${config.ADMIN_BACKEND_PORT}/administrators`
    }

    static async register(userRegisterData){
        let registerRequest = await axios.post(RegisterService.baseURL() + "/register", userRegisterData);
        if (registerRequest.status===200){
            console.log("status is 200");
            return registerRequest.data;
        } else {
            console.log("doomed");
        }
    }
}
