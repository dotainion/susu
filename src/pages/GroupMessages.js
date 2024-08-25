import { useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../provider/AuthProvider";
import { MdSend } from "react-icons/md";
import { MessageBox } from "../components/MessageBox";
import { api } from "../request/Api";
import { useParams } from "react-router-dom";

export const GroupMessages = () =>{
    const { user } = useAuth();

    const [group, setGroup] = useState();
    const [messages, setMessages] = useState([]);

    const params = useParams();

    const intervalRef = useRef();
    const messagesRef = useRef([]);

    const sendMessage = (message) =>{
        const data = {
            id: null,
            fromId: user.id,
            toId: params.groupId,
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
        api.message.groupConversation(params.groupId).then((response)=>{
            setMessages(response.data.data);
        }).catch((error)=>{

        });

        api.group.group(params.groupId).then((response)=>{
            setGroup(response.data.data[0]);
        }).catch((error)=>{

        });

        intervalRef.current = setInterval(() => {
            api.message.groupConversation(params.groupId, false).then((response)=>{
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
            isGroupMessanger
            messages={messages}
            messageToName={group?.attributes?.name || ''}
            sendMessage={sendMessage}
        />
    )
}