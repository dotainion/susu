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

    async setAddress(data){
        return await this.api.get('/set/address', data);
    }

    async byCommunity(communityId){
        return await this.api.get('/list/community/users', {communityId});
    }

    async bySusu(susuId){
        return await this.api.get('/list/susu/users', {susuId});
    }
}
