import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../routes/Routes";
import { FcClock } from "react-icons/fc";
import { useAuth } from "../provider/AuthProvider";
import { api } from "../request/Api";
import { utils } from "../utils/Utils";
import { ParseError } from "../utils/ParseError";

export const Schedule = () =>{
    const { user } = useAuth();

    const [susu, setSusu] = useState();
    const [schedules, setSchedules] = useState([]);
    const [errors, setErrors] = useState();
    const [users, setUsers] = useState([]);

    const  params = useParams();
    const navigate = useNavigate();

    const sortUserSchedulePosition = (sortedUsers, sches) =>{
        if(!sches.length || !sortedUsers.length) return [];
        return sortedUsers.sort((a, b) => {
            const indexA = sches.findIndex(sch => sch.attributes.memberId === a.id);
            const indexB = sches.findIndex(sch => sch.attributes.memberId === b.id);
            return indexA - indexB;
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
            });
        });
    }, []);

    return(
        <div className="container">
            <div className="d-flex gap-2 align-items-center mt-4">
                <div className="d-flex align-items-center h5 mx-2 me-auto">
                    <FcClock className="fs-1"/>
                    <div>Schedule Payout</div>
                </div>
                {susu && user && susu?.attributes?.owner?.id === user?.id ? <button onClick={()=>navigate(routes.susu().nested().assignSchedule(params.communityId))} className="btn btn-sm bg-sec">Assign Schedule</button> : null}
                <button onClick={()=>navigate(routes.susu().nested().contributionAndPayments(params.communityId))} className="btn btn-sm bg-sec">Contributors & Payments</button>
            </div>

            <hr></hr>

            {errors ? <div className="alert alert-danger border-0">{errors}</div> : null}
            
            {users.map((u, index)=>(
                <div className="d-flex border-bottom py-2" key={index}>
                    <div className="me-2">{memberScheduleLabel(u)}</div>
                    <div className="me-auto text-truncate">{u.attributes.firstName} {u.attributes.lastName}</div>
                    <div>{scheduleByPositionDate(index)}</div>
                </div>
            ))}
        </div>
    )
}