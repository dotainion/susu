import { useEffect, useRef, useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import $ from "jquery";
import { api } from "../request/Api";
import { useAuth } from "../provider/AuthProvider";
import { ParseError } from "../utils/ParseError";

export const Notifications = () =>{
    const { user } = useAuth();

    const [notififications, setNotififications] = useState([]);

    useEffect(()=>{
        api.invite.listByMember(user.id).then((response)=>{
            setNotififications(response.data.data);
        }).catch((error)=>{
            console.error(error);
        });
    }, []);

    return(
        <div className="position-absolute top-0 end-0">
            {notififications.map((notification)=>(
                <Notification info={notification} key={notification.id}/>
            ))}
        </div>
    )
}

const Notification = ({info}) =>{
    const { user } = useAuth();

    const [messages, setMessages] = useState();
    const [errors, setErrors] = useState();
    const [isVisible, setIsVisible] = useState(true);

    const onTemptIgnore = () =>{
        setIsVisible(false);
    }

    const onAccepted = () =>{
        setErrors(null);
        const apiCall = info.attributes.isSusu
            ? api.susu.join(info.attributes.targetId, user.id)
            : api.community.join(info.attributes.targetId, user.id);

        apiCall.then((response)=>{
            removeInvite();
            setIsVisible(false);
        }).catch((error)=>{
            setErrors(new ParseError().message(error));
        });
    }

    const onReject = () =>{
        setErrors(null);
        api.invite.delete(info.id).then((response)=>{
            setIsVisible(false);
        }).catch((error)=>{
            setErrors(new ParseError().message(error));
        });
    }

    const removeInvite = () =>{
        onReject();
    }

    useEffect(()=>{
        if(info.attributes.isSusu){
            setMessages(`You were invited to join susu under community: ${info.attributes.community.attributes.name}`);
        }else{
            setMessages(`You were invited to join community: ${info.attributes.community.attributes.name}`);
        }
    }, [info]);

    if (!isVisible) return null;

    return(
        <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
                <IoMdNotifications className="text-danger fs-5 rounded mr-2" />
                <strong className="mr-auto">Notifification</strong>
                <small>11 mins ago</small>
                <button onClick={onTemptIgnore} type="button" className="ml-2 mb-1 btn-close"></button>
            </div>
            <div className="toast-body">
                <div className="d-flex align-items-center">
                    <div className="w-100">{messages}</div>
                    <button onClick={onReject} className="btn btn-sm btn-danger py-0 shadow-none me-1">Reject</button>
                    <button onClick={onAccepted} className="btn btn-sm btn-success py-0 shadow-none">Join</button>
                </div>
                {errors ? <div className="text-danger small">{errors}</div> : null}
            </div>
        </div>
    )
}