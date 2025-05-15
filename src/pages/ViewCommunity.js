import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
import { useLayout } from "../layout/Layout";
import { PricingPlans } from "../components/PricingPlans";
import { ProgressBar } from "../components/ProgressBar";
import { FaQuestionCircle, FaEnvelope } from "react-icons/fa";
import { utils } from "../utils/Utils";
import { ShareSocialMediaOverlay } from "../components/ShareSocialMediaOverlay";
import { SusuCard } from "../components/SusuCard";
import { CommunityFeeds } from "../components/CommunityFeeds";
import { mockData } from "../contents/MockData";
import { Dropdown } from "../widgets/Dropdown";
import { MdOutlineCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import img from "../images/group-bg-profile.png";
import { TiMessages } from "react-icons/ti";

export const ViewCommunity = () =>{
    const { user } = useAuth();
    const { setParams, setLayoutParams } = useLayout();

    const [susu, setSusu] = useState();
    const [susuList, setSusuList] = useState([]);
    const [community, setCommunity] = useState();
    const [members, setMembers] = useState([]);
    const [isJoined, setIsJoined] = useState(false);
    const [isJoinedSusu, setIsJoinedSusu] = useState(false);
    const [openInvite, setOpenInvite] = useState(false);
    const [loading, setLoading] = useState(true);

    const params = useParams();
    const navigate = useNavigate();

    const join = () =>{
        api.community.join(params.communityId, user.id).then((response)=>{
            setIsJoined(true);
        }).catch((error)=>{

        });
    }

    const leave = () =>{
        api.community.unlink(params.communityId, user.id).then((response)=>{
            setIsJoined(false);
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

    useLayoutEffect(() => {
        setParams({communityId: params.communityId});
        return () => setLayoutParams({});
    }, []);

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
        api.susu.list(params.communityId).then((response)=>{
            if(findMe(response)) setIsJoinedSusu(true);
            setSusu(response.data.data.find((s)=>s.attributes.active));
            setSusuList(response.data.data);
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
        
        if(process.env.NODE_ENV === 'development'){
            setCommunity(mockData.community());
            setMembers(mockData.members());
        }
    }, []);

    if(loading) return <Loader keepAlive center/>

    return(
        <div className="container mb-4">
            <div className="card border-0 shadow-sm p-4 mb-4 rounded-4 mt-3">
                <div className="d-block d-md-flex gap-3">
                    <div className="text-center rounded-4 border p-3" style={{minWidth: '300px'}}>
                        <div className="position-relative bg-primary rounded-circle m-auto" style={{width: '150px', height: '150px'}}>
                            <img className="rounded-circle w-100 h-100" src={img} alt="Susu Group" />
                            <div className="position-absolute translate-middle-x start-50 badge bg-primary" style={{top: '90%'}}>{community.attributes.privacy}</div>
                        </div>
                        <div className="fw-bold h4 mt-4">{community.attributes.name}</div>
                        {isJoined
                            ? <Dropdown 
                                chevronOff
                                className="btn btn-sm btn-danger rounded-pill px-4"
                                options={[{
                                    className: "bg-danger text-white text-center",
                                    title: <span><FaCheck className="me-2"/>Confirm</span>, 
                                    onClick: ()=>leave() 
                                }]}
                            ><MdOutlineCancel/> Leave Group</Dropdown>
                            : <button onClick={join} className="btn btn-sm btn-primary rounded-pill px-4"><MdGroups className="me-2"/>Join Group</button>
                        }
                        <hr></hr>
                        <button onClick={()=>navigate(routes.susu().nested().communityMessages(community.id))} className="btn btn-sm btn-primary rounded-pill px-4"><TiMessages className="me-2" />Group Messages</button>
                    </div>
                    <div className="w-100">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
                            <div>
                                <h3 className="fw-bold mb-1">{community.attributes.name} Group</h3>
                                <p className="text-muted mb-2">{community.attributes.description}</p>
                                <span className="badge bg-primary">{community.attributes.privacy} Group</span>
                            </div>
                            <div className="text-end mt-3 mt-md-0">
                                <button onClick={()=>setOpenInvite(true)} className="btn btn-sm btn-outline-primary rounded-pill px-3">Invite Members</button>
                            </div>
                        </div>

                        <div className="p-3">
                            <div className="row bg-light shadow-sm rounded-4 text-secondary p-2">
                                <div className="col-4 mb-3">
                                    <small className="text-uppercase fw-semibold">Members</small>
                                    <h6 className="fw-bold text-dark mt-1">{utils.num.uiFormat(members.length)}</h6>
                                </div>
                                <div className="col-4 mb-3">
                                    <small className="text-uppercase fw-semibold">Active Susus</small>
                                    <h6 className="fw-bold text-dark mt-1">{utils.num.uiFormat(susuList.length)}</h6>
                                </div>
                                <div className="col-4 mb-3">
                                    <small className="text-uppercase fw-semibold">Group Created</small>
                                    <h6 className="fw-bold text-dark mt-1">{utils.date.toLocalDate(community.attributes.createdDate)}</h6>
                                </div>
                            </div>
                        </div>

                        <div className="bg-light text-dark rounded-4 mt-3 p-3">
                            <h6 className="fw-bold mb-3">Group Members</h6>
                            <div className="d-flex flex-wrap gap-2">
                                {members.slice(0, 5).map((member, idx) => (
                                    <div onClick={()=>navigate(routes.susu().nested().member(member.id))} className="d-flex align-items-center border gap-2 p-2 rounded-4 bg-white" style={{minWidth: '160px', maxWidth: '160px'}} key={idx}>
                                        <div
                                            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
                                            style={{width: '30px', height: '30px', minWidth: '30px', minHeight: '30px'}}
                                        >{member.id === user.id ? 'Me' : `${member.attributes.firstName?.[0]}${member.attributes.lastName?.[0]}`.toUpperCase()}</div>
                                        <div className="overflow-hidden small" style={{minWidth: 0}}>
                                            <div className="fw-semibold text-dark text-truncate small">{member.attributes.firstName} {member.attributes.lastName}</div>
                                            <small className="text-secondary small">{member.id === user.id ? 'Admin' : 'Member'}</small>
                                        </div>
                                    </div>
                                ))}

                                {members.length > 5 && (
                                    <button
                                        onClick={()=>navigate(routes.susu().nested().communityMembers(params.communityId))}
                                        className="btn btn-light rounded-4 d-flex align-items-center justify-content-center px-4 border fw-bold py-3 small"
                                        style={{minWidth: '160px'}}
                                    ><small>+ {members.length - 5} more</small></button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-5">
                    {isJoined && (
                        <div className="">
                            {susu ? (
                                <div className="">
                                    {isJoinedSusu ? (
                                        <div>
                                            <h5 className="fw-semibold text-primary small mb-2">Actions</h5>
                                            <div className="d-flex flex-wrap gap-3 mb-2">
                                                <button onClick={() => navigate(routes.susu().nested().memberSusuHistory(susu.id, user.id))} className="btn btn-outline-primary btn-sm">View History</button>
                                                <button onClick={() => navigate(routes.susu().nested().schedule(params.communityId))} className="btn btn-outline-primary btn-sm">View Schedule</button>
                                                <button onClick={() => navigate(routes.susu().nested().payment(susu.id, params.communityId, user.id))} className="btn btn-outline-success btn-sm">Make Contribution</button>
                                                <button onClick={() => navigate(routes.susu().nested().contributors(params.communityId))} className="btn btn-outline-secondary btn-sm">Contribute for Someone</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="card shadow-sm border-0 rounded-4 p-4 mb-4">
                                            <div className="d-flex justify-content-between align-items-start mb-3">
                                                <div>
                                                    <h6 className="text-primary fw-semibold text-uppercase small mb-2">Actions</h6>
                                                    <button
                                                        onClick={() => navigate(routes.susu().nested().memberSusuHistory(susu.id, user.id))}
                                                        className="btn btn-outline-primary btn-sm"
                                                    >View History</button>
                                                </div>
                                                <span className="badge bg-info text-dark">Invitation</span>
                                            </div>

                                            <h5 className="fw-bold text-dark mb-2">You're Invited to Join the Next Susu Cycle</h5>
                                            <p className="text-muted mb-4">
                                                A new susu is forming — join a secure, reliable savings group designed for consistency and community support.
                                            </p>

                                            <div className="mb-4">
                                                <h6 className="fw-semibold text-dark mb-2">Key Details</h6>
                                                <ul className="list-unstyled text-muted mb-0">
                                                    <li className="mb-1"><strong>Contribution:</strong> ${susu.attributes.contribution}</li>
                                                    <li><strong>Cycle Duration:</strong> {susu.attributes.cycle}</li>
                                                </ul>
                                            </div>

                                            <div className="mb-4">
                                                <p className="mb-1 text-muted">
                                                    Contact the organizer directly for questions or clarifications.
                                                </p>
                                                <div className="border p-3 rounded-3 bg-light-subtle">
                                                    <strong>{susu.attributes.owner.attributes.firstName} {susu.attributes.owner.attributes.lastName}</strong>
                                                    <div className="text-muted small">
                                                        <div><strong>Email:</strong> {susu.attributes.owner.attributes.email}</div>
                                                        <div><strong>Phone:</strong> {susu.attributes.owner.attributes.phoneNumber}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="text-start">
                                                <button onClick={joinSusu} className="btn btn-primary btn-sm px-4">Join Susu</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : null}
                        </div>
                    )}
                </div>

                <CommunityFeeds community={community}/>
            </div>

            
            {susu && <SusuCard susu={susu} />}

            <div className="row g-4">
                <div className="col-md-6">
                    <div className="card border-0 shadow-sm p-4 rounded-4 h-100 bg-light">
                        <h5 className="mb-3">🎯 Get Started</h5>
                        <p className="mb-2">Ready to build trust and financial support with your community?</p>
                        <div className="bg-primary p-3 rounded-3 text-light">Start a New Susu</div>
                        <div className="btg-secondary p-3 rounded-3 mt-2">Invite New Members</div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card border-0 shadow-sm p-4 rounded-4 h-100">
                        <h5 className="mb-3">📜 Group Rules & Guidelines</h5>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">All contributions must be made by Friday 5 PM.</li>
                            <li className="list-group-item">Members must maintain respectful communication.</li>
                            <li className="list-group-item">Missed payments must be cleared before receiving payout.</li>
                            <li className="list-group-item">Payout order is determined at group formation and is fixed.</li>
                        </ul>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card border-0 shadow-sm p-4 rounded-4 h-100">
                        <h5 className="mb-3">🧾 Your Responsibilities</h5>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Make your weekly payment on time.</li>
                            <li className="list-group-item">Keep your contact and bank info updated.</li>
                            <li className="list-group-item">Report any issues to the admin ASAP.</li>
                            <li className="list-group-item">Stay active and responsive within the group.</li>
                        </ul>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card border-0 shadow-sm p-4 rounded-4 h-100">
                        <h5 className="mb-3">
                            <FaQuestionCircle className="me-2 text-info" />
                            Frequently Asked Questions
                        </h5>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <strong>What happens if I miss a payment?</strong><br />
                                Missed payments may delay your payout. You’ll receive reminders and have a 3-day grace period.
                            </li>
                            <li className="list-group-item">
                                <strong>Can I leave the group early?</strong><br />
                                Leaving early must be approved by the group admin. All unpaid dues must be cleared first.
                            </li>
                            <li className="list-group-item">
                                <strong>Is this platform secure?</strong><br />
                                Yes. We use end-to-end encryption, verified wallets, and real-time alerts to keep your contributions safe.
                            </li>
                        </ul>
                    </div>
                </div>

                {community && (
                    <div className="col-12">
                        <div className="card border-0 shadow-sm p-4 rounded-4">
                            <h5 className="mb-3">
                                <FaEnvelope className="me-2 text-primary" />
                                Need Help?
                            </h5>
                            <p>
                                If you have any questions or issues, please contact our support team at{" "}
                                <a href={`mailto:${community.attributes.owner.attributes.email}`}>{community.attributes.owner.attributes.email}</a> or chat with us live in the app.
                            </p>
                        </div>
                    </div>
                )}
            </div>
            
            <ShareSocialMediaOverlay
                show={openInvite}
                onClose={()=>setOpenInvite(false)}
                referenceId={community?.id}
                isSusu={false}
            />
        </div>
    )
}