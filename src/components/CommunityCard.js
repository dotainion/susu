import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";
import { utils } from "../utils/Utils";
import { api } from "../request/Api";
import { useAuth } from "../provider/AuthProvider";
import { useEffect, useState } from "react";
import { MdAccessTime } from "react-icons/md";
import { IoMdShare } from "react-icons/io";
import img from "../images/group-bg-profile.png";

export const CommunityCard = ({community}) =>{
    const { user } = useAuth();

    const [isJoined, setIsJoined] = useState(false);
    const [isCreator, setIsCreator] = useState(false);
    
    const navigate = useNavigate();

    const onShare = (community, e) =>{
        e.stopPropagation();
        utils.share.url(`${routes.invited()}?communityId=${community.id}`);
    }

    const selectCommunity = (community) =>{
        if(isCreator) return navigate(routes.susu().nested().community(community.id));
        navigate(routes.susu().nested().viewCommunity(community.id));
    }

    useEffect(()=>{
        if(community.attributes.creatorId === user?.id) setIsCreator(true);
        if(community.attributes.members?.length){
            if(community.attributes.members.find((member)=>member.id === user?.id)) setIsJoined(true);
        }
    }, [community]);

    return(
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3 p-2">
            <div onClick={()=>selectCommunity(community)} className="card h-100 border rounded-1 small" title={`Group: ${community.attributes.name}`}>
                <div className="position-relative">
                    <img src={img} className="card-img-top" alt={community.attributes.name} draggable={false} />
                    <button 
                        onClick={(e)=>onShare(community, e)} 
                        className="position-absolute top-0 start-0 btn bg-transparent shadow-none p-0 m-2"
                    ><IoMdShare className="text-primary fs-5" /></button>
                    {isJoined && (
                        <span className="position-absolute bottom-0 start-0 badge bg-success m-2">{isCreator ? 'Owner' : 'Joined'}</span>
                    )}
                </div>
                <div className="card-body">
                    <h5 className="card-title fw-semibold">{community.attributes.name}</h5>
                    <p className="card-text text-muted text-truncate small">{community.attributes.description}</p>

                    <div className="mb-2">
                        {['Monthly', 'Payout', 'Family', 'Friends'].map((tag, key) => (
                            <span className="badge bg-secondary me-1" key={key}>{tag}</span>
                        ))}
                    </div>

                    <div className="d-flex justify-content-between small text-muted">
                        <span><i className="bi bi-people"></i> {utils.num.uiFormat(community.attributes.members?.length)} Members</span>
                        <span><i className="bi bi-chat-left-text"></i>💬 {utils.num.uiFormat(0)} Comments</span>
                    </div>
                    <div className="d-flex align-items-center gap-3 small text-muted mt-1">
                        <span><i className="bi bi-hand-thumbs-up"></i>👍 {utils.num.uiFormat(community.attributes.likes.filter((l)=>l.attributes.like).length)}</span>
                        <span><i className="bi bi-hand-thumbs-down"></i>👎 {utils.num.uiFormat(community.attributes.likes.filter((l)=>!l.attributes.like).length)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}