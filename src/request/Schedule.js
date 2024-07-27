
export class Schedule{
    constructor(API){
        this.api = API;
    }

    async list(groupId){
        return await this.api.get('/list/schedule', {groupId});
    }
}
