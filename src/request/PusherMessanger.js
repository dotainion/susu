import Pusher from "pusher-js";

export class PusherMessanger{
    pusher = null;
    channel = null;

    constructor(option){
        if(option.subscribe === true){
            this.subscribe();
        }
    }

    subscribe(){
        this.pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
            cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
            encrypted: true,
        });
        return this;
    }

    on(ch, ev, callback){
        if(!this.pusher){
            throw new Error('Must subscribe before setting events.');
        }
        this.channel = this.pusher.subscribe(ch);
        this.channel.bind(ev, (message)=>{
            callback(message);
        });
        return this;
    }

    destroy(){
        if(!this.channel){
            throw new Error('Must set an event before you can destroy.');
        }
        this.channel.unbind_all();
        this.channel.unsubscribe();
    }
    
    async channelName(userId, senderId){
        const sorted = [userId, senderId].sort();
        const sharedToken = sorted.join('').slice(0, 6);
        const combined = sorted.join('_').replace(/-/g, sharedToken);
        const raw = combined + process.env.REACT_APP_PUSHER_CHANNEL_SECRET_KEY;

        const encoder = new TextEncoder();
        const data = encoder.encode(raw);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);

        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return `chat.${hashHex}`;
    }
}