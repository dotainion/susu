import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { api } from "../request/Api";
import { utils } from "../utils/Utils";
import { GoAlert } from "react-icons/go";
import { ParseError } from "../utils/ParseError";
import { useAuth } from "../provider/AuthProvider";
import { RiDraggable } from "react-icons/ri";
import { useLayout } from "../layout/Layout";
import { useParams } from "react-router-dom";
import $ from "jquery";
import { mockData } from "../contents/MockData";
import { SusuSchedules } from "../components/SusuSchedules";

export const AssignSchedule = () =>{
    const { user } = useAuth();
    const { setLayoutParams } = useLayout();

    const [susu, setSusu] = useState();
    const [schedules, setSchedules] = useState([]);
    const [members, setMembers] = useState([]);
    const [errors, setErrors] = useState();
    const [override, setOverride] = useState(false);
    const [loading, setLoading] = useState(true);

    const params = useParams();

    const onScheduleUpdate = () =>{
        if(!susu || susu?.attributes?.owner?.id !== user.id) return;
        setErrors(null);
        let data = {}
        schedules.forEach((sch, i)=>{
            if(!sch.attributes.user?.id) return setErrors('Please ensure that each schedule has a selected member.');
            data[sch.id] = sch.attributes.user?.id
        });
        api.schedule.assign(data).then((response)=>{
            
        }).catch((error)=>{
            setErrors(new ParseError().message(error));
        });
    }

    useLayoutEffect(() => {
        setLayoutParams({communityId: params.communityId});
        return () => setLayoutParams({});
    }, []);

    useEffect(()=>{
        api.susu.active(params.communityId).then((response)=>{
            setSusu(response.data.data[0]);
            setMembers(response.data.data[0].attributes.members);
        }).catch((error)=>{
            setErrors(new ParseError().message(error));
        }).finally(()=>{
            setLoading(false);
        });
        if(process.env.NODE_ENV === 'development'){
            setMembers(mockData.susu().attributes.members);
            setSusu(mockData.susu());
        }
    }, []);

    if(loading) return null;

    if(!susu || !user || susu?.attributes?.owner?.id !== user.id){
        return(
            <div className="container my-5">
                <div className="alert alert-danger h4">You are not authorize to assign schedules</div>
            </div>
        )
    }

    return(
        <div className="container my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">Payout Schedule</h2>
                <div className="d-flex align-items-center gap-3">
                    {override && <button onClick={onScheduleUpdate} className="btn btn-sm btn-success rounded-pill px-3">Save Changes</button>}
                    <button onClick={()=>setOverride(()=>!override)} className={`btn px-3 ${override ? 'btn-outline-primary text-primary' : 'btn-outline-danger text-danger'} bg-transparent btn-sm rounded-pill`}>🛠️ Override Selection</button>
                </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 mb-4">
                <div className="card-body d-md-flex justify-content-between align-items-center">
                    <div>
                        <h5 className="fw-semibold mb-1">SusuSpice: <span className="text-primary">Spice Circle</span></h5>
                        <p className="text-muted small mb-0">
                            Cycle: <strong>{susu?.attributes?.cycle}</strong> • Slots: <strong>{schedules.length}</strong> • Start: <strong>{utils.date.toLocalDate(susu?.attributes?.startDate)}</strong>
                        </p>
                    </div>
                    {
                        susu?.attributes?.pendingStart
                            ? <span className="badge bg-warning px-3 py-2 rounded-pill mt-3 mt-md-0">Pending</span>
                            : <span className="badge bg-success px-3 py-2 rounded-pill mt-3 mt-md-0">Active</span>
                    }
                </div>
            </div>

            {errors ? <div className="alert alert-danger border-0 py-1 mt-3">{errors}</div> : null}     

            <SusuSchedules
                members={members}
                editOerride={override}
                onDropped={()=>{}}
                onSelectError={setErrors}
                itemsState={setSchedules}
            />
        </div>
    )
}