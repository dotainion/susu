import { useEffect, useRef, useState } from "react";
import { api } from "../request/Api";
import { useParams } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

export const ViewGroup = () =>{
    const { user } = useAuth();

    const [group, setGroup] = useState();
    const [isJoined, setIsJoined] = useState(false);

    const params = useParams();

    const join = () =>{
        if(!params.groupId) return console.error('Group not found.');
        api.group.join(params.groupId, user.id).then((response)=>{
            setIsJoined(true);
        }).catch((error)=>{

        });
    }

    useEffect(() => {
        if(!params.groupId) return;
        api.group.group(params.groupId).then((response)=>{
            const currentGroup = response.data.data[0];
            const findMe = currentGroup.attributes.members.find((member)=>member.id === user.id);
            if(!findMe) setIsJoined(true);
            setGroup(currentGroup);
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
                    ?<div className="striped-list text-center mb-3">
                        <div className="px-2">
                            <button onClick={join} className="btn px-4">Join Group</button>
                        </div>
                    </div> 
                    :null
            }
            {
                group ?
                <div className="">
                    <small className="fw-bold">Group Name</small>
                    <div className="mb-3" type="text">{group.attributes.name}</div>
                    <hr className="border-light"></hr>
                    <small className="fw-bold">Contribution Amount</small>
                    <div className="mb-3">{group.attributes.contribution}</div>
                    <hr className="border-light"></hr>
                    <small className="fw-bold">Description</small>
                    <div className="mb-3">{group.attributes.description}</div>
                    <hr className="border-light"></hr>
                    <small className="fw-bold">Duration Cycle</small>
                    <div className="mb-3">{group.attributes.cycle}</div>
                    <hr className="border-light"></hr>
                    <small className="fw-bold">Payout Date</small>
                    <div className="">{group.attributes.payoutDate}</div>
                    <hr className="border-light"></hr>
                    <small className="fw-bold">Members</small>
                    <div className="">50024</div>
                </div>
                : 
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }
        </div>
    )
}