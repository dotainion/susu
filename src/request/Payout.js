export class Payout{
    constructor(API){
        this.api = API;
    }

    async add(susuId, memberId, contribution){
        return await this.api.get('/add/susu/payout', {susuId, memberId, contribution});
    }

    async listPayouts(susuId, memberId){
        return await this.api.get('/list/susu/payout', {susuId, memberId});
    }

    async list(susuId){
        return await this.api.get('/list/payout', {susuId});
    }
}

