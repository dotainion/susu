export class Susu{
    constructor(API){
        this.api = API;
    }

    async start(data){
        return await this.api.get('/start/susu', data);
    }

    async active(communityId){
        return await this.api.get('/fetch/active/susu', {communityId});
    }
    
    async fetch(susuId){
        return await this.api.get('/fetch/susu', {susuId});
    }

    async conform(communityId){
        return await this.api.get('/conform/susu', {communityId});
    }

    async join(communityId, memberId){
        return await this.api.get('/join/susu', {memberId, communityId});
    }
    
    async unlink(communityId, memberId){
        return await this.api.get('/unlink/susu', {memberId, communityId});
    }

    async set(data){
        return await this.api.get('/set/susu', data);
    }

    async cycles(){
        return await this.api.get('/list/cycle', null);
    }
}
