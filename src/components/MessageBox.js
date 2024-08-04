import { useRef } from "react";
import { MdSend } from "react-icons/md";
import { useAuth } from "../provider/AuthProvider";

export const MessageBox = ({messageToName, messages, isGroupMessanger, sendMessage}) =>{
    const { user } = useAuth();
    
    const messageRef = useRef();

    const postMessage = () =>{
        sendMessage(messageRef.current.value);
    }

    return(
        <div className="container">
            <div className="d-flex flex-column vh-100 mx-auto" style={{maxWidth: '800px'}}>
                <div className="bg-sidebar h4 p-3">{messageToName}</div>
                <div className="overflow-auto mb-auto">
                    {messages.map((message, key)=>(
                        <div className={`d-flex ${message.attributes.isCurrentUser ? 'justify-content-end' : 'justify-content-start'}`} key={key}>
                            <div className={`d-flex ${message.attributes.isCurrentUser ? 'justify-content-end' : 'justify-content-start'} w-75`}>
                                <div className="d-inline-block py-2 px-3">
                                    <div className={`${message.attributes.isCurrentUser ? 'message-right justify-content-end' : 'message-left justify-content-start'} d-flex position-relative w-auto rounded-3 m-0 p-2`}>
                                        <div>
                                            {
                                                isGroupMessanger 
                                                ? <div className="text-primary small">
                                                    {
                                                        message.attributes.user.id === user.id
                                                        ? <span>Me</span>
                                                        : <span>{message.attributes.user.attributes.firstName} {message.attributes.user.attributes.lastName}</span>
                                                    }
                                                </div>
                                                : null
                                            }
                                            <div>{message.attributes.message}</div>
                                        </div>
                                        <div className="small mt-auto ms-2">{message.attributes.date}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-4">
                    <div className="d-flex align-items-center w-100 rounded-3 bg-white py-2">
                        <input ref={messageRef} className="form-control shadow-none border-0" type="text" placeholder="Message: John Smith"/>
                        <button onClick={postMessage} className="btn shadow-none bg-transparent p-0 me-3"><MdSend className="fs-3" /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}