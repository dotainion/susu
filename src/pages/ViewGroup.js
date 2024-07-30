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

export const ViewGroup = () =>{
    const { user } = useAuth();

    const [susu, setSusu] = useState();
    const [group, setGroup] = useState();
    const [isJoined, setIsJoined] = useState(false);
    const [isJoinedSusu, setIsJoinedSusu] = useState(false);

    const params = useParams();
    const navigate = useNavigate();

    const join = () =>{
        api.group.join(params.groupId, user.id).then((response)=>{
            setIsJoined(true);
        }).catch((error)=>{

        });
    }

    const joinSusu = () =>{
        api.susu.join(params.groupId, user.id).then((response)=>{
            setIsJoinedSusu(true);
        }).catch((error)=>{

        });
    }

    const findMe = (response) =>{
        const currentGroup = response.data.data[0];
        return currentGroup.attributes.members.find((member)=>member.id === user.id);
    }

    useEffect(() => {
        api.group.group(params.groupId).then((response)=>{
            if(findMe(response)) setIsJoined(true);
            setGroup(response.data.data[0]);
        }).catch((error)=>{

        });
        api.susu.active(params.groupId).then((response)=>{
            if(findMe(response)) setIsJoinedSusu(true);
            setSusu(response.data.data[0]);
        }).catch((error)=>{

        });
    }, []);

    return(
        <div className="container">
            <div className="position-absolute h4 mx-3 my-3">Group</div>
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
                                        <ul>
                                            <li>Contribution Amount: [<b>{susu.attributes.contribution}</b>]</li>
                                            <li>Cycle Duration: [<b>{susu.attributes.cycle}</b>]</li>
                                        </ul>
                                        <button onClick={()=>navigate(routes.susu().nested().memberSusuHistory(susu.id, user.id))} className="btn btn-sm">view current susu history</button>
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
                            <button onClick={join} className="btn px-4">Join Group</button>
                        </div>
                    </div> 
            }
            {
                group ? 
                <div className="row mt-4">
                    <div className="col-12 col-md-6 col-lg-4 m-0 p-0">
                        <div className="d-flex bg-light p-3 m-1 rounded-3 shadow-sm">
                            <div><CgNametag className="display-5 text-brown"/></div>
                            <div className="ms-2">
                                <small className="fw-bold text-secondary">Group Name</small>
                                <div className="text-brown small fw-bold" type="text">{group.attributes.name}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 m-0 p-0">
                        <div className="d-flex bg-light p-3 m-1 rounded-3 shadow-sm">
                            <div><GiPayMoney className="display-5 text-brown"/></div>
                            <div className="ms-2">
                                <small className="fw-bold text-secondary">Contribution Amount</small>
                                <div className="text-brown small fw-bold">{group.attributes.contribution}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 m-0 p-0">
                        <div className="d-flex bg-light p-3 m-1 rounded-3 shadow-sm">
                            <div><RiRecycleFill className="display-5 text-brown"/></div>
                            <div className="ms-2">
                                <small className="fw-bold text-secondary">Duration Cycle</small>
                                <div className="text-brown small fw-bold">{group.attributes.cycle}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 m-0 p-0">
                        <div className="d-flex bg-light p-3 m-1 rounded-3 shadow-sm">
                            <div><GiReceiveMoney className="display-5 text-brown"/></div>
                            <div className="ms-2">
                                <small className="fw-bold text-secondary">Payout Estimated Date</small>
                                <div className="text-brown small fw-bold">{group.attributes.payoutDate}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 m-0 p-0">
                        <div className="d-flex bg-light p-3 m-1 rounded-3 shadow-sm">
                            <div><HiMiniUsers className="display-5 text-brown"/></div>
                            <div className="ms-2">
                                <small className="fw-bold text-secondary">Members</small>
                                <div className="text-brown small fw-bold">{group.attributes.members.length || 'none'}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 m-0 p-0 my-3">
                        <div className="d-flex bg-light p-3 m-1 rounded-3 shadow-sm">
                            <div><MdDescription className="display-5 text-brown"/></div>
                            <div className="ms-2">
                                <small className="fw-bold text-secondary">Description</small>
                                <div className="text-brown small fw-bold">{group.attributes.description}</div>
                            </div>
                        </div>
                    </div>
                </div>
                : 
                <Loader/>
            }
        </div>
    )
}