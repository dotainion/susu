import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";
import { utils } from "../utils/Utils";
import { api } from "../request/Api";
import { useAuth } from "../provider/AuthProvider";
import { useEffect, useState } from "react";
import { MdAccessTime } from "react-icons/md";
import { IoMdShare } from "react-icons/io";

export const GroupCard = ({group}) =>{
    const { user } = useAuth();

    const [isJoined, setIsJoined] = useState(false);
    const [isCreator, setIsCreator] = useState(false);
    
    const navigate = useNavigate();

    const onShare = (group, e) =>{
        e.stopPropagation();
        utils.share.url(routes.susu().nested().group(group.id));
    }

    const joinGroup = (group, e) =>{
        e.stopPropagation();
        api.group.join(group.id, user.id).then((response)=>{
            setIsJoined(true);
            selectGroup(group);
        }).catch((error)=>{

        });
    }

    const selectGroup = (group) =>{
        if(isCreator) return navigate(routes.susu().nested().group(group.id));
        navigate(routes.susu().nested().viewGroup(group.id));
    }

    useEffect(()=>{
        if(group.attributes.creatorId === user?.id) setIsCreator(true);
        if(group.attributes.members?.length){
            if(group.attributes.members.find((member)=>member.id === user?.id)) setIsJoined(true);
        }
    }, [group]);

    return(
        <div className="col-12 col-xl-3 col-lg-4 col-md-6 p-1">
            <div onClick={()=>selectGroup(group)} className="card position-relative h-100 m-1">
                <img className="card-img-top" src="https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=" alt="" />
                <div className="card-body">
                    <div>
                        <div className="fw-bold">{group.attributes.name}</div>
                        {
                            group.attributes.susu 
                                ? <div className="small lh-1">
                                    {   
                                        group.attributes.susu.attributes.pendingStart 
                                            ? <small className="text-primary">Pending susu</small> 
                                            : <small className="text-success">Susu in prgress</small>
                                    }
                                </div> 
                                : null
                        }
                    </div>
                    <div className="text-muted small my-2">{group.attributes.description}</div>
                    <div className="d-flex align-items-center small mt-2">
                        <img className="card-img-mini" src="https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=" alt="" />
                        <div>Members <b>{group.attributes.members?.length || 'none'}</b></div>
                    </div>
                    <div className="w-100 small">
                        {group.attributes.susu ? <div>Contribution Amount: ${group.attributes?.susu?.attributes?.contribution}</div> : null}
                        {group.attributes.susu ? <div className="d-flex align-items-center"><MdAccessTime /> Cycle Duration: {group.attributes.susu.attributes.cycle}</div> : null}
                        {group.attributes.susu ? <div>Payout Date:</div> : null}
                    </div>
                </div>
                {
                    isJoined 
                    ? null 
                    : <div className="card-footer d-flex justify-content-center">
                        <button onClick={(e)=>joinGroup(group, e)} className="btn btn-sm">Join Group</button>
                    </div>
                }
                <button onClick={(e)=>onShare(group, e)} className="btn bg-transparent shadow-none border-0 position-absolute top-0 end-0 p-1"><IoMdShare className="fs-4" /></button>
            </div>
        </div>
    )
}