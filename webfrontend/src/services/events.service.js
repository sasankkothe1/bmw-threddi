import config from "../config";
import axios from "axios";
import HttpService from "./http.service";

export default class EventService {
    constructor() {

    }
    

    static baseURL(){
        return `http://${config.BACKEND_URL}:${config.BACKEND_PORT}/events`
    }

    // static async getEvents(){
    //     const token = window.localStorage.getItem("token")
    //     const config = {
    //         headers: { Authentication: `Bearer ${token}` }
    //     };
    //     let eventsRequest = await axios.get(EventService.baseURL());
    //     //console.log(token)
    //     console.log(eventsRequest);
    //     if (eventsRequest.status===200){
    //         return eventsRequest.data;
    //     }
    // }

    static async getEvents(){
        console.log("haha")
        return new Promise((resolve, reject) => {
            let something = HttpService.get(EventService.baseURL(), function (res) {
                console.log("this is ::::::::" +something);
                console.log(res)
                resolve(res);
            }, function (res) {
                reject(res);
            });
        });

    }
}

