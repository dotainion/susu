import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../provider/AuthProvider";
import { MessageBox } from "../components/MessageBox";

export const Messages = () =>{
    const [messages, setMessages] = useState([
        {
            attributes:{
                message: 'If Composer is not functioning properly and you cannot install libraries directly, you can manually',
                date: '15:41',
                isCurrentUser: true
            }
        },{
            attributes:{
                message: 'If Composer',
                date: '15:41',
                isCurrentUser: false
            }
        },{
            attributes:{
                message: 'If Composer is not functioning properly and you cannot install libraries directly, you can manually',
                date: '15:41',
                isCurrentUser: true
            }
        },
    ]);

    return(
        <MessageBox 
            messages={messages}
            messageToName={'Sam Smith'}
            sendMessage={(message)=>console.log(message)}
        />
    )
}