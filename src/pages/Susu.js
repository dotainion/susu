import { useEffect, useLayoutEffect, useState } from "react";
import { FaCheckCircle, FaShareAlt } from "react-icons/fa";
import { CommenceSusuOverlay } from "../components/CommenceSusuOverlay";
import { api } from "../request/Api";
import { ParseError } from "../utils/ParseError";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { routes } from "../routes/Routes";
import { ShareSocialMediaOverlay } from "../components/ShareSocialMediaOverlay";
import { Loader } from "../components/Loader";
import { MdPeople, MdPersonAdd, MdPersonRemoveAlt1 } from "react-icons/md";
import { GrSchedules } from "react-icons/gr";
import { TiCancelOutline } from "react-icons/ti";
import { useAuth } from "../provider/AuthProvider";
import { useLayout } from "../layout/Layout";
import { SusuCard } from "../components/SusuCard";

export const Susu = () =>{
    const { user } = useAuth();
    const { setParams, setLayoutParams } = useLayout();

    const [susu , setSusu] = useState();
    const [openCommenceSusu , setOpenCommenceSusu] = useState(false);
    const [openSusuInvite , setOpenSusuInvite] = useState(false);
    const [loading , setLoading] = useState(true);
    const [errors , setErrors] = useState();

    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const confirms = () =>{
        setErrors(null);
        api.susu.conform(params.communityId).then((response)=>{
            setSusu(response.data.data[0]);
        }).catch((error)=>{
            setErrors(new ParseError().message(error));
        });
    }

    const cancel = () =>{
        setErrors(null);
        const data = {
            ...susu.attributes,
            susuId: susu.id,
            canceled: true
        };
        api.susu.set(data).then((response)=>{
            setSusu(null);
        }).catch((error)=>{
            setErrors(new ParseError().message(error));
        });
    }

    useLayoutEffect(() => {
        setParams({communityId: params.communityId});
        return () => setLayoutParams({});
    }, []);

    useEffect(() => {
        api.susu.active(params.communityId).then((response)=>{
            setSusu(response.data.data[0]);
        }).catch((error)=>{
            setSusu(null);
        }).finally(()=>{
            setLoading(false);
        });
    }, [location]);

    if(loading) return <Loader show />;

    return(
        <div className="container mb-5 p-0">
            <div className="d-flex justify-content-end gap-3 pt-3">
                <button onClick={()=>setOpenSusuInvite(true)} className="btn btn-sm"><FaShareAlt/> Share</button>
            </div>
            <hr></hr>
            <div className="mb-3">
                {!susu && (
                    <div className="d-flex flex-column align-items-center justify-content-center p-4 bg-light rounded shadow-sm">
                        <div className="text-center">
                            <button onClick={()=>setOpenCommenceSusu(true)} className="btn btn-sm btn-success fw-bold p-3">Commence susu</button>
                        </div>
                        <div className="m-auto w-50 w-sm-100 mt-3">Initiates a new Susu by setting up the group, defining contribution amounts, frequency, and member requirements. Once the group is created, members can join and begin contributing, marking the official start of the pooling process.</div>
                    </div>
                )}
                {susu?.attributes?.pendingStart && (
                    <div className="d-flex flex-column align-items-center justify-content-center p-4 bg-light rounded shadow-sm">
                        <h3 className="fw-bold mb-3 text-primary">Susu Group Started!</h3>
                        <p className="text-muted mb-4 text-center">
                            Your Susu has successfully started! Now it's time to invite members and get started on achieving your goals together.
                            <strong className="text-success ms-2">Let's build a stronger community!</strong>
                        </p>
                        <button onClick={()=>setOpenSusuInvite(true)} className="btn btn-primary d-flex align-items-center gap-2">
                            <MdPersonAdd size={20} />
                            <span>Add Members</span>
                        </button>
                    </div>
                )}
            </div>
            
            {errors ? <div className="alert alert-danger small border-0">{errors}</div> : null}
                    
            <div className={`d-flex flex-wrap justify-content-center ${susu ? '' : 'opacity-50'}`}>
                {
                    susu?.attributes?.pendingStart
                    ? <div className="col-12 col-lg-4 m-0 p-1">
                        <div className="d-flex flex-column bg-white border rounded-3 h-100 p-3">
                            <div className="mb-auto">Confirms a user’s participation in the Susu after two or more members join, finalizing their membership and starting the pooling.</div>
                            <div className="d-flex justify-content-end mt-3">
                                <button onClick={confirms} className="d-flex align-items-center gap-1 btn btn-sm btn-success text-nowrap fw-bold" disabled={!susu} style={{minWidth: 150}}>
                                    <FaCheckCircle />
                                    <span>Apply & Confirm</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    : <div className="col-12 col-lg-4 m-0 p-1">
                        <div className="d-flex flex-column bg-white border rounded-3 h-100 p-3">
                            <div className="mb-auto">The Susu is currently active, with the pooling process underway and members contributing.</div>
                            <div className="d-flex justify-content-end mt-3">
                                <div className="text-nowrap fw-bold text-success" style={{minWidth: 150}}>Susu in progress</div>
                            </div>
                        </div>
                    </div>
                }
                <div className="col-12 col-lg-4 m-0 p-1">
                    <div className="d-flex flex-column bg-white border rounded-3 h-100 p-3">
                        <div className="mb-auto">Cancel a Susu activity, halting members contributions and participation in the susu.</div>
                        <div className="d-flex justify-content-end mt-3">
                            <div className="dropdown">
                                <button className="d-flex align-items-center btn btn-sm btn-danger text-nowrap fw-bold gap-1" id="cancelSusu1" disabled={!susu} data-bs-toggle="dropdown" aria-expanded="false" style={{minWidth: 150}}>
                                    <TiCancelOutline />
                                    <span>Cancel Susu</span>
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="cancelSusu1">
                                    <li><a onClick={cancel} className="dropdown-item text-danger pointer">Confirm Cancelation</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-4 m-0 p-1">
                    <div className="d-flex flex-column bg-white border rounded-3 h-100 p-3">
                        <div className="mb-auto">Allows the administrator to view and manage members, track contributions, and make updates to the Susu details.</div>
                        <div className="d-flex justify-content-end mt-3">
                            <button onClick={()=>navigate(routes.susu().nested().contributors(params.communityId, susu.id))} className="d-flex align-items-center gap-1 btn btn-sm btn-secondary text-nowrap fw-bold" disabled={!susu} style={{minWidth: 150}}>
                                <MdPeople />
                                <span>Contributors & Pay</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-4 m-0 p-1">
                    <div className="d-flex flex-column bg-white border rounded-3 h-100 p-3">
                        <div className="mb-auto">Remove a susu susu member, this might halting the pooling process and ending the susu activity.</div>
                        <div className="d-flex justify-content-end mt-3">
                            <button onClick={()=>navigate(routes.susu().nested().susuMembers(params.communityId, susu.id))} className="d-flex align-items-center gap-1 btn btn-sm btn-danger text-nowrap fw-bold" disabled={!susu} style={{minWidth: 150}}>
                                <MdPersonRemoveAlt1 />
                                <span>Remove a members</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-4 m-0 p-1">
                    <div className="d-flex flex-column bg-white border rounded-3 h-100 p-3">
                        <div className="mb-auto">This action sets the timing for member contributions and payouts, defining the frequency and when funds are collected or distributed within the Susu.</div>
                        <div className="d-flex justify-content-end mt-3">
                            <button onClick={()=>navigate(routes.susu().nested().schedule(params.communityId))} className="d-flex align-items-center gap-1 btn btn-sm btn-primary text-nowrap fw-bold" disabled={susu?.attributes?.pendingStart} style={{minWidth: 150}}>
                                <GrSchedules />
                                <span>Schedule</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-4 m-0 p-1">
                </div>
            </div>

            {susu && <SusuCard susu={susu} />}

            <ShareSocialMediaOverlay
                show={openSusuInvite}
                onClose={()=>setOpenSusuInvite(false)}
                referenceId={susu?.id}
                isSusu={true}
            />
            <CommenceSusuOverlay
                isOpen={openCommenceSusu}
                onClose={()=>setOpenCommenceSusu(false)}
                onResponse={setSusu}
            />
        </div>
    )
}