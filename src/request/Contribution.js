export class Contribution{
    constructor(API){
        this.api = API;
    }

    async add(data){
        return await this.api.get('/add/susu/contribution', data);
    }

    async listContributions(susuId, memberId){
        return await this.api.get('/list/susu/contribution', {susuId, memberId});
    }

    async list(susuId){
        return await this.api.get('/list/contribution', {susuId});
    }
}

