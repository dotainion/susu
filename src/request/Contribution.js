export class Contribution{
    constructor(API){
        this.api = API;
    }

    async add(susuId, memberId, contribution){
        return await this.api.get('/add/susu/contribution', {susuId, memberId, contribution});
    }

    async listContributions(susuId, memberId){
        return await this.api.get('/list/susu/contribution', {susuId, memberId});
    }

    async list(susuId){
        return await this.api.get('/list/contribution', {susuId});
    }
}

