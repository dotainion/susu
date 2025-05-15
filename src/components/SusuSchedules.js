import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { api } from "../request/Api";
import { utils } from "../utils/Utils";
import { GoAlert } from "react-icons/go";
import { ParseError } from "../utils/ParseError";
import { useAuth } from "../provider/AuthProvider";
import { RiDraggable } from "react-icons/ri";
import { useLayout } from "../layout/Layout";
import { useParams } from "react-router-dom";
import { mockData } from "../contents/MockData";
import { FaCheck } from "react-icons/fa";
import { MdOutlineCheckBox } from "react-icons/md";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import $ from "jquery";
import { Draggable, Droppable } from "./DragAndDropUtils";

export const SusuSchedules = ({members, editOerride, onDropped, onSelectError, itemsState}) =>{
    const { user } = useAuth();
    //const { setLayoutParams } = useLayout();

    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);

    const params = useParams();

    const onSelect = (id) =>{
        const scheduleId = id;
        if(editOerride) return;
        onSelectError?.(null);
        api.schedule.select(scheduleId, user?.id).then((response)=>{
            setSchedules((scheduleArray)=>[...scheduleArray.map((sch)=>{
                if(sch.id === scheduleId) return response.data.data[0];
                return sch;
            })]);
        }).catch((error)=>{
            onSelectError?.(new ParseError().message(error));
        });
    }

    const onHandleItemsUpdate = (items) =>{
        setSchedules(()=>[...items]);
    }

    /*useLayoutEffect(() => {
        setLayoutParams({communityId: params.communityId});
        return () => setLayoutParams({});
    }, []);*/

    useEffect(()=>{
        itemsState?.(schedules);
    }, [schedules]);

    useEffect(()=>{
        api.schedule.list(params.communityId).then((response)=>{
            setSchedules(response.data.data.sort((a, b) => new Date(a.attributes.date) - new Date(b.attributes.date)));
        }).catch((error)=>{
            
        }).finally(()=>{
            setLoading(false);
        });
        if(process.env.NODE_ENV === 'development'){
            setSchedules(mockData.schedules());
        }
    }, []);

    if(loading) return null;

    return(
        <Fragment>
            <Droppable items={schedules} onDropped={onDropped} onItemUpdate={onHandleItemsUpdate}>
                {(items)=>{
                    const date = new Date();
                    return (
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                            {items.map((schedule, index) => {
                                date.setMonth(date.getMonth() +1);
                                return (
                                    <Draggable item={schedule} disabled={!editOerride} key={schedule.id}>
                                        <SusuScheduleCard
                                            editOerride={editOerride}
                                            schedule={schedule}
                                            members={members}
                                            index={index}
                                            date={date}
                                            onSelect={onSelect}
                                        />
                                    </Draggable>
                                )
                            })}
                        </div>
                    )
                }}
            </Droppable>
        </Fragment>
    )
}

const SusuScheduleCard = ({editOerride, schedule, members, index, date, onSelect}) =>{
    const { user } = useAuth();

    const assignedUser = schedule.attributes.user;
    const isTaken = !!assignedUser;
    const isSelected = assignedUser?.id === user.id;
    const fullName = `${schedule?.attributes?.user?.attributes?.firstName || ''} ${schedule?.attributes?.user?.attributes?.lastName || ''}`;

    return(
        <div className="col">
            <div
                className={`card h-100 text-center shadow-sm border position-relative ${
                    editOerride
                    ? 'bg-danger bg-opacity-10'
                    : isSelected
                        ? 'border-primary bg-primary-subtle'
                        : isTaken
                            ? 'bg-light text-muted border-0'
                            : 'border-0'
                } user-select-none rounded-4 p-3`}
                style={{
                    cursor:
                        editOerride
                        ? 'move'
                        : isTaken
                            ? 'not-allowed'
                            : 'pointer'
                }}
            >
                <h6 className="fw-semibold mb-2">Slot {index + 1}</h6>
                <p className="mb-2 small">{utils.date.toLocalDate(date)}</p>
                {
                    editOerride
                    ? <Fragment>
                        <span className="badge bg-danger position-absolute top-0 end-0 m-2 small lh-0">
                            <small><small>Override mode</small></small>
                        </span>
                        <span className="text-muted user-select-none small">Drog to change slot</span>
                        <select className="form-control form-control-sm form-select shadow-none border-0" defaultValue={schedule?.attributes?.user?.id}>
                            <option hidden>Select a member</option>
                            {members.map((u, key)=>(
                                <option value={u.id} key={key}>{u?.attributes?.firstName} {u?.attributes?.lastName}</option>
                            ))}
                        </select>
                    </Fragment>
                    : <Fragment>
                        {
                            isTaken ? (
                                isSelected ? (
                                    <span className="badge bg-primary text-white rounded-pill px-3 border border-primary py-2">Your Pick</span>
                                ) : (
                                    <span className="badge bg-secondary rounded-pill text-truncate border border-secondary px-3 py-2" title={fullName}>Taken by {fullName}</span>
                                )
                            ) : (
                                <button onClick={()=>onSelect(schedule.id)} className="btn btn-outline-primary btn-sm rounded-pill">Select</button>
                            )
                        }
                    </Fragment>
                }
            </div>
        </div>
    )
}