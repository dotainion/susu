import { useEffect, useState } from "react";
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

    useEffect(()=>{
        api.message.memberConversation(user.id, params.memberId).then((response)=>{
            setMessages(response.data.data);
            setMember(response.data.data.find((mb)=>mb.attributes.user.id !== user.id));
        }).catch((error)=>{

        });
    }, []);

    return(
        <MessageBox 
            messages={messages}
            messageToName={`${member?.attributes?.firstName} ${member?.attributes?.lastName}`}
            sendMessage={(message)=>console.log(message)}
        />
    )
}