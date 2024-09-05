import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";
import { useEffect, useState } from "react";
import { api } from "../request/Api";
import { useAuth } from "../provider/AuthProvider";
import { BiSolidMessageRoundedAdd } from "react-icons/bi";
import { SearchCommunitiesOrMembersToMessageOverlay } from "../components/SearchCommunitiesOrMembersToMessageOverlay";

export const Messangers = () =>{
    const { user } = useAuth();

    const [messangers, setMessangers] = useState([]);
    const [isSearchMsgOpen, setIsSearchMsgOpen] = useState(false);

    const navigate = useNavigate();

    const navigateTo = (messagner) =>{
        if(messagner.type === 'community') return navigate(routes.susu().nested().communityMessages(messagner.id));
        navigate(routes.susu().nested().messages(messagner.id));
    }

    useEffect(()=>{
        api.message.messangers(user.id).then((response)=>{
            setMessangers(response.data.data);
        }).catch((error)=>{

        });
    }, []);

    return(
        <div className="container">
            <div className="vh-100 overflow-auto mx-auto" style={{maxWidth: '800px'}}>
                <div className="d-flex justify-content-end py-3">
                    <button onClick={()=>setIsSearchMsgOpen(true)} className="btn btn-light"><BiSolidMessageRoundedAdd/> Search Messages</button>
                </div>
                {
                    messangers.length?
                    messangers.map((messanger, key)=>(
                        <button onClick={()=>navigateTo(messanger.attributes.user)} className="btn bg-light d-flex align-items-center my-3 w-100 text-start" key={key}>
                            <div>
                                <FaUser className="display-5"/>
                            </div>
                            <div className="w-100">
                                <div className="d-flex w-100">
                                    <div className="fw-bold text-truncate w-100">{messanger.attributes.user.attributes.name}{messanger.attributes.user.attributes.firstName} {messanger.attributes.user.attributes.lastName}</div>
                                    <div className="small me-2 text-nowrap">{messanger.attributes.latestDate}</div>
                                </div>
                                <div className="d-flex w-100">
                                    <div className="small text-truncate w-100">{messanger.attributes.latestMessage}</div>
                                    {parseInt(messanger.attributes.quantity) ? <div className="badge bg-success">{messanger.attributes.quantity}</div> : null}
                                </div>
                            </div>
                        </button>
                    )):
                    null
                }
            </div>
            <SearchCommunitiesOrMembersToMessageOverlay
                isOpen={isSearchMsgOpen} 
                onClose={()=>setIsSearchMsgOpen(false)}
            />
        </div>
    )
}