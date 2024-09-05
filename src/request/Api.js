import axios from "axios";
import { token } from "../utils/Token";
import { Auth } from "./Auth";
import { User } from "./User";
import { Community } from "./Community";
import { Susu } from "./Susu";
import { Schedule } from "./Schedule";
import { Contribution } from "./Contribution";
import { Messages } from "./Messages";
import { Payout } from "./Payout";
import { Inviate } from "./Inviate";
import { Refund } from "./Refund";
import { routes } from "../routes/Routes";
import $ from "jquery";

export class Api{
    baseURL;

    constructor(){
        this.initialize();
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
        this.community = new Community(this);
        this.susu = new Susu(this);
        this.schedule = new Schedule(this);
        this.contribution = new Contribution(this);
        this.payout = new Payout(this);
        this.refund = new Refund(this);
        this.message = new Messages(this);
        this.invite = new Inviate(this);
    }

    initialize(){
        if(process.env.NODE_ENV === 'development'){
            this.baseURL = 'https://www.caribbeancodingacademygrenada.com/susu-service'
        }else if(process.env.NODE_ENV === 'production'){
            this.baseURL = '/susu-service';
        }else{
            console.error('Environment not determined.');
        }
    }

    reInitializeAuthorizationHeader(){
        this.axios.defaults.headers.Authorization = token.get();
    }

    isAuthRoute(){
        if(
            window.location.href.includes(routes.signIn()) || 
            window.location.href.includes(routes.register()) || 
            window.location.href.includes(routes.onboarding())
        ){
            return true;
        }
        return false;
    }

    parseError(error){
        const notification = $('#login-notification');
        if(error.status === 401 && !this.isAuthRoute()){
            notification.show('fast');
        }else{
            notification.hide();
        }
        return error;
    }

    async post(route, data){
        try{
            return await this.axios.post(route, data);
        }catch(error){
            return this.parseError(error);
        }
    }

    async get(route, data){
        try{
            return await this.axios.post(route, data);
        }catch(error){
            return this.parseError(error);
        }
    }
}

export const api = new Api();
