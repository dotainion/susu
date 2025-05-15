export class Likes{
    constructor(API){
        this.api = API;
    }

    async set(data){
        return await this.api.get('/set/links', data);
    }
}
