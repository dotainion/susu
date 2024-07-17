import axios from "axios";
import { token } from "../utils/Token";
import { Auth } from "./Auth";
import { User } from "./User";
import { Group } from "./Group";

export class Api{
    //https://www.caribbeancodingacademygrenada.com/caribbean-green-energy-service
    baseURL = '/susu-service';
    //baseURL = 'https://www.caribbeancodingacademygrenada.com/caribbean-green-energy-service';

    constructor(){
        this.axios = axios.create({
            baseURL: this.baseURL,
            headers: {
                Authorization: token.get(),
                Accept: 'application/json',
                AccessPath: window.location.pathname
            }
        });
        this.user = new User(this);
        this.auth = new Auth(this);
        this.group = new Group(this);
    }

    async post(route, data){
        return await this.axios.post(route, data);
    }

    async get(route, data){
        return await this.axios.post(route, data);
    }
}

export const api = new Api();
