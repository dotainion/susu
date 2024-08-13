import { useLocation, useNavigate, useParams } from "react-router-dom";
import { api } from "../request/Api";
import { useEffect, useRef, useState } from "react";
import { utils } from "../utils/Utils";
import { SelectOption } from "../widgets/SelectOption";
import { routes } from "../routes/Routes";
import { SelectMembersOverlay } from "../components/SelectMembersOverlay";
import { SearchMembersOverlay } from "../components/SearchMembersOverlay";

export const Group = () =>{
    const [group, setGroup] = useState();
    const [cycle , setCycle] = useState();
    const [cycles , setCycles] = useState([]);
    const [susu , setSusu] = useState();
    const [openSusuMembers , setOpenSusuMembers] = useState(false);
    const [openGroupMembers , setOpenGroupMembers] = useState(false);

    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const nameRef = useRef();
    const contributionRef = useRef();
    const descriptionRef = useRef();
    const payoutDateRef = useRef();
    const hideRef = useRef();

    const editGroup = () =>{
        const data = {
            id: params.groupId,
            name: nameRef.current.value,
            contribution: contributionRef.current.value,
            description: descriptionRef.current.value,
            cycle: cycle,
            payoutDate: utils.date.dbFormat(payoutDateRef.current.value),
            hide: hideRef.current
        }
        api.group.set(data).then((response)=>{
            
        }).catch((error)=>{
            console.log(error);
        });
    }

    const startSusu = () =>{
        api.susu.start(params.groupId).then((response)=>{
            setSusu(response.data.data[0]);
        }).catch((error)=>{
            console.log(error);
        });
    }

    const confirmSusu = () =>{
        api.susu.conform(params.groupId).then((response)=>{
            setSusu(response.data.data[0]);
        }).catch((error)=>{
            console.log(error);
        });
    }

    const cancelSusu = () =>{
        const data = {
            ...susu.attributes,
            susuId: susu.id,
            canceled: true
        };
        api.susu.set(data).then((response)=>{
            setSusu(null);
        }).catch((error)=>{
            console.log(error);
        });
    }

    const deleteGroup = () =>{
        const data = {
            ...group.attributes,
            groupId: group.id,
            hide: true
        };
        api.group.delete(data).then((response)=>{
            navigate(routes.susu().nested().ownerGroups());
        }).catch((error)=>{
            console.log(error);
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
        api.susu.cycles().then((response)=>{
            const cycleLists = response.data.data.map((cyc)=>{
                return {
                    title: cyc.attributes.cycle, 
                    value: cyc.attributes.cycle
                }
            });
            setCycles(cycleLists);
        }).catch((error)=>{
            console.log(error);
        });
        setOpenSusuMembers(false);
        setOpenGroupMembers(false);
    }, [location]);

    useEffect(() => {
        if(!group) return;
        nameRef.current.value = group.attributes.name;
        contributionRef.current.value = group.attributes.contribution;
        descriptionRef.current.value = group.attributes.description;
        setCycle(group.attributes.cycle);
        payoutDateRef.current.value = utils.date.dbFormat(group.attributes.payoutDate);
        hideRef.current = group.attributes.hide;
    }, [group]);
    
    return(
        <div className="container">
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
                        <div style={{minWidth: '200px'}}>Contribution Amount</div>
                        <input ref={contributionRef} className="form-control mb-3" placeholder="Contribution Amount" type="number" style={{maxWidth: '500px'}}/>
                    </div>
                    <div className="d-md-flex d-block">
                        <div style={{minWidth: '200px'}}>Description</div>
                        <textarea ref={descriptionRef} className="form-control mb-3" placeholder="Description" style={{resize: 'none', maxWidth: '500px'}}/>
                    </div>
                    <div className="d-md-flex d-block">
                        <div style={{minWidth: '200px'}}>Duration Cycle</div>
                        <SelectOption options={cycles} onChange={(e)=>setCycle(e.target.value)} defaultValue={cycle}/>
                    </div>
                    <div className="d-md-flex d-block">
                        <div style={{minWidth: '200px'}}>Payout Date</div>
                        <input ref={payoutDateRef} className="form-control" type="datetime-local" style={{maxWidth: '500px'}}/>
                    </div>
                </div>
            </div>
            <hr className="my-5"></hr>
            <div className="striped-list">
                {
                    !susu?
                    <div className="py-3 px-2">
                        <button onClick={startSusu} className="btn btn-sm">Commence a susu</button>
                        <div className="small">Begin organizing contributions, setting schedules, and achieving financial goals together.</div>
                    </div>
                    : 
                    <>
                    {
                        susu.attributes.pendingStart? 
                        <div className="py-3 px-2">
                            <button onClick={confirmSusu} className="btn btn-sm btn-success me-2">Apply & Confirm</button>
                            <button onClick={()=>setOpenSusuMembers(true)} className="btn btn-sm bg-primary text-white me-2">Send Invites to group members</button>
                            <button onClick={()=>navigate(routes.susu().nested().susuMembers(params.groupId, susu.id))} className="btn btn-sm btn-danger">Remove a members</button>
                            <button onClick={cancelSusu} className="btn btn-sm btn-danger ms-2">Cancel Susu</button>
                            <div className="small">Begin organizing contributions, setting schedules, and achieving financial goals together.</div>
                        </div>
                        : 
                        <div className="py-3 px-2">
                            <button onClick={()=>navigate(routes.susu().nested().groupSusuWallet(params.groupId, susu.id))} className="btn btn-sm bg-secondary text-white">Susu Wallet</button>
                            <button onClick={()=>setOpenSusuMembers(true)} className="btn btn-sm bg-primary text-white ms-2">Send Invites to group members</button>
                            <button onClick={()=>navigate(routes.susu().nested().susuMembers(params.groupId))} className="btn btn-sm btn-danger ms-2">Remove a members</button>
                            <div className="small">Begin organizing contributions, setting schedules, and achieving financial goals together.</div>
                        </div>
                    }
                    </>
                }
                <div className="py-3 px-2">
                    {
                        susu?.attributes?.pendingStart 
                        ? <button onClick={()=>navigate(routes.susu().nested().schedule(params.groupId))} className="btn btn-sm btn-info">Schedule</button>
                        : <p className="small">To generate the schedule, it is essential to confirm participation in the susu. The schedule will be determined based on the number of members who have joined the susu. Once confirmed, members will have the opportunity to select their preferred schedule.</p>
                    }
                    <div className="small">Once you remove a member from this group, you may need to send a request so they can be added back.</div>
                </div>
                <div className="py-3 px-2">
                    <button onClick={()=>navigate(routes.susu().nested().groupMembers(params.groupId))} className="btn btn-sm btn-danger">Remove a members</button>
                    <button onClick={()=>setOpenGroupMembers(true)} className="btn btn-sm bg-primary text-white ms-2">Invite someone to join group</button>
                    <div className="small">Once you remove a member from this group, you may need to send a request so they can be added back.</div>
                </div>
                <div className="py-3 px-2">
                    <button onClick={deleteGroup} className="btn btn-sm btn-danger">Delete Group</button>
                    <div className="small">Once you delete a group, there is no going back. Please be certain.</div>
                </div>
            </div>
            <SelectMembersOverlay 
                isOpen={openSusuMembers} 
                onClose={()=>setOpenSusuMembers(false)}
                onSelect={(selected)=>console.log(selected)}
            />
            <SearchMembersOverlay 
                isOpen={openGroupMembers} 
                onClose={()=>setOpenGroupMembers(false)}
                onSelect={(selected)=>console.log(selected)}
            />
        </div>
    )
}