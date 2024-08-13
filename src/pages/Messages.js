import { useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../provider/AuthProvider";
import { MessageBox } from "../components/MessageBox";
import { api } from "../request/Api";
import { useParams } from "react-router-dom";

export const Messages = () =>{
    const { user } = useAuth();

    const [member, setMember] = useState();
    const [messages, setMessages] = useState([]);

    const params = useParams();
    
    const intervalRef = useRef();
    const messagesRef = useRef([]);

    const sendMessage = (message) =>{
        const data = {
            id: null,
            fromId: user.id,
            toId: params.memberId,
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
        api.user.user(params.memberId).then((response)=>{
            setMember(response.data.data[0]);
        }).catch((error)=>{
            
        });

        api.message.memberConversation(user.id, params.memberId).then((response)=>{
            setMessages(response.data.data);
        }).catch((error)=>{

        });

        intervalRef.current = setInterval(() => {
            api.message.memberConversation(user.id, params.memberId, false).then((response)=>{
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
            messages={messages}
            messageToName={`${member?.attributes?.firstName} ${member?.attributes?.lastName}`}
            sendMessage={sendMessage}
        />
    )
}