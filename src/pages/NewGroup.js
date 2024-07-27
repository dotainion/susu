import { useRef, useState } from "react";
import { api } from "../request/Api"
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";
import { utils } from "../utils/Utils";
import { SelectOption } from "../widgets/SelectOption";

export const NewGroup = () =>{
    const navigate = useNavigate();

    const [cycle , setCycle] = useState();

    const idRef = useRef(null);
    const nameRef = useRef();
    const contributionRef = useRef();
    const descriptionRef = useRef();
    const payoutDateRef = useRef();
    const hideRef = useRef(false);

    const cycles = [
        {title: 'Weekly', value: 'Weekly'},
        {title: 'Bi-Weekly', value: 'Bi-Weekly'},
        {title: 'Monthly', value: 'Monthly'},
        {title: 'Bi-Monthly', value: 'Bi-Monthly'},
    ];

    const createGroup = () =>{
        const group = {
            id: idRef.current,
            name: nameRef.current.value,
            contribution: contributionRef.current.value,
            description: descriptionRef.current.value,
            cycle: cycle,
            payoutDate: utils.date.dbFormat(payoutDateRef.current.value),
            hide: hideRef.current
        }
        api.group.set(group).then((response)=>{
            navigate(routes.susu().nested().group(response.data.data[0].id));
        }).catch((error)=>{
            console.log(error);
        });
    }

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
                        <SelectOption options={cycles} onChange={(e)=>setCycle(e.target.value)}/>
                    </div>
                    <div className="d-md-flex d-block">
                        <div style={{minWidth: '200px'}}>Payout Date</div>
                        <input ref={payoutDateRef} className="form-control" type="datetime-local" style={{maxWidth: '500px'}}/>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center my-5">
                <button onClick={createGroup} className="btn btn-sm px-4">Save</button>
            </div>
        </div>
    )
}