import { useEffect, useRef, useState } from "react";
import { api } from "../request/Api";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { CgNametag } from "react-icons/cg";
import { GiPayMoney } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { HiMiniUsers } from "react-icons/hi2";
import { MdDescription } from "react-icons/md";
import { RiRecycleFill } from "react-icons/ri";
import { Loader } from "../components/Loader";
import { routes } from "../routes/Routes";

export const ViewCommunity = () =>{
    const { user } = useAuth();

    const [susu, setSusu] = useState();
    const [community, setCommunity] = useState();
    const [isJoined, setIsJoined] = useState(false);
    const [isJoinedSusu, setIsJoinedSusu] = useState(false);

    const params = useParams();
    const navigate = useNavigate();

    const join = () =>{
        api.community.join(params.communityId, user.id).then((response)=>{
            setIsJoined(true);
        }).catch((error)=>{

        });
    }

    const joinSusu = () =>{
        api.susu.join(params.communityId, user.id).then((response)=>{
            setIsJoinedSusu(true);
        }).catch((error)=>{

        });
    }

    const findMe = (response) =>{
        const currentCommunity = response.data.data[0];
        return currentCommunity.attributes.members.find((member)=>member.id === user.id);
    }

    useEffect(() => {
        api.community.community(params.communityId).then((response)=>{
            if(findMe(response)) setIsJoined(true);
            setCommunity(response.data.data[0]);
        }).catch((error)=>{

        });
        api.susu.active(params.communityId).then((response)=>{
            if(findMe(response)) setIsJoinedSusu(true);
            setSusu(response.data.data[0]);
        }).catch((error)=>{

        });
    }, []);

    return(
        <div className="container">
            <div className="position-absolute h4 mx-3 my-3">Community</div>
            <div className="mb-4" style={{height: '30vh'}}>
                <img className="w-100 h-100" src="https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=" alt="" />
            </div>
            <hr className="my-5"></hr>
           { 
                isJoined  
                    ? <div className="mb-3">
                        {
                            susu
                            ? <div className="bg-light p-3 small rounded-3">
                                {
                                    isJoinedSusu
                                    ? <div>
                                        <div className="mb-3">
                                            <div className="my-2"><GiPayMoney className="fs-4 me-2 text-brown"/>Contribution Amount: [<b>{susu.attributes.contribution}</b>]</div>
                                            <div className="my-2"><RiRecycleFill className="fs-4 me-2 text-brown"/>Cycle Duration: [<b>{susu.attributes.cycle}</b>]</div>
                                            <div className="my-2"><GiReceiveMoney className="fs-4 me-2 text-brown"/>Next Payout: [<b>None</b>]</div>
                                        </div>
                                        <button onClick={()=>navigate(routes.susu().nested().memberSusuHistory(susu.id, user.id))} className="btn btn-sm me-2">View current susu history</button>
                                        <button onClick={()=>navigate(routes.susu().nested().schedule(params.communityId))} className="btn btn-sm">Schedule</button>
                                    </div>
                                    : <div>
                                        <p className="fw-bold">We are excited to announce that a new susu will be starting soon, and you’re invited to join!</p>
                                        <div>Key Details:</div>
                                        <ul>
                                            <li>Contribution Amount: [<b>{susu.attributes.contribution}</b>]</li>
                                            <li>Cycle Duration: [<b>{susu.attributes.cycle}</b>]</li>
                                        </ul>
                                        <p>This is a great opportunity to save consistently and receive a lump sum of money at the end of each cycle. If you’re interested or have any questions, please get in touch with [Contact Person’s Name] by [Deadline Date].</p>
                                        <div>We look forward to having you on board! <button onClick={joinSusu} className="btn btn-sm">Join Susu</button></div>
                                    </div>
                                }
                            </div>
                            : null
                        }
                    </div>
                    : <div className="striped-list text-center mb-3">
                        <div className="px-2">
                            <button onClick={join} className="btn px-4">Join Community</button>
                        </div>
                    </div> 
            }
            {
                community ? 
                <div className="row- mt-4">
                    <div className="d-flex bg-light p-3 m-1 rounded-3 shadow-sm">
                        <div><CgNametag className="display-5 text-brown"/></div>
                        <div className="ms-2">
                            <small className="fw-bold text-secondary">Community Name</small>
                            <div className="text-brown small fw-bold" type="text">{community.attributes.name}</div>
                        </div>
                    </div>
                    <div className="d-flex bg-light p-3 m-1 rounded-3 shadow-sm">
                        <div><HiMiniUsers className="display-5 text-brown"/></div>
                        <div className="ms-2">
                            <small className="fw-bold text-secondary">Members</small>
                            <div className="text-brown small fw-bold">{community.attributes.members.length || 'none'}</div>
                        </div>
                    </div>
                    <div className="d-flex bg-light p-3 m-1 rounded-3 shadow-sm">
                        <div><MdDescription className="display-5 text-brown"/></div>
                        <div className="ms-2">
                            <small className="fw-bold text-secondary">Description</small>
                            <div className="text-brown small fw-bold">{community.attributes.description}</div>
                        </div>
                    </div>
                </div>
                : 
                <Loader/>
            }
        </div>
    )
}