import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";
import { useEffect, useState } from "react";
import { api } from "../request/Api";
import { useAuth } from "../provider/AuthProvider";
import { BiSolidMessageRoundedAdd } from "react-icons/bi";
import { SearchCommunitiesOrMembersToMessageOverlay } from "../components/SearchCommunitiesOrMembersToMessageOverlay";
import { mockData } from "../contents/MockData";
import { FaCircle } from "react-icons/fa";
import img from "../images/group-bg-profile.png";

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
        if(process.env.NODE_ENV === 'development'){
            setMessangers(mockData.messangers());
        }
    }, []);

    return(
        <div className="container">
            <div className="mx-auto" style={{maxWidth: '800px'}}>
                <div className="d-flex justify-content-end my-3 px-2 position-fixed">
                    <button onClick={()=>setIsSearchMsgOpen(true)} className="btn btn-light rounded-pill px-3 border shadow-sm"><BiSolidMessageRoundedAdd/> Search Messages</button>
                </div>
                <div className="pt-5">
                    <div className="pt-4">
                        {
                            messangers.length?
                            messangers.map((messanger, key)=>(
                                <button onClick={()=>navigateTo(messanger.attributes.user)} className="btn bg-light border d-flex align-items-center gap-3 my-2 shadow-none w-100 text-dark text-start" key={key}>
                                    <div className="rounded-circle overflow-hidden" style={{minWidth: '50px', minHeight: '50px', maxWidth: '50px', maxHeight: '50px'}}>
                                        <img src={img} className="w-100 h-100" alt=""/>
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
                </div>
            </div>
            <SearchCommunitiesOrMembersToMessageOverlay
                isOpen={isSearchMsgOpen} 
                onClose={()=>setIsSearchMsgOpen(false)}
            />
        </div>
    )
}