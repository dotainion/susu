import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../provider/AuthProvider";
import { MdSend } from "react-icons/md";
import { MessageBox } from "../components/MessageBox";
import { api } from "../request/Api";
import { useParams } from "react-router-dom";

export const GroupMessages = () =>{
    const [group, setGroup] = useState();
    const [messages, setMessages] = useState([]);

    const params = useParams();

    useEffect(()=>{
        api.message.groupConversation(params.groupId).then((response)=>{
            setMessages(response.data.data);
        }).catch((error)=>{

        });
        api.group.group(params.groupId).then((response)=>{
            setGroup(response.data.data[0]);
        }).catch((error)=>{

        });
    }, []);

    return(
        <MessageBox 
            isGroupMessanger
            messages={messages}
            messageToName={group?.attributes?.name}
            sendMessage={(message)=>console.log(message)}
        />
    )
}