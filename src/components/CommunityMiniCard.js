import { useEffect, useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import { api } from "../request/Api";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";

export const CommunityMiniCard = ({community}) =>{
    const { user } = useAuth();

    const [isJoined, setIsJoined] = useState(false);

    const navigate = useNavigate();

    const joinCommunity = (e) =>{
        e.stopPropagation();
        api.community.join(community.id, user.id).then((response)=>{
            setIsJoined(true);
        }).catch((error)=>{

        });
    }

    useEffect(()=>{
        if(community.attributes.members?.length){
            const findMe = community.attributes.members.find((member)=>member.id === user.id);
            if(!findMe) setIsJoined(true);
        }
    }, [community]);

    return(
        <div className="col-12 col-xl-3 col-lg-4 col-md-6 p-1">
            <div onClick={()=>navigate(routes.susu().nested().community(community.id))} className="card position-relative h-100 m-1">
                <div className="card-body">
                    <div className="d-flex">
                        <img className="card-img-sub" src="https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=" alt="" />
                        <div className="ms-2 ps-3 border-start">
                            <div className="mb-2">{community.attributes.name}</div>
                            <div className="mb-2">Members <b>{community.attributes.members?.length}</b></div>
                            {isJoined ? <button onClick={joinCommunity} className="btn btn-sm shadow-sm border-0 px-4">Join</button> : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}