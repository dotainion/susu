export class Inviate{
    constructor(API){
        this.api = API;
    }

    async set(data){
        return await this.api.get('/set/invite', data);
    }

    async delete(id){
        return await this.api.get('/delete/invite', {id});
    }

    async listByMember(memberId){
        return await this.api.get('/list/member/invite', {memberId});
    }
    
    async listByTarget(targetId){
        return await this.api.get('/list/target/invite', {targetId});
    }
}
