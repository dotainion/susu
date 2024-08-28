export class Refund{
    constructor(API){
        this.api = API;
    }

    async add(data){
        return await this.api.get('/add/susu/refund', data);
    }

    async listRefunds(susuId, memberId){
        return await this.api.get('/list/susu/refund', {susuId, memberId});
    }

    async list(susuId){
        return await this.api.get('/list/refund', {susuId});
    }
}

