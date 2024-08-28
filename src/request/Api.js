import axios from "axios";
import { token } from "../utils/Token";
import { Auth } from "./Auth";
import { User } from "./User";
import { Group } from "./Group";
import { Susu } from "./Susu";
import { Schedule } from "./Schedule";
import { Contribution } from "./Contribution";
import { Messages } from "./Messages";
import { Payout } from "./Payout";
import { Inviate } from "./Inviate";
import { Refund } from "./Refund";

export class Api{
    //baseURL = '/susu-service';
    baseURL = 'https://www.caribbeancodingacademygrenada.com/susu-service';

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
        this.susu = new Susu(this);
        this.schedule = new Schedule(this);
        this.contribution = new Contribution(this);
        this.payout = new Payout(this);
        this.refund = new Refund(this);
        this.message = new Messages(this);
        this.invite = new Inviate(this);
    }

    async post(route, data){
        return await this.axios.post(route, data);
    }

    async get(route, data){
        return await this.axios.post(route, data);
    }
}

export const api = new Api();
