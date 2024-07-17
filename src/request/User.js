import { token } from "../utils/Token";

export class User{
    constructor(API){
        this.api = API;
    }

    async editProfile(data){
        return await this.api.get('/edit/user', data);
    }

    async user(id){
        return await this.api.get('/fetch/user', {id});
    }

    async users(){
        return await this.api.get('/list/users', null);
    }

    async address(id){
        return await this.api.get('/fetch/address', {id});
    }
}
