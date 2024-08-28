import { useLocation, useNavigate, useParams } from "react-router-dom";
import { api } from "../request/Api";
import { useEffect, useRef, useState } from "react";
import { routes } from "../routes/Routes";
import { CommenceSusuOverlay } from "../components/CommenceSusuOverlay";
import { ParseError } from "../utils/ParseError";

export const Group = () =>{
    const [group, setGroup] = useState();
    const [susu , setSusu] = useState();
    const [errors , setErrors] = useState();
    const [openCommenceSusu , setOpenCommenceSusu] = useState(false);

    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const nameRef = useRef();
    const descriptionRef = useRef();
    const hideRef = useRef();

    const editGroup = () =>{
        setErrors(null);
        const data = {
            id: params.groupId,
            name: nameRef.current.value,
            description: descriptionRef.current.value,
            hide: hideRef.current
        }
        api.group.set(data).then((response)=>{
            
        }).catch((error)=>{
            setErrors(new ParseError().message(error));
        });
    }

    const confirmSusu = () =>{
        setErrors(null);
        api.susu.conform(params.groupId).then((response)=>{
            setSusu(response.data.data[0]);
        }).catch((error)=>{
            setErrors(new ParseError().message(error));
        });
    }

    const cancelSusu = () =>{
        setErrors(null);
        const data = {
            ...susu.attributes,
            susuId: susu.id,
            canceled: true
        };
        api.susu.set(data).then((response)=>{
            setSusu(null);
        }).catch((error)=>{
            setErrors(new ParseError().message(error));
        });
    }

    const deleteGroup = () =>{
        setErrors(null);
        const data = {
            ...group.attributes,
            groupId: group.id,
            hide: true
        };
        api.group.delete(data).then((response)=>{
            navigate(routes.susu().nested().ownerGroups());
        }).catch((error)=>{
            setErrors(new ParseError().message(error));
        });
    }

    useEffect(() => {
        api.group.group(params.groupId).then((response)=>{
            setGroup(response.data.data[0]);
        }).catch((error)=>{
            setGroup(null);
        });
        api.susu.active(params.groupId).then((response)=>{
            setSusu(response.data.data[0]);
        }).catch((error)=>{
            setSusu(null);
        });
    }, [location]);

    useEffect(() => {
        if(!group) return;
        nameRef.current.value = group.attributes.name;
        descriptionRef.current.value = group.attributes.description;
        hideRef.current = group.attributes.hide;
    }, [group]);
    
    return(
        <div className="container">
            <div className="bg-light py-1 px-3 rounded-4 mt-2">
                <div className="h4 my-3">Group</div>
                <div onChange={editGroup} className="d-xl-flex d-block w-100">
                    <div className="me-5 mb-4">
                        <img style={{width: '200px', height: '200px'}} src="https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=" alt="" />
                    </div>
                    <div className="text-nowrap w-100">
                        <div className="d-md-flex d-block">
                            <div style={{minWidth: '200px'}}>Group Name</div>
                            <input ref={nameRef} className="form-control mb-3" placeholder="Group Name" type="text" style={{maxWidth: '500px'}}/>
                        </div>
                        <div className="d-md-flex d-block">
                            <div style={{minWidth: '200px'}}>Description</div>
                            <textarea ref={descriptionRef} className="form-control mb-3" placeholder="Description" style={{resize: 'none', maxWidth: '500px'}}/>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="my-5"></hr>
            {errors ? <div className="alert alert-danger small mx-2 border-0">{errors}</div> : null}
            <div className="striped-list">
                {
                    !susu?
                    <div className="py-3 px-1">
                        <button onClick={()=>setOpenCommenceSusu(true)} className="btn btn-sm m-1">Commence a susu</button>
                        <div className="small px-1">Begin organizing contributions, setting schedules, and achieving financial goals together.</div>
                    </div>
                    : 
                    <>
                    {
                        susu.attributes.pendingStart? 
                        <div className="py-3 px-1">
                            <button onClick={confirmSusu} className="btn btn-sm btn-success m-1">Apply & Confirm</button>
                            <button onClick={()=>navigate(routes.susu().nested().susuInvites(susu.id))} className="btn btn-sm bg-primary text-white m-1">Send Invites to group members</button>
                            <button onClick={()=>navigate(routes.susu().nested().susuMembers(params.groupId, susu.id))} className="btn btn-sm btn-danger m-1">Remove a members</button>
                            <button onClick={cancelSusu} className="btn btn-sm btn-danger m-1">Cancel Susu</button>
                            <div className="small px-1">Begin organizing contributions, setting schedules, and achieving financial goals together.</div>
                        </div>
                        : 
                        <div className="py-3 px-1">
                            <button onClick={()=>navigate(routes.susu().nested().groupSusuWallet(params.groupId, susu.id))} className="btn btn-sm bg-secondary text-white m-1">Susu Wallet</button>
                            <button onClick={()=>navigate(routes.susu().nested().groupInvites(params.groupId))} className="btn btn-sm bg-primary text-white m-1">Send Invites to group members</button>
                            <button onClick={()=>navigate(routes.susu().nested().susuMembers(params.groupId))} className="btn btn-sm btn-danger m-1">Remove a members</button>
                            <div className="small px-1">Begin organizing contributions, setting schedules, and achieving financial goals together.</div>
                        </div>
                    }
                    </>
                }
                <div className="py-3 px-1">
                    {
                        susu?.attributes?.pendingStart 
                        ? <p className="small px-1">To generate the schedule, it is essential to confirm participation in the susu. The schedule will be determined based on the number of members who have joined the susu. Once confirmed, members will have the opportunity to select their preferred schedule.</p>
                        : <button onClick={()=>navigate(routes.susu().nested().schedule(params.groupId))} className="btn btn-sm btn-info m-1">Schedule</button>
                    }
                    <div className="small px-1">Once you remove a member from this group, you may need to send a request so they can be added back.</div>
                </div>
                <div className="py-3 px-1">
                    <button onClick={()=>navigate(routes.susu().nested().groupMembers(params.groupId))} className="btn btn-sm btn-danger m-1">Remove a members</button>
                    <button onClick={()=>navigate(routes.susu().nested().groupInvites(params.groupId))} className="btn btn-sm bg-primary text-white m-1">Invite someone to join group</button>
                    <div className="small px-1">Once you remove a member from this group, you may need to send a request so they can be added back.</div>
                </div>
                <div className="py-3 px-1">
                    <button onClick={deleteGroup} className="btn btn-sm btn-danger m-1">Delete Group</button>
                    <div className="small px-1">Once you delete a group, there is no going back. Please be certain.</div>
                </div>
            </div>
            <CommenceSusuOverlay
                isOpen={openCommenceSusu}
                onClose={()=>setOpenCommenceSusu(false)}
                onResponse={setSusu}
            />
        </div>
    )
}