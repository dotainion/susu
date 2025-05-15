import { useLocation, useNavigate, useParams } from "react-router-dom";
import { api } from "../request/Api";
import { routes } from "../routes/Routes";
import { IoIosAdd } from "react-icons/io";
import { IoMdShareAlt } from "react-icons/io";
import { useAuth } from "../provider/AuthProvider";
import { useEffect, useRef, useState } from "react";
import { ParseError } from "../utils/ParseError";
import { utils } from "../utils/Utils";
import { ShareSocialMediaOverlay } from "./ShareSocialMediaOverlay";
import { DashboardOptionButton } from "./DashboardOptionButton";
import { MdGroups } from "react-icons/md";
import img from "../images/group-bg-profile.png";
import { RiImageEditLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { OwnerJoinSusuAlert } from "./OwnerJoinSusuAlert";
import { TiMessages } from "react-icons/ti";

export const CommunityHeader = ({community: incommingCommunity, members}) =>{
    const { user } = useAuth();

    const [errors , setErrors] = useState();
    const [openInvite , setOpenInvite] = useState(false);
    const [community , setCommunity] = useState(incommingCommunity);

    const nameRef = useRef();

    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    
    const changeCommunityName = (e) =>{
        setErrors(null);
        const data = {
            id: community.id,
            ...community.attributes,
            name: e.target.value
        }
        api.community.set(data).then((response)=>{
            setCommunity(response.data.data[0]);
        }).catch((error)=>{
            setErrors(new ParseError().message(error));
        });
    }
        
    const share = () =>{
        const baseUrl = window.location.href.split('#')[0];
        const url = `${baseUrl}/${routes.invited()}?${encodeURIComponent('communityId')}=${encodeURIComponent(params.communityId)}`;
        utils.share.url(url).then(()=>{
            
        }).catch(()=>{

        });
    }

    const focusCommunityNameInput = () =>{
        nameRef.current.focus();
    }

    return(
        <div className="d-flex flex-wrap gap-3">
            <div className="card border-0 cursor-defualt overflow-hidden col-12 px-0">
                <div className="card-body bg-transparent">
                    <div className="d-block d-md-flex gap-3">
                        <div className="text-center rounded-4 border p-3" style={{minWidth: '300px'}}>
                            <div className="position-relative bg-primary rounded-circle m-auto" style={{width: '150px', height: '150px'}}>
                                <img className="rounded-circle w-100 h-100" src={img} alt="Susu Group" draggable={false} />
                                <button className="btn bg-transparent position-absolute border-0 shadow-none top-0 badge p-0" style={{right: '15px'}}>
                                    <RiImageEditLine className="bg-primary bg-opacity-10 text-secondary fs-4"/>
                                </button>
                                <div className="position-absolute translate-middle-x start-50 badge bg-primary" style={{top: '90%'}}>{community.attributes.privacy}</div>
                            </div>
                            <div className="fw-bold h4 mt-4 mb-3">{community.attributes.name}</div>
                            <button onClick={()=>navigate(routes.susu().nested().communityMessages(community.id))} className="btn btn-sm btn-primary rounded-pill px-4"><TiMessages className="me-2" />Group Messages</button>
                        </div>
                        <div className="w-100">
                            <div className="mb-3">
                                <div className="d-flex align-items-center gap-1 mb-3" title="Edit goup name">
                                    <button onClick={focusCommunityNameInput} className="btn bg-transparent p-0 border-0 shadow-none">
                                        <FaRegEdit className="fs-5 text-secondary" />
                                    </button>
                                    <input ref={nameRef} className="form-control border-0 bg-transparent px-0 fs-3" onChange={changeCommunityName} defaultValue={community.attributes.name}/>
                                </div>
                                {errors ? <div className="alert alert-danger small border-0">{errors}</div> : null}
                                <div className="d-flex align-items-center small">
                                    <div className="text-nowrap me-2">{members.length} Members</div>
                                    {Array.from({length: members.length > 10 ? 10 : members.length}, (_, i) => i + 1).map((_, key)=>(
                                        <div className="d-flex align-items-center justify-content-center rounded-circle bg-primary small" style={{width: '15px', height: '15px', minWidth: '15px', minHeight: '15px', marginRight: '1px'}} key={key}>
                                            <small></small>
                                        </div>
                                    ))}
                                    {members.length > 10 && (
                                        <div className="d-flex" style={{marginLeft: '2px'}}>
                                            <div className="bg-primary rounded-circle" style={{padding: '2px', marginRight: '2px'}}></div>
                                            <div className="bg-primary rounded-circle" style={{padding: '2px', marginRight: '2px'}}></div>
                                            <div className="bg-primary rounded-circle" style={{padding: '2px', marginRight: '2px'}}></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="d-flex justify-content-between user-select-none">
                                <div className="d-flex flex-wrap gap-3 mb-2">
                                    <a onClick={()=>navigate(routes.susu().nested().communities())} className="link-primary hover-decoration-underline pointer">Search communities</a>
                                    <a onClick={()=>navigate(routes.susu().nested().newCommunity())} className="link-primary hover-decoration-underline pointer">Create community</a>
                                    <a onClick={()=>navigate(routes.susu().nested().associateCommunities(user.id))} className="link-primary hover-decoration-underline pointer">Associated Communities</a>
                                </div>
                                <div className="d-flex flex-md-row flex-column gap-2">
                                    <button onClick={()=>setOpenInvite(true)} className="btn btn-sm btn-outline-primary"><IoIosAdd/>Invite members</button>
                                    <button onClick={share} className="btn bg-transparent border-0 shadow-none text-primary text-nowrap p-0"><IoMdShareAlt className="fs-3"/><span className="d-inline-block d-md-none">Share</span></button>
                                </div>
                            </div>
                            <div className="d-flex flex-wrap gap-1 px-0 mt-2 border-top border-default pt-2 mb-3">
                                <DashboardOptionButton className="btn btn-sm btn-primary rounded-0"/>
                                <button className="btn btn-sm btn-primary rounded-0" disabled>Operational</button>
                                <button className="btn btn-sm btn-primary rounded-0" disabled>Strategic</button>
                                <button className="btn btn-sm btn-primary rounded-0" disabled>Analytical</button>
                                <button className="btn btn-sm btn-primary rounded-0" disabled>Financial</button>
                            </div>
                            <OwnerJoinSusuAlert />
                        </div>
                    </div>
                </div>
            </div>
            {params.communityId && (
                <ShareSocialMediaOverlay
                    show={openInvite}
                    onClose={()=>setOpenInvite(false)}
                    referenceId={params.communityId}
                    isSusu={false}
                    membersOnly={true}
                />
            )}
        </div>
    )
}