import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../provider/AuthProvider";
import { MdSend } from "react-icons/md";
import { MessageBox } from "../components/MessageBox";

export const GroupMessages = () =>{
    const [group, setGroup] = useState();
    const [messages, setMessages] = useState([
        {
            attributes:{
                message: 'If Composer is not functioning properly and you cannot install libraries directly, you can manually',
                date: '15:41',
                isCurrentUser: true,
                user: {
                    attributes: {
                        firstName: 'Fish out',
                        lastName: 'Of water'
                    }
                }
            }
        },{
            attributes:{
                message: 'If Composer',
                date: '15:41',
                isCurrentUser: false,
                user: {
                    attributes: {
                        firstName: 'Fish out',
                        lastName: 'Of water'
                    }
                }
            }
        },{
            attributes:{
                message: 'If Composer is not functioning properly and you cannot install libraries directly, you can manually',
                date: '15:41',
                isCurrentUser: true,
                user: {
                    attributes: {
                        firstName: 'Fish out',
                        lastName: 'Of water'
                    }
                }
            }
        },
    ]);

    return(
        <MessageBox 
            isGroupMessager
            messages={messages}
            messageToName={'Group Name'}
            sendMessage={(message)=>console.log(message)}
        />
    )
}