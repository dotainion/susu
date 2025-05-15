import { useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../provider/AuthProvider";
import { MessageBox } from "../components/MessageBox";
import { api } from "../request/Api";
import { useParams } from "react-router-dom";
import { mockData } from "../contents/MockData";
import { PusherMessanger } from "../request/PusherMessanger";

export const Messages = () =>{
    const { user } = useAuth();

    const [member, setMember] = useState();
    const [channel, setChannel] = useState();
    const [messages, setMessages] = useState([]);

    const params = useParams();
    
    const sendMessage = (message) =>{
        const data = {
            id: null,
            fromId: user.id,
            toId: params.memberId,
            message: message,
            read: false,
            hide: false,
            channel: channel,
            event: 'message'
        }
        api.message.set(data).then((response)=>{
            
        }).catch((error)=>{

        });
    }

    useEffect(()=>{
        api.user.user(params.memberId).then((response)=>{
            setMember(response.data.data[0]);
        }).catch((error)=>{
            
        });
        api.message.memberConversation(user.id, params.memberId).then((response)=>{
            setMessages(response.data.data);
        }).catch((error)=>{

        });
        let destroy = ()=>null;
        const pusher = new PusherMessanger({subscribe: true});
        pusher.channelName(user.id, params.memberId).then((channel)=>{
            setChannel(()=>channel);
            pusher.on(channel, 'message', (message)=>{
                setMessages((msgs)=>[...msgs, message]);
            });
            destroy = ()=>pusher.destroy();
        });
        if(process.env.NODE_ENV === 'development'){
            setMember(mockData.user());
            setMessages(mockData.messages());
        }
        return ()=>destroy();
    }, []);

    return(
        <MessageBox 
            messages={messages}
            messageToName={`${member?.attributes?.firstName || ''} ${member?.attributes?.lastName || ''}`}
            sendMessage={sendMessage}
        />
    )
}