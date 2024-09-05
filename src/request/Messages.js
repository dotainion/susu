export class Messages{
    constructor(API){
        this.api = API;
    }

    async searchMessagners(value){
        return await this.api.get('/messanger/search', {value});
    }

    async set(data){
        return await this.api.get('/set/message', data);
    }

    async memberConversation(memberId, receipientId, read=null){
        return await this.api.get('/member/conversation', {memberId, receipientId, read});
    }

    async communityConversation(communityId, read=null){
        return await this.api.get('/community/conversation', {communityId, read});
    }

    async messangers(memberId){
        return await this.api.get('/list/messangers', {memberId});
    }

    async unSeenMessages(memberId){
        return await this.api.get('list/unseen/messages', {memberId});
    }
}
