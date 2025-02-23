export class Payment{
    constructor(API){
        this.api = API;
    }

    async createIntent(userId, currency, amount, paymentMethodId=null){
        return await this.api.get('/create/payment/intent', {userId, currency, amount, paymentMethodId});
    }

    async paymentReceipt(paymentIntentId){
        return await this.api.get('/payment/receipt', {paymentIntentId});
    }
}

