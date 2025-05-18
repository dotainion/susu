import React, { Fragment, useLayoutEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import { api } from "../request/Api";
import { useAuth } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";
import { mockData } from "../contents/MockData";
import img from "../images/group-bg-profile.png";
import $ from "jquery";

export const NotificationAlert = ({className}) =>{
    const { user } = useAuth();

    const [show, setShow] = useState(false);
    const [messages, setMessages] = useState([]);
    const [notifications, setNotifications] = useState([]);

    const navigate = useNavigate();

    const headerRef = useRef([]);

    function getLatestMessagesPerUser(unseenMessages) {
        const latestMessagesMap = new Map();
        unseenMessages.forEach(message => {
            const fromId = message.attributes.fromId;
            const currentDate = new Date(message.attributes.date);
            if (!latestMessagesMap.has(fromId)) latestMessagesMap.set(fromId, message);
            else {
                const existingMessage = latestMessagesMap.get(fromId);
                const existingDate = new Date(existingMessage.attributes.date);
                if (currentDate > existingDate) latestMessagesMap.set(fromId, message);
            }
        });
        return Array.from(latestMessagesMap.values());
    }

    useLayoutEffect(()=>{
        setNotifications(getLatestMessagesPerUser(messages).map((msg)=>({
            title: 'message from:',
            info: `${msg.attributes.user.attributes.firstName} ${msg.attributes.user.attributes.lastName}`,
            description: msg.attributes.message,
            action: ()=>{
                setShow(false);
                const navigationRoutes = msg.attributes.fromCommunity
                    ? routes.susu().nested().communityMessages(msg.attributes.toId)
                    : routes.susu().nested().messages(msg.attributes.user.id);
                navigate(navigationRoutes);
            }
        })));
        headerRef.current = $('header');
    }, [messages]);

    useLayoutEffect(()=>{
        api.message.unSeenMessages(user.id).then((response)=>{
            setMessages(response.data.data);
        }).catch((error)=>{

        });
        $(window).on('click', ()=>setShow(false));
        if(process.env.NODE_ENV === 'development'){
            setMessages(mockData.messages());
        }
    }, []);

    return(
        <span onClick={(e)=>{setShow(!show); e.stopPropagation();}} className={`position-relative user-select-none pointer ${className || ''}`} style={{zIndex: 99}}>
            {!!(headerRef.current.length && notifications.length > 0) && ReactDOM.createPortal(
                <Fragment>
                    <span 
                        className="position-absolute rounded-pill badge bg-danger text-white small top-0 end-0 mt-2 user-select-none" 
                        style={{zIndex: 9}}
                    >{notifications.length > 99 ? '99+' : notifications.length}</span>
                    {show && (
                        <div className="position-absolute top-0 end-0 mt-5 me-3 rounded-2 shadow-sm border overflow-auto user-select-none" style={{zIndex: 9, minWidth: '300px', maxHeight: '80vh'}}>
                            {notifications.map((notice, key)=>(
                                <button 
                                    onClick={notice.action} 
                                    className="d-flex gap-3 btn btn-light d-block text-start w-100 rounded-0 shadow-none border-0" 
                                    key={key}
                                >
                                    <img className="rounded-circle" src={img} alt="" style={{minWidth: '50px', minHeight: '50px', maxWidth: '50px', maxHeight: '50px'}} />
                                    <div className="flex-fill">
                                        <div className="small fw-semibold">{notice.title}</div>
                                        <div>{notice.info}</div>
                                        <div className="text-muted">{notice.description}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </Fragment>,
                headerRef.current.get(0)
            )}
            <IoMdNotificationsOutline className="text-dark fs-4" />
        </span>
    )
}