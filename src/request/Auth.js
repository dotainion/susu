import { token } from "../utils/Token";

export class Auth{
    constructor(API){
        this.api = API;
    }

    async logout(){
        return await this.api.post('/logout', null);
    }
    async signIn(email, password){
        return await this.api.post('/signin', {email, password});
    }

    async signUp(data){
        return await this.api.post('/create/user', data);
    }

    async session(){
        return await this.api.get('/fetch/session', {token: token.get()});
    }
}
