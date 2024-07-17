
export class Group{
    constructor(API){
        this.api = API;
    }

    async group(id){
        return await this.api.get('/fetch/group', {id});
    }

    async groups(){
        return await this.api.get('/list/groups', null);
    }

    async memberGroups(memberId){
        return await this.api.get('/list/groups', {memberId});
    }

    async set(data){
        return await this.api.get('/set/group', data);
    }

    async join(groupId, memberId){
        return await this.api.get('/join/group', {groupId, memberId});
    }
}
