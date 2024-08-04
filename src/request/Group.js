
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
        return await this.api.get('/member/groups', {memberId});
    }

    async ownerGroups(creatorId){
        return await this.api.get('/owner/groups', {creatorId});
    }

    async set(data){
        return await this.api.get('/set/group', data);
    }

    async join(groupId, memberId){
        return await this.api.get('/join/group', {groupId, memberId});
    }

    async unlink(groupId, memberId){
        return await this.api.get('/unlink/group', {groupId, memberId});
    }

    async delete(data){
        return await this.set(data);
    }
}
