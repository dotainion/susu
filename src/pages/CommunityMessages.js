import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../provider/AuthProvider";
import { MdSend } from "react-icons/md";
import { MessageBox } from "../components/MessageBox";
import { api } from "../request/Api";
import { useParams } from "react-router-dom";
import { useLayout } from "../layout/Layout";
import { mockData } from "../contents/MockData";
import { PusherMessanger } from "../request/PusherMessanger";

export const CommunityMessages = () =>{
    const { user } = useAuth();
    const { setParams, setLayoutParams } = useLayout();

    const [community, setCommunity] = useState();
    const [messages, setMessages] = useState([]);

    const params = useParams();

    const sendMessage = (message) =>{
        const data = {
            id: null,
            fromId: user.id,
            toId: params.communityId,
            message: message,
            read: false,
            hide: false,
            channel: params.communityId,
            event: 'message'
        }
        api.message.set(data).then((response)=>{
            
        }).catch((error)=>{

        });
    }

    useLayoutEffect(() => {
        setParams({communityId: params.communityId});
        return () => setLayoutParams({});
    }, []);

    useEffect(()=>{
        api.message.communityConversation(params.communityId).then((response)=>{
            setMessages(response.data.data);
        }).catch((error)=>{

        });
        api.community.community(params.communityId).then((response)=>{
            setCommunity(response.data.data[0]);
        }).catch((error)=>{

        });
        const pusher = new PusherMessanger({subscribe: true});
        pusher.on(params.communityId, 'message', (message)=>{
            setMessages((msgs)=>[...msgs, message]);
        });
        if(process.env.NODE_ENV === 'development'){
            setMessages(mockData.messages());
            setCommunity(mockData.community());
        }
        return () => pusher.destroy();
    }, []);

    return(
        <MessageBox
            isCommunity
            messages={messages}
            messageToName={community?.attributes?.name || ''}
            sendMessage={sendMessage}
        />
    )
}