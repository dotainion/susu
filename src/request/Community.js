export class Community{
    constructor(API){
        this.api = API;
    }

    async community(id){
        return await this.api.get('/fetch/community', {id});
    }

    async search(data){
        return await this.api.get('/search/communities', data);
    }

    async communities(limit=null, offset=null){
        return await this.api.get('/list/communities', {limit, offset});
    }

    async memberCommunities(memberId){
        return await this.api.get('/member/communities', {memberId});
    }

    async ownerCommunities(creatorId){
        return await this.api.get('/owner/communities', {creatorId});
    }

    async set(data){
        return await this.api.get('/set/community', data);
    }

    async join(communityId, memberId){
        return await this.api.get('/join/community', {communityId, memberId});
    }

    async unlink(communityId, memberId){
        return await this.api.get('/unlink/community', {communityId, memberId});
    }

    async delete(data){
        return await this.set(data);
    }
}
