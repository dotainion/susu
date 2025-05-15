import { useLayoutEffect, useRef } from "react";
import { MdSend } from "react-icons/md";
import { useAuth } from "../provider/AuthProvider";
import { MinChatUiProvider, MainContainer, MessageInput, MessageContainer, MessageList, MessageHeader } from '@minchat/react-chat-ui';
import $ from "jquery";
import { useNavigate } from "react-router-dom";

export const MessageBox = ({messageToName, messages, sendMessage, isCommunity}) =>{
    const { user } = useAuth();

    const navigate = useNavigate();

    useLayoutEffect(()=>{
        $('header').removeClass('d-flex').addClass('d-none');
        return ()=>$('header').addClass('d-flex').removeClass('d-none');
    }, []);

    return(
        <div className="d-flex justify-content-center">
            <div className="flex-fill" style={{maxWidth: '700px'}}>
                <MinChatUiProvider theme="#6ea9d7">
                    <MainContainer style={{height: '100vh'}}>
                        <MessageContainer>
                            <MessageHeader onBack={()=>navigate(-1)} lastActive >
                                <div className="w-100 text-start ps-5">
                                    <span>{messageToName}</span>
                                </div>
                            </MessageHeader>
                            <MessageList
                                currentUserId={user.id}
                                messages={[
                                    ...messages.sort((a, b)=>new Date(a.attributes.date) - new Date(b.attributes.date)).map((msg)=>({
                                        text: msg.attributes.message, 
                                        user: {
                                            id: msg.attributes.user.id,
                                            name: isCommunity ? `${msg.attributes.user.attributes.firstName} ${msg.attributes.user.attributes.lastName}`.trim() : '',
                                        }
                                    }))
                                ]}
                            />
                            <MessageInput onSendMessage={sendMessage} showAttachButton={false} />
                        </MessageContainer>
                    </MainContainer>
                </MinChatUiProvider>
            </div>
        </div>
    )
}