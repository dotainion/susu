import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../routes/Routes";
import { FcClock } from "react-icons/fc";
import { useAuth } from "../provider/AuthProvider";
import { api } from "../request/Api";
import { utils } from "../utils/Utils";
import { ParseError } from "../utils/ParseError";
import { useLayout } from "../layout/Layout";
import { SusuSchedules } from "../components/SusuSchedules";
import { mockData } from "../contents/MockData";

export const Schedule = () =>{
    const { user } = useAuth();
    //const { setParams } = useLayout();

    const [susu, setSusu] = useState();
    const [errors, setErrors] = useState();
    const [members, setMembers] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);

    const  params = useParams();
    const navigate = useNavigate();

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

    return(
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">💸 Payout Schedule</h2>
            </div>

            <div className="card border-0 shadow-sm rounded-4 mb-4">
                <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                    <div className="mb-3 mb-md-0">
                        <h5 className="fw-semibold mb-1">Group: <span className="text-primary">Spice Circle</span></h5>
                        <p className="text-muted small mb-0">
                            Cycle: <strong>{susu?.attributes?.cycle}</strong> • Slots: <strong>{schedules.length}</strong> • Start Date:{' '}
                            <strong>{utils.date.toLocalDate(susu?.attributes?.startDate)}</strong>
                        </p>
                    </div>
                    <span 
                        className={`badge px-3 py-2 rounded-pill mt-2 mt-md-0 ${susu?.attributes?.pendingStart ? 'bg-warning text-dark' : 'bg-success'}`}
                    >{susu?.attributes?.pendingStart ? 'Pending Start' : 'Active'}</span>
                </div>
            </div>

            <hr></hr>
            
            {errors ? <div className="alert alert-danger border-0 py-1 mt-3">{errors}</div> : null}     

            <SusuSchedules
                members={members}
                onDropped={()=>null}
                onSelectError={setErrors}
                itemsState={setSchedules}
            />
        </div>
    )
}