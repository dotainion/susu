import { useLocation, useNavigate, useParams } from "react-router-dom";
import { api } from "../request/Api";
import { routes } from "../routes/Routes";
import { IoIosAdd } from "react-icons/io";
import { IoMdShareAlt } from "react-icons/io";
import { useAuth } from "../provider/AuthProvider";
import { useEffect, useState } from "react";
import { ParseError } from "../utils/ParseError";
import { utils } from "../utils/Utils";
import { ShareSocialMediaOverlay } from "./ShareSocialMediaOverlay";

export const CommunityHeader = ({community, members}) =>{
    const { user } = useAuth();

    const [errors , setErrors] = useState();
    const [openInvite , setOpenInvite] = useState(false);

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

    useEffect(() => {

    }, []);

    return(
        <div className="d-flex flex-wrap gap-3">
            <div className="card bg-transparent cursor-defualt border overflow-hidden col-12 px-0">
                <div className="card-body bg-transparent">
                    <div className="mb-3">
                        {
                            !community || community.attributes.owner.id !== user.id
                                ? <div className="fs-3 mb-3">{community.attributes.name}</div>
                                : <input className="form-control border-0 bg-transparent px-0 fs-3 mb-3" onChange={changeCommunityName} defaultValue={community.attributes.name}/>
                        }
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
                            <a onClick={()=>navigate(routes.susu().nested().associateCommunities())} className="link-primary hover-decoration-underline pointer">Associated Communities</a>
                        </div>
                        <div className="d-flex flex-md-row flex-column gap-2">
                            <button onClick={()=>setOpenInvite(true)} className="btn btn-sm btn-outline-primary"><IoIosAdd/>Invite members</button>
                            <button onClick={share} className="btn bg-transparent border-0 shadow-none text-primary text-nowrap p-0"><IoMdShareAlt className="fs-3"/><span className="d-inline-block d-md-none">Share</span></button>
                        </div>
                    </div>
                    <div className="d-flex flex-wrap gap-1 px-0 mt-2 border-top border-default pt-2">
                        {/*All this dashbords button are just for style an may need to change or remove*/}
                        <button className="btn btn-sm bg-sec rounded-0" disabled>Operational Dashboard</button>
                        <button className="btn btn-sm bg-sec rounded-0" disabled>Strategic Dashboard</button>
                        <button className="btn btn-sm bg-sec rounded-0" disabled>Analytical Dashboard</button>
                        <button className="btn btn-sm bg-sec rounded-0" disabled>Financial Dashboard</button>
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