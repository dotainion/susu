
export class Susu{
    constructor(API){
        this.api = API;
    }

    async start(groupId){
        return await this.api.get('/start/susu', {groupId});
    }

    async active(groupId){
        return await this.api.get('/fetch/active/susu', {groupId});
    }
    
    async fetch(susuId){
        return await this.api.get('/fetch/susu', {susuId});
    }

    async conform(groupId){
        return await this.api.get('/conform/susu', {groupId});
    }

    async join(groupId, memberId){
        return await this.api.get('/join/susu', {memberId, groupId});
    }
    
    async unlink(groupId, memberId){
        return await this.api.get('/unlink/susu', {memberId, groupId});
    }

    async set(data){
        return await this.api.get('/set/susu', data);
    }

    async cycles(){
        return await this.api.get('/list/cycle', null);
    }
}
