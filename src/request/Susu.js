
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

    async conform(groupId){
        return await this.api.get('/conform/susu', {groupId});
    }

    async join(memberId, groupId){
        return await this.api.get('/join/susu', {memberId, groupId});
    }
    
    async unlink(memberId, groupId){
        return await this.api.get('/unlink/susu', {memberId, groupId});
    }

    async l(groupId){
        return await this.api.get('/list/schedule', {groupId});
    }
}
