export class Schedule{
    constructor(API){
        this.api = API;
    }

    async list(susuId){
        //allow groupId or susuId
        return await this.api.get('/list/schedule', {susuId});
    }

    async select(id, memberId){
        return await this.api.get('/select/schedule', {id, memberId});
    }

    async assign(assignSchedules){
        return await this.api.get('/assign/schedule', {assignSchedules});
    }
}
