import { useEffect, useRef, useState } from "react";
import { api } from "../request/Api";
import { useParams } from "react-router-dom";
import { utils } from "../utils/Utils";
import { GoAlert } from "react-icons/go";
import $ from "jquery";
import { ParseError } from "../utils/ParseError";
import { useAuth } from "../provider/AuthProvider";

const DEFAULT_VALUE = 'Select a user for the schedule';
const NONE = 'None';
export const AssignSchedule = () =>{
    const { user } = useAuth();

    const [users, setUsers] = useState([]);
    const [susu, setSusu] = useState();
    const [schedules, setSchedules] = useState([]);
    const [errors, setErrors] = useState();

    const params = useParams();

    const bodyRef = useRef();

    const getDuplictes = () =>{
        let valueCounts = {};
        let duplicateValues = [];

        $(bodyRef.current).find('select').each((i, child)=>{
            const value = $(child).val();
            if(!value) return;
            if (valueCounts[value]) valueCounts[value]++;
            else valueCounts[value] = 1;
        });
        for(let value in valueCounts) {
            if (valueCounts[value] > 1 && ![NONE, DEFAULT_VALUE].includes(value)) duplicateValues.push(value);
        }
        return duplicateValues;
    }

    const highlightDuplicates = () =>{
        const duplicateValues = getDuplictes();
        const classNames = 'border border-danger';

        $(bodyRef.current).find('i').addClass('d-none');
        $(bodyRef.current).find('select').removeClass(classNames);

        $(bodyRef.current).find('select').each((i, child)=>{
            if(duplicateValues.includes($(child).val())){
                $(child).addClass(classNames);
                $(child).closest('tr').find('i').removeClass('d-none');
            }
        });
        return !!duplicateValues.length;
    }

    const onUserSelected = (e) =>{
        highlightDuplicates();
    }

    const onSaveChanges = () =>{
        setErrors(null);
        if(getDuplictes().length) return highlightDuplicates();
        let data = {}
        $(bodyRef.current).children().each((i, child)=>{
            const memberId = $(child).find('input').val();
            const scheduleId = $(child).find('select').val();
            if([NONE, DEFAULT_VALUE].includes(scheduleId)) return;
            data[scheduleId] = memberId;
        });
        if(!Object.keys(data).length) return;
        api.schedule.assign(data).then((response)=>{

        }).catch((error)=>{
            setErrors(new ParseError().message(error));
        });
    }

    useEffect(()=>{
        api.schedule.list(params.groupId).then((response)=>{
            setSchedules(response.data.data);
        }).catch((error)=>{
            setErrors(new ParseError().message(error));
        });
        api.susu.active(params.groupId).then((response)=>{
            setSusu(response.data.data[0]);
            setUsers(response.data.data[0].attributes.members);
        }).catch((error)=>{
            setErrors(new ParseError().message(error));
        });
    }, []);

    useEffect(()=>{
        $(bodyRef.current).children().each((i, child)=>{
            const memberId = $(child).find('input').val();
            if(!$(child).find(`option[data-user-id=${memberId}]`).length) return;
            $(child).find('option').removeAttr('selected');
            $(child).find(`option[data-user-id=${memberId}]`).attr('selected', 'selected');
        });
    }, [users, schedules]);

    if(!susu || susu?.attributes?.owner?.id !== user?.id){
        return(
            <div className="container my-5">
                <div className="alert alert-danger h4">Your are not authorize to assign Schedules</div>
            </div>
        )
    }

    return(
        <div className="container">
            <div className="h4 text-center my-4">Assign Payout Schedule</div>
            <hr></hr>
            {susu?.attributes?.owner?.id === user?.id ? <button onClick={onSaveChanges} className="btn btn-sm btn-primary">Save Changes</button> : null}
            {errors ? <div className="alert alert-danger border-0 py-1 mt-3">{errors}</div> : null}
            <table className="w-100 mt-3">
                <tbody ref={bodyRef}>
                    {users.map((u)=>(
                        <tr className="border-bottom" key={u.id}>
                            <td className="py-2 small">{u.attributes.firstName} {u.attributes.lastName}</td>
                            <td className="py-2 small">
                                <input hidden onChange={()=>null} value={u.id}/>
                                <select onChange={onUserSelected} className="form-control shadow-none w-auto" defaultValue={DEFAULT_VALUE}>
                                    {schedules.map((sch)=>(
                                        <option data-user-id={sch.attributes.memberId} value={sch.id} key={sch.id}>{utils.date.toLocalDateTime(sch.attributes.date)}</option>
                                    ))}
                                    <option>{NONE}</option>
                                    <option hidden>{DEFAULT_VALUE}</option>
                                </select>
                                <i className="d-flex align-items-center text-danger small d-none"><GoAlert className="me-1"/>Duplicate selection</i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
