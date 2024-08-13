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
            //setIsJoined(true);
            navigate(routes.susu().nested().viewGroup(group.id))
        }).catch((error)=>{

        });
    }

    const editGroup = (group, e) =>{
        e.stopPropagation();
        navigate(routes.susu().nested().group(group.id));
    }

    useEffect(()=>{
        if(group.attributes.creatorId === user.id) setIsCreator(true);
        if(group.attributes.members?.length){
            const findMe = group.attributes.members.find((member)=>member.id === user.id);
            if(!findMe) setIsJoined(true);
        }
    }, [group]);

    return(
        <div className="col-12 col-xl-3 col-lg-4 col-md-6 p-1">
            <div onClick={()=>navigate(routes.susu().nested().viewGroup(group.id))} className="card position-relative h-100 m-1">
                <img className="card-img-top" src="https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=" alt="" />
                <div className="card-body">
                    <div className="d-flex">
                        <img className="card-img-mini" src="https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=" alt="" />
                        <div>
                            <div className="fw-bold">{group.attributes.name}</div>
                            <div className="small text-success lh-1"><small>In prgress</small></div>
                        </div>
                    </div>
                    <div className="text-muted small my-2">{group.attributes.description}</div>
                    <div className="d-flex small mt-2">
                        <img className="card-img-mini" src="https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=" alt="" />
                        <div>Members <b>{group.attributes.members?.length || 'none'}</b></div>
                    </div>
                    <div className="w-100 small">
                        <div>Contribution Amount: ${group.attributes.contribution}</div>
                        <div className="d-flex align-items-center"><MdAccessTime /> Cycle Duration: {group.attributes.cycle}</div>
                        <div>Payout Date: {group.attributes.payoutDate}</div>
                    </div>
                </div>
                <div className="card-footer d-flex justify-content-between">
                    {isJoined ? <button onClick={(e)=>joinGroup(group, e)} className="btn btn-sm">Join Group</button> : <span></span>}
                    {isCreator ? <button onClick={(e)=>editGroup(group, e)} className="btn btn-sm text-primary">Edit Group</button> : <span></span>}
                </div>
                <button onClick={(e)=>onShare(group, e)} className="btn bg-transparent shadow-none border-0 position-absolute top-0 end-0 p-1"><IoMdShare className="fs-4" /></button>
            </div>
        </div>
    )
}