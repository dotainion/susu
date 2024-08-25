export class Refund{
    constructor(API){
        this.api = API;
    }

    async add(susuId, memberId, amount){
        return await this.api.get('/add/susu/refund', {susuId, memberId, amount});
    }

    async listPayouts(susuId, memberId){
        return await this.api.get('/list/susu/refund', {susuId, memberId});
    }

    async list(susuId){
        return await this.api.get('/list/refund', {susuId});
    }
}

