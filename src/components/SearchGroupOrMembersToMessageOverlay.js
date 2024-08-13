import { useEffect, useRef, useState } from "react"
import { FaCheck, FaUserCircle } from "react-icons/fa";
import $ from "jquery";
import { api } from "../request/Api";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";

export const SearchGroupOrMembersToMessageOverlay = ({isOpen, onClose}) =>{
    const [messagners, setMessagners] = useState([]);

    const navigate = useNavigate();

    const timeoutRef = useRef();

    const searchMembers = (e) =>{
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            api.message.searchMessagners(e.target.value).then((response)=>{
                setMessagners(response.data.data);
            }).catch((error)=>{
                setMessagners([]);
            });
        }, 500);
    }

    const navigateTo = (messagner) =>{
        if(messagner.type === 'group') return navigate(routes.susu().nested().groupMessages(messagner.id));
        navigate(routes.susu().nested().messages(messagner.id));
    }

    useEffect(()=>{
        
    }, []);

    if(!isOpen) return null;

    return(
        <div onClick={onClose} className="position-fixed top-0 start-0 bg-light w-100 vh-100" style={{zIndex: '99999999999'}}>
            <div className="w-100 h-100 d-flex align-items-start justify-content-center">
                <div onClick={(e)=>e.stopPropagation()} className="d-flex flex-column select-members-overlay px-2 my-2">
                    <div className="bg-white p-3 rounded-top-4">
                        <div className="fw-bold">Search members or goups</div>
                        <input onChange={searchMembers} className="form-control shadow-none" type="text" placeholder="Search members..."/>
                        <div className="small"><small>Click on a member or group to send a message</small></div>
                    </div>
                    <div className="bg-white py-3 px-1 rounded-bottom-4 shadow-sm overflow-y-auto overflow-x-hidden">
                        {messagners.map((member, key)=>(
                            <button onClick={()=>navigateTo(member)} className="btn bg-light d-block shadow-none text-start my-1 border-0 w-100" key={key}>
                                <label className="d-flex align-items-center pointer">
                                    <div className="position-relative me-2">
                                        <FaUserCircle className="display-5"/>
                                    </div>
                                    <div className="w-100">
                                        <div className="text-truncate">{member.attributes.name || ''}{member.attributes.firstName} {member.attributes.lastName}</div>
                                        <div className="small"><small>{member.type.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</small></div>
                                    </div>
                                </label>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
