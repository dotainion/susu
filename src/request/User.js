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

    async search(value){
        return await this.api.get('/search/users', {value});
    }

    async address(id){
        return await this.api.get('/fetch/address', {id});
    }

    async byGroup(groupId){
        return await this.api.get('/list/group/users', {groupId});
    }

    async bySusu(susuId){
        return await this.api.get('/list/susu/users', {susuId});
    }
}
