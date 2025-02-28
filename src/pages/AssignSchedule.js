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
    const [susu, setSusu] = useState();
    const [schedules, setSchedules] = useState([]);
    const [errors, setErrors] = useState();
    const [loading, setLoading] = useState(true);
    const [reOrderedMembers, setReOrderedMembers] = useState(true);

    const params = useParams();

    const onSaveChanges = () =>{
        if(susu?.attributes?.owner?.id !== user?.id) return;
        setErrors(null);
        let data = {}
        reOrderedMembers.forEach((mbr, i)=> data[schedules[i].id] = mbr.id);
        api.schedule.assign(data).then((response)=>{
            setSchedules((scheduleArray)=>[...scheduleArray.map((sch)=>{
                sch.attributes.memberId = data[sch.id];
                return sch;
            })]);
        }).catch((error)=>{
            setErrors(new ParseError().message(error));
        });
    }

    const scheduleByPositionDate = (index) =>{
        if(!schedules[index]) console.error('schdule index not found.');
        return utils.date.toLocalDate(schedules[index].attributes.date);
    }

    const memberScheduleLabel = (member) =>{
        const schedule = schedules.find((sch)=>sch.attributes.memberId === member.id);
        if(schedule) return <div className="small badge bg-warning">Assigned</div>;
        return <div className="small badge bg-secondary">Unassigned</div>;
    }

    const sortUserSchedulePosition = (sortedUsers, sches) =>{
        if(!sches.length || !sortedUsers.length) return [];
        return sortedUsers.sort((a, b) => {
            const indexA = sches.findIndex(sch => sch.attributes.memberId === a.id);
            const indexB = sches.findIndex(sch => sch.attributes.memberId === b.id);
            return indexA - indexB;
        });
    }

    useEffect(()=>{
        let responseSchedules = [];
        api.schedule.list(params.communityId).then((response)=>{
            responseSchedules = response.data.data;
            setSchedules(response.data.data);
        }).catch((error)=>{
            setErrors(new ParseError().message(error));
        }).finally(()=>{
            api.susu.active(params.communityId).then((response)=>{
                if(!responseSchedules.length) return;
                setSusu(response.data.data[0]);
                setUsers(sortUserSchedulePosition(response.data.data[0].attributes.members || [], responseSchedules));
            }).catch((error)=>{
                setErrors(new ParseError().message(error));
            }).finally(()=>{
                setLoading(false);
            });
        });
    }, []);

    if(loading) return null;

    if(!susu || !user || susu?.attributes?.owner?.id !== user?.id){
        return(
            <div className="container my-5">
                <div className="alert alert-danger h4">You are not authorize to assign schedules</div>
            </div>
        )
    }

    return(
        <div className="container">
            <div className="h4 text-center my-4">Payout Schedule</div>

            {susu && user && susu?.attributes?.owner?.id === user?.id && <button onClick={onSaveChanges} className="btn btn-sm btn-sec">Save chanegs</button>}

            <hr></hr>

            {errors ? <div className="alert alert-danger border-0 py-1 mt-3">{errors}</div> : null}            
            <p className="text-muted mt-3">To customize the payout schedule, simply drag and drop the users to reorder their positions within the schedule. Adjust the order to fit your preferred payout timeline.</p>
            
            <hr></hr>

            <DragDropContainer isMovable={susu?.attributes?.owner?.id === user?.id} items={users} onReordered={setReOrderedMembers}>
                {(member, index)=>(
                    <div className="d-flex align-items-center border-bottom move py-2">
                        <div className="border-start border-end">
                            <RiDraggable className="text-brown fs-3"/>
                        </div>
                        <div className="ps-2 me-auto text-truncate">
                            <span className="me-2">{member.attributes.firstName}</span>
                            <span>{member.attributes.lastName}</span>
                        </div>
                        <div className="d-flex small px-2">
                            <div className="text-truncate me-2">{scheduleByPositionDate(index)}</div>
                            <div className="small">{memberScheduleLabel(member)}</div>
                        </div>
                        <div className="badge bg-primary">{index + 1}</div>
                    </div>
                )}
            </DragDropContainer>
        </div>
    )
}