
export class Contribution{
    constructor(API){
        this.api = API;
    }

    async add(susuId, memberId, contribution){
        return await this.api.get('/add/susu/contribution', {susuId, memberId, contribution});
    }

    async upate(id, paid, refunded, payout){
        return await this.api.get('/update/susu/contribution', {id, paid, refunded, payout});
    }

    async listContributions(susuId, memberId){
        return await this.api.get('/list/susu/contribution', {susuId, memberId});
    }
}
