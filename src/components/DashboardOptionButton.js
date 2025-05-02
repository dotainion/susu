import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../request/Api";
import { routes } from "../routes/Routes";
import { utils } from "../utils/Utils";
import { Loader } from "./Loader";
import { useAuth } from "../provider/AuthProvider";

export const DashboardOptionButton = ({className, children}) =>{
    const { user } = useAuth();

    const [show, setShow] = useState(false);
    const [susus, setSusus] = useState([]);
    const [loading, setLoading] = useState(true);

    const params = useParams();
    const navigate = useNavigate();

    const statusBadge = (susu) => {
        if(susu.attributes.canceled) return <span className="badge bg-danger">Canceled</span>;
        if(susu.attributes.completed) return <span className="badge bg-primary">Completed</span>;
        if(susu.attributes.pendingStart === false && !susu.attributes.canceled && !susu.attributes.completed){
            return <span className="badge bg-success">Active</span>;
        }
        return <span className="badge bg-secondary">Pending</span>;
    }

    const select = (susu) =>{
        navigate(routes.susu().nested().dashboard(susu.id, susu.communityId));
    }
    
    useEffect(() => {
        const fetchSusus = params.communityId
            ? api.susu.list(params.communityId)
            : api.susu.listByUserId(user.id);
            
        fetchSusus.then((response)=>{
            setSusus(response.data.data);
        }).catch((error)=>{
            
        }).finally(()=>{
            setLoading(false);
        });
    }, []);

    return(
        <>
            <button onClick={()=>setShow(!show)} className={className}  type="button">{children || 'Dashboard'}</button>
            {show && ReactDOM.createPortal(
                <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 backdrop-blur z-index-1050 d-flex align-items-center justify-content-center" style={{ zIndex: 1050 }}>
                    <div className="bg-white rounded shadow p-4" style={{ maxWidth: '600px', width: '90%' }}>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="fw-bold mb-0">Choose a Susu Plan</h4>
                            <button className="btn btn-sm btn-outline-secondary border" onClick={()=>setShow(false)}>&times;</button>
                        </div>
                
                        {
                            loading
                            ? <Loader keepAlive />
                            : <div>
                                {
                                    susus.length ?
                                    susus.map((susu, key) => (
                                        <button className="w-100 text-start border rounded p-3 mb-3 bg-light" onClick={()=>select(susu)} key={key}>
                                            <div className="d-flex justify-content-between">
                                                <div className="w-100">
                                                    <h5 className="text-dark mb-1">{utils.date.toLocalDateTime(susu.attributes.startDate)}</h5>
                                                    <p className="mb-0 text-muted">{susu.attributes.cycle}</p>
                                                </div>
                                                <div className="ms-2">{statusBadge(susu)}</div>
                                            </div>
                                        </button>
                                    )):
                                    <div className="text-center p-5">
                                        <h5 className="text-muted">No Susu options available at the moment.</h5>
                                        <p className="text-muted">It seems like no one has created a new Susu plan yet. Check back later, or you can start one yourself!</p>
                                    </div>
                                }
                            </div>
                        }
                
                        <div className="text-end">
                            <button className="btn btn-primary" onClick={()=>setShow(false)}>Close</button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    )
}
