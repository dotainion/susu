export class Feed{
    constructor(API){
        this.api = API;
    }

    async set(data){
        return await this.api.get('/set/post', data);
    }

    async list(communityId){
        return await this.api.get('/list/posts', {communityId});
    }
}
