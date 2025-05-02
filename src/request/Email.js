export class Email{
    constructor(API){
        this.api = API;
    }

    async set(data){
        return await this.api.get('/send/mail', data);
    }
}
