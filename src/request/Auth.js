import { token } from "../utils/Token";

export class Auth{
    constructor(API){
        this.api = API;
    }

    async logout(){
        return await this.api.post('/logout', null);
    }
    async signIn(email, password){
        const url = new URL('urlString');
        const params = new URLSearchParams(url.search);
        return await this.api.post('/signin', {email, password});
    }

    async signUp(data){
        return await this.api.post('/create/user', data);
    }

    async session(){
        return await this.api.get('/fetch/session', {token: token.get()});
    }
}
