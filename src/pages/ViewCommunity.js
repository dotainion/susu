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
import { CommunityHeader } from "../components/CommunityHeader";

export const ViewCommunity = () =>{
    const { user } = useAuth();

    const [susu, setSusu] = useState();
    const [community, setCommunity] = useState({
        id: 12,
        attributes: {
            name: 'fishing man',
            members: [],
            owner: {
                id: 114,
            }
        }
    });
    const [members, setMembers] = useState([]);
    const [isJoined, setIsJoined] = useState(false);
    const [isJoinedSusu, setIsJoinedSusu] = useState(false);
    const [loading, setLoading] = useState(true);

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
        let loadingCommunity = true;
        let loadingMembers = true;
        let loadingSusu = true;
        
        api.community.community(params.communityId).then((response)=>{
            if(findMe(response)) setIsJoined(true);
            setCommunity(response.data.data[0]);
        }).catch((error)=>{

        }).finally(()=>{
            loadingCommunity = false;
            if(!loadingMembers && !loadingCommunity && !loadingSusu) setLoading(false);
        });
        api.susu.active(params.communityId).then((response)=>{
            if(findMe(response)) setIsJoinedSusu(true);
            setSusu(response.data.data[0]);
        }).catch((error)=>{

        }).finally(()=>{
            loadingSusu = false;
            if(!loadingMembers && !loadingCommunity && !loadingSusu) setLoading(false);
        });
        api.user.byCommunity(params.communityId).then((response)=>{
            setMembers(response.data.data);
        }).catch((error)=>{
            
        }).finally(()=>{
            loadingMembers = false;
            if(!loadingMembers && !loadingCommunity && !loadingSusu) setLoading(false);
        });
    }, []);

    if(loading) return <Loader center/>

    return(
        <div className="container">
            <CommunityHeader community={community} members={members}/>

            <div className="card bg-transparent cursor-defualt border overflow-hidden w-100 mt-3">
                <div className="card-body bg-transparent">
                    <div className="h5">About</div>
                    <div className="">{community.attributes.description}</div>
                </div>
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
                                        <button onClick={()=>navigate(routes.susu().nested().schedule(params.communityId))} className="btn btn-sm me-2">Schedule</button>
                                        <button onClick={()=>navigate(routes.susu().nested().payment(susu.id, params.communityId, user.id))} className="btn btn-sm me-2">Make contribution</button>
                                        <button onClick={()=>navigate(routes.susu().nested().contributionAndPayments(params.communityId))} className="btn btn-sm me-2">Make contribution for someone</button>
                                    </div>
                                    : <div>
                                        <p className="fw-bold">We are excited to announce that a new susu will be starting soon, and you’re invited to join!</p>
                                        <div>Key Details:</div>
                                        <ul>
                                            <li>Contribution Amount: [<b>{susu.attributes.contribution}</b>]</li>
                                            <li>Cycle Duration: [<b>{susu.attributes.cycle}</b>]</li>
                                        </ul>
                                        <p>This is a great opportunity to save consistently and receive a lump sum of money at the end of each cycle. If you’re interested or have any questions, please get in touch with [{susu.attributes.owner.attributes.firstName} {susu.attributes.owner.attributes.lastName}].</p>
                                        <div><b>Email:</b> {susu.attributes.owner.attributes.email}</div>
                                        <div><b>Contact:</b> {susu.attributes.owner.attributes.phoneNumber}</div>
                                        <div className="mt-2 mb-3">We look forward to having you on board!</div>
                                        <button onClick={joinSusu} className="btn btn-sm btn-primary">Join Susu</button>
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
        </div>
    )
}