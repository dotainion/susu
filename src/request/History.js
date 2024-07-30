
export class History{
    constructor(API){
        this.api = API;
    }

    async add(susuId, memberId, contribution){
        return await this.api.get('/add/susu/history', {susuId, memberId, contribution});
    }

    async lisHistory(susuId, memberId){
        return await this.api.get('/list/susu/history', {susuId, memberId});
    }
}
