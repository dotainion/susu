import { useParams } from "react-router-dom";
import { api } from "../request/Api";
import { useEffect, useRef, useState } from "react";

export const Group = () =>{
    const [group, setGroup] = useState();

    const params = useParams();

    const idRef = useRef();
    const nameRef = useRef();
    const contributionRef = useRef();
    const descriptionRef = useRef();
    const cycleRef = useRef();
    const payoutDateRef = useRef();
    const createdDateRef = useRef();
    const hideRef = useRef();

    useEffect(() => {
        if(!params.groupId) return;
        api.group.group(params.groupId).then((response)=>{
            setGroup(response.data.data[0]);
        }).catch((error)=>{

        });
    }, []);

    useEffect(() => {
        if(!group) return;
        idRef.current.value = group.attributes.id;
        nameRef.current.value = group.attributes.name;
        contributionRef.current.value = group.attributes.contribution;
        descriptionRef.current.value = group.attributes.description;
        cycleRef.current.value = group.attributes.cycle;
        payoutDateRef.current.value = group.attributes.payoutDate;
        createdDateRef.current.value = group.attributes.createdDate;
        hideRef.current.value = group.attributes.hide;
    }, [group]);
    
    return(
        <div className="container">
            <div className="h4 my-3">Group</div>
            <div className="d-xl-flex d-block w-100">
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
                        <select ref={cycleRef} className="form-control form-select mb-3" style={{maxWidth: '500px'}}>
                            <option>weekly</option>
                            <option>bi-weekly</option>
                            <option>monthly</option>
                            <option>bi-monthly</option>
                        </select>
                    </div>
                    <div className="d-md-flex d-block">
                        <div style={{minWidth: '200px'}}>Payout Date</div>
                        <input ref={payoutDateRef} className="form-control" type="date" style={{maxWidth: '500px'}}/>
                    </div>
                </div>
            </div>
            <hr className="my-5"></hr>
            <div className="striped-list">
                <div className="py-3 px-2">
                    {/**first click initiate susu and wait for members to accept when they do then there is another button for Starting susu then it should show inprogress*/}
                    <button className="btn btn-sm">Start Susu</button>
                    <div className="small">Begin organizing contributions, setting schedules, and achieving financial goals together.</div>
                </div>
                <div className="py-3 px-2">
                    <button className="btn btn-sm btn-danger">Remove a members</button>
                    <div className="small">Once you remove a member from this group, you may need to send a request so they can be added back.</div>
                </div>
                <div className="py-3 px-2">
                    <button className="btn btn-sm btn-danger">Delete Group</button>
                    <div className="small">Once you delete a group, there is no going back. Please be certain.</div>
                </div>
            </div>
        </div>
    )
}