import { useEffect, useRef, useState } from "react";
import { api } from "../request/Api";
import { useParams } from "react-router-dom";
import { utils } from "../utils/Utils";
import { GoAlert } from "react-icons/go";
import $ from "jquery";
import { ParseError } from "../utils/ParseError";
import { useAuth } from "../provider/AuthProvider";
import { DragDropContainer } from "../components/DragDropContainer";
import { RiDraggable } from "react-icons/ri";

export const AssignSchedule = () =>{
    const { user } = useAuth();

    const [users, setUsers] = useState([]);
    const [reOrderedMembers, setReOrderedMembers] = useState([]);
    const [susu, setSusu] = useState();
    const [schedules, setSchedules] = useState([]);
    const [errors, setErrors] = useState();
    const [loading, setLoading] = useState(true);

    const params = useParams();

    const onSaveChanges = () =>{
        setErrors(null);
        let data = {}
        reOrderedMembers.forEach((mbr, i)=> data[schedules[i].id] = mbr.id);
        api.schedule.assign(data).then((response)=>{

        }).catch((error)=>{
            setErrors(new ParseError().message(error));
        });
    }

    const scheduleByPositionDate = (index) =>{
        if(!schedules[index]) console.error('schdule index not found.');
        return utils.date.toLocalDateTime(schedules[index].attributes.date);
    }

    useEffect(()=>{
        let scheduleLoading = true;
        let susuLoading = true;
        api.schedule.list(params.communityId).then((response)=>{
            setSchedules(response.data.data);
        }).catch((error)=>{
            setErrors(new ParseError().message(error));
        }).finally(()=>{
            scheduleLoading = false;
            if(!scheduleLoading && !susuLoading){
                setLoading(false);
            }
        });
        api.susu.active(params.communityId).then((response)=>{
            setSusu(response.data.data[0]);
            setUsers(response.data.data[0].attributes.members || []);
        }).catch((error)=>{
            setErrors(new ParseError().message(error));
        }).finally(()=>{
            susuLoading = false;
            if(!scheduleLoading && !susuLoading){
                setLoading(false);
            }
        });
    }, []);

    useEffect(()=>{
        if(loading || !users.length || !schedules.length) return;
        const uUsers = [];
        schedules.forEach((sch)=>{
            for(let u of users){
                if(u.id === sch.attributes.memberId){
                    uUsers.push(u);
                    break;
                }
            }
        });
        setUsers(uUsers);
    }, [users, schedules]);

    if(loading) return null;

    if(susu?.attributes?.owner?.id !== user?.id){
        return(
            <div className="container my-5">
                <div className="alert alert-danger h4">Your are not authorize to assign Schedules</div>
            </div>
        )
    }

    return(
        <div className="container">
            <div className="h4 text-center my-4">Payout Schedule</div>

            <hr></hr>

            {user && susu?.attributes?.owner?.id === user?.id ? <button onClick={onSaveChanges} className="btn btn-sm">Save Changes</button> : null}
            {errors ? <div className="alert alert-danger border-0 py-1 mt-3">{errors}</div> : null}            
            <p className="text-muted">To customize the payout schedule, simply drag and drop the users to reorder their positions within the schedule. Adjust the order to fit your preferred payout timeline.</p>
            
            <hr></hr>

            <DragDropContainer items={users} onReordered={setReOrderedMembers}>
                {(member, index)=>(
                    <div className="d-flex align-items-center border-bottom move py-2">
                        <div className="border-start border-end">
                            <RiDraggable className="text-brown fs-3"/>
                        </div>
                        {console.log(member)}
                        <div className="ps-2 me-auto text-truncate">{member.attributes.firstName} {member.attributes.lastName}</div>
                        <div className="px-2 text-truncate">{scheduleByPositionDate(index)}</div>
                        <div className="badge bg-primary">{index + 1}</div>
                    </div>
                )}
            </DragDropContainer>
        </div>
    )
}