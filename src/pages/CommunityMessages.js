import { useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../provider/AuthProvider";
import { MdSend } from "react-icons/md";
import { MessageBox } from "../components/MessageBox";
import { api } from "../request/Api";
import { useParams } from "react-router-dom";

export const CommunityMessages = () =>{
    const { user } = useAuth();

    const [community, setCommunity] = useState();
    const [messages, setMessages] = useState([]);

    const params = useParams();

    const intervalRef = useRef();
    const messagesRef = useRef([]);

    const sendMessage = (message) =>{
        const data = {
            id: null,
            fromId: user.id,
            toId: params.communityId,
            message: message,
            read: false,
            hide: false,
        }
        api.message.set(data).then((response)=>{
            setMessages((existingMessages)=>[...existingMessages, response.data.data[0]]);
        }).catch((error)=>{

        });
    }

    useEffect(()=>{
        messagesRef.current = messages;
    }, [messages]);

    useEffect(()=>{
        api.message.communityConversation(params.communityId).then((response)=>{
            setMessages(response.data.data);
        }).catch((error)=>{

        });

        api.community.community(params.communityId).then((response)=>{
            setCommunity(response.data.data[0]);
        }).catch((error)=>{

        });

        intervalRef.current = setInterval(() => {
            api.message.communityConversation(params.communityId, false).then((response)=>{
                const msgsIds = messagesRef.current.map((msg)=>msg.id);
                setMessages((msgs)=>[...msgs, ...response.data.data.filter((msg)=>!msgsIds.includes(msg.id))]);
            }).catch((error)=>{
    
            });
        }, 5000);

        return ()=>{
            clearInterval(intervalRef.current);
        }
    }, []);

    return(
        <MessageBox 
            isCommunityMessanger
            messages={messages}
            messageToName={community?.attributes?.name || ''}
            sendMessage={sendMessage}
        />
    )
}