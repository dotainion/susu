
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
}
