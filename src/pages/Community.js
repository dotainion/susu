import { useLocation, useNavigate, useParams } from "react-router-dom";
import { api } from "../request/Api";
import { useEffect, useLayoutEffect, useState } from "react";
import { routes } from "../routes/Routes";
import { ParseError } from "../utils/ParseError";
import { ShareSocialMediaOverlay } from "../components/ShareSocialMediaOverlay";
import { Loader } from "../components/Loader";
import { FaCreditCard } from "react-icons/fa";
import { utils } from "../utils/Utils";
import { GroupPrivacyCards } from "../components/GroupPrivacyCards";
import { MdOutlineManageHistory } from "react-icons/md";
import { CommunityHeader } from "../components/CommunityHeader";
import { PageHeader } from "../layout/PageHeader";
import { useLayout } from "../layout/Layout";
import { useAuth } from "../provider/AuthProvider";
import { CommunityFeeds } from "../components/CommunityFeeds";

export const Community = () =>{
    const { user } = useAuth();
    const { setParams, setLayoutParams } = useLayout();

    const [community, setCommunity] = useState();
    const [members, setMembers] = useState([]);
    const [errors , setErrors] = useState();
    const [openCommunityInvite , setOpenCommunityInvite] = useState(false);
    const [loading , setLoading] = useState(true);

    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const remove = () =>{
        setErrors(null);
        const data = {
            ...community.attributes,
            communityId: community.id,
            hide: true
        };
        api.community.delete(data).then((response)=>{
            navigate(routes.susu().nested().ownerCommunities());
        }).catch((error)=>{
            setErrors(new ParseError().message(error));
        });
    }
    
    const builtInShare = () =>{
        const baseUrl = window.location.href.split('#')[0];
        const url = `${baseUrl}/${routes.invited()}?${encodeURIComponent('communityId')}=${encodeURIComponent(params.communityId)}`;
        utils.share.url(url).then(()=>{
            
        }).catch(()=>{

        });
    }

    useLayoutEffect(() => {
        setParams({communityId: params.communityId});
        return () => setLayoutParams({});
    }, []);

    useEffect(() => {
        let communityLoading = true;
        let membersLoading = true;
        api.community.community(params.communityId).then((response)=>{
            setCommunity(response.data.data[0]);
        }).catch((error)=>{
            //setCommunity(null);
        }).finally(()=>{
            communityLoading = false;
            if(!communityLoading && !membersLoading){
                setLoading(false);
            }
        });
        api.user.byCommunity(params.communityId).then((response)=>{
            setMembers(response.data.data);
        }).catch((error)=>{
            //setMembers([]);
        }).finally(()=>{
            membersLoading = false;
            if(!communityLoading && !membersLoading){
                setLoading(false);
            }
        });
    }, [location]);

    if(loading) return <Loader show />;

    if(!community || community.attributes.creatorId !== user.id){
        return(
            <div className="container my-5">
                <div className="alert alert-danger h4">You are not authorize to view this page</div>
            </div>
        )
    }
    
    return(
        <div className="container pt-3">
            <CommunityHeader community={community} members={members}/>

            <hr></hr>

            <div className="d-flex flex-md-row flex-column gap-3 mt-3">
                <div className="w-75 w-md-100 px-0">
                    <div className="d-block d-sm-flex gap-3">
                        <div className="card border-0 cursor-defualt overflow-hidden w-100 px-0">
                            <div className="d-flex flex-column card-body bg-transparent">
                                <div className="d-flex gap-3 mb-auto">
                                    <div className="w-100">
                                        <div className="h5">Set up credit card payment</div>
                                        <p className="small">Easily set up your community to receive card payments, configure payment details, and manage your account settings</p>
                                    </div>
                                    <div>
                                        <FaCreditCard className="text-primary display-5"/>
                                    </div>
                                </div>
                                <div>
                                    <button className="btn btn-sm btn-primary" disabled>Set up card payment</button>
                                </div>
                            </div>
                        </div>

                        <div className="card border-0 cursor-defualt overflow-hidden w-100 px-0">
                            <div className="d-flex flex-column card-body bg-transparent">
                                <div className="d-flex gap-3 mb-auto">
                                    <div className="w-100">
                                        <div className="h5">Manage susu</div>
                                        <p className="small">Easily track your contributions, update your payment details, and view your group's progress.</p>
                                    </div>
                                    <div>
                                        <MdOutlineManageHistory className="text-primary display-5"/>
                                    </div>
                                </div>
                                <div>
                                    <button onClick={()=>navigate(routes.susu().nested().susu(params.communityId))} className="btn btn-sm btn-primary">Manage your susu</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <GroupPrivacyCards community={community} onPrivacyChange={setCommunity} />                    
                </div>
                <div className="w-25 w-md-100 w-sm-100 px-0">
                    <div className="d-flex flex-column gap-3">
                        <div className="card border-0 cursor-defualt overflow-hidden w-100">
                            <div className="card-body bg-transparent">
                                <div className="h5">About</div>
                                <div className="">{community.attributes.description}</div>
                            </div>
                        </div>

                        <div className="card border-0 cursor-defualt overflow-hidden w-100">
                            <div className="card-body bg-transparent">
                                <div className="h5">Members<span className="ms-2 small badge bg-primary">{members.length}</span></div>
                                <div className="overflow-auto" style={{height: '150px'}}>
                                    {
                                        members.length ?
                                        members.map((member, key)=>(
                                            <div className="d-flex align-items-center mb-2" key={key}>
                                                <div className="d-flex align-items-center justify-content-center rounded-circle bg-primary small" style={{width: '20px', height: '20px', minWidth: '20px', minHeight: '20px'}}>
                                                    <small className="text-light">{`${member.attributes.firstName}${member.attributes.lastName}`.trim()?.[0]}</small>
                                                </div>
                                                {member.id === user.id ? (
                                                    <div className="text-truncate ms-2">Me</div>
                                                ) : (
                                                    <div className="text-truncate ms-2">{member.attributes.firstName} {member.attributes.lastName}</div>
                                                )}
                                            </div>
                                        )) :
                                        <div className="d-flex align-items-center justify-content-center w-100 h-100">
                                            <div className="text-center">
                                                <div className="fw-bold small">No members are available yet</div>
                                                <div className="small mt-1 mb-3 text-primary">You can invite a member or share on social media platforms</div>
                                                <div className="dropdown">
                                                    <button className="btn btn-sm btn-primary" type="button" data-bs-toggle="dropdown" aria-expanded="false">Inviate or share</button>
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <li><a onClick={()=>setOpenCommunityInvite(true)} className="dropdown-item text-primary" href="#">Invite a member</a></li>
                                                        <li><a onClick={builtInShare} className="dropdown-item text-primary" href="#">Share on social media</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div className={`d-flex ${members.length ? '' : 'invisible'} justify-content-between mt-3`}>
                                    <a onClick={()=>navigate(routes.susu().nested().communityMembers(params.communityId))} className="link-primary text-decoration-none lh-1 pointer">Remove a member</a>
                                    <a onClick={()=>setOpenCommunityInvite(true)} className="link-primary text-decoration-none lh-1 pointer">Add member</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr></hr>

            <div className="striped-list mb-5">
                <div className="py-3 px-1">
                    <button onClick={()=>navigate(routes.susu().nested().communityMembers(params.communityId))} className="btn btn-sm btn-danger m-1">Remove a members</button>
                    <div className="small px-1">Once a member is removed from the community, a request may be required to reinstate their participation.</div>
                </div>
                <div className="py-3 px-1">
                    <div className="dropdown">
                        <button className="btn btn-sm btn-danger m-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">Delete Community</button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li><a onClick={remove} className="dropdown-item text-danger" href="#">Confirm Delete</a></li>
                        </ul>
                    </div>
                    <div className="small px-1">Once a community is deleted, this action is irreversible. Please ensure you are certain before proceeding.</div>
                </div>
            </div>

            <CommunityFeeds community={community} />

            {params.communityId && (
                <ShareSocialMediaOverlay
                    show={openCommunityInvite}
                    onClose={()=>setOpenCommunityInvite(false)}
                    referenceId={params.communityId}
                    isSusu={false}
                    membersOnly={true}
                />
            )}
        </div>
    )
}