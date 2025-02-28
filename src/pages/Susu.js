import { useEffect, useState } from "react";
import { FaShareAlt } from "react-icons/fa";
import { CommenceSusuOverlay } from "../components/CommenceSusuOverlay";
import { api } from "../request/Api";
import { ParseError } from "../utils/ParseError";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { routes } from "../routes/Routes";
import { ShareSocialMediaOverlay } from "../components/ShareSocialMediaOverlay";
import { Loader } from "../components/Loader";

export const Susu = () =>{
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

    useEffect(() => {
        api.susu.active(params.communityId).then((response)=>{
            setSusu(response.data.data[0]);
        }).catch((error)=>{
            setSusu(null);
        }).finally(()=>{
            setLoading(false);
        });
    }, [location]);

    if(loading) return <Loader center />;

    return(
        <div className="container">
            <div className="d-flex justify-content-end pt-3">
                <button onClick={()=>setOpenSusuInvite(true)} className="btn btn-sm"><FaShareAlt/> Share</button>
            </div>
            <hr></hr>
            <div className="mb-3">
                {
                    susu
                    ? <div className="m-auto w-50 w-sm-100 my-3">A susu is currently active, and members are contributing to the pooled fund as per the established schedule.</div>
                    : <>
                        <div className="text-center">
                            <button onClick={()=>setOpenCommenceSusu(true)} className="btn btn-sm btn-success fw-bold p-3">Commence susu</button>
                        </div>
                        <div className="m-auto w-50 w-sm-100 mt-3">Initiates a new Susu by setting up the group, defining contribution amounts, frequency, and member requirements. Once the group is created, members can join and begin contributing, marking the official start of the pooling process.</div>
                    </>
                }
            </div>
            
            <hr></hr>

            {errors ? <div className="alert alert-danger small border-0">{errors}</div> : null}
                    
            <div className={`d-flex flex-wrap justify-content-center ${susu ? '' : 'opacity-50'}`}>
                {
                    susu?.attributes?.pendingStart
                    ? <div className="col-12 col-lg-4 m-0 p-1">
                        <div className="d-flex flex-column border h-100 p-3">
                            <div className="mb-auto">Confirms a user’s participation in the Susu after two or more members join, finalizing their membership and starting the pooling.</div>
                            <div className="d-flex justify-content-end mt-3">
                                <button onClick={confirms} className="btn btn-sm btn-success text-nowrap fw-bold" disabled={!susu} style={{minWidth: 150}}>Apply & Confirm</button>
                            </div>
                        </div>
                    </div>
                    : <div className="col-12 col-lg-4 m-0 p-1">
                        <div className="d-flex flex-column border h-100 p-3">
                            <div className="mb-auto">The Susu is currently active, with the pooling process underway and members contributing.</div>
                            <div className="d-flex justify-content-end mt-3">
                                <div className="text-nowrap fw-bold text-success" style={{minWidth: 150}}>Susu in progress</div>
                            </div>
                        </div>
                    </div>
                }
                <div className="col-12 col-lg-4 m-0 p-1">
                    <div className="d-flex flex-column border h-100 p-3">
                        <div className="mb-auto">Cancel a Susu activity, halting members contributions and participation in the susu.</div>
                        <div className="d-flex justify-content-end mt-3">
                            <div className="dropdown">
                                <button className="btn btn-sm btn-danger text-nowrap fw-bold" id="cancelSusu1" disabled={!susu} data-bs-toggle="dropdown" aria-expanded="false" style={{minWidth: 150}}>Cancel Susu</button>
                                <ul className="dropdown-menu" aria-labelledby="cancelSusu1">
                                    <li><a onClick={cancel} className="dropdown-item pointer">Confirm Cancelation</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-4 m-0 p-1">
                    <div className="d-flex flex-column border h-100 p-3">
                        <div className="mb-auto">Allows the administrator to view and manage members, track contributions, and make updates to the Susu details.</div>
                        <div className="d-flex justify-content-end mt-3">
                            <button onClick={()=>navigate(routes.susu().nested().contributionAndPayments(params.communityId, susu.id))} className="btn btn-sm btn-secondary text-nowrap fw-bold" disabled={!susu} style={{minWidth: 150}}>Contributors & Pay</button>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-4 m-0 p-1">
                    <div className="d-flex flex-column border h-100 p-3">
                        <div className="mb-auto">Remove a susu susu member, this might halting the pooling process and ending the susu activity.</div>
                        <div className="d-flex justify-content-end mt-3">
                            <button onClick={()=>navigate(routes.susu().nested().susuMembers(params.communityId, susu.id))} className="btn btn-sm btn-danger text-nowrap fw-bold" disabled={!susu} style={{minWidth: 150}}>Remove a members</button>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-4 m-0 p-1">
                    <div className="d-flex flex-column border h-100 p-3">
                        <div className="mb-auto">This action sets the timing for member contributions and payouts, defining the frequency and when funds are collected or distributed within the Susu.</div>
                        <div className="d-flex justify-content-end mt-3">
                            <button onClick={()=>navigate(routes.susu().nested().schedule(params.communityId))} className="btn btn-sm btn-primary text-nowrap fw-bold" disabled={susu?.attributes?.pendingStart} style={{minWidth: 150}}>Schedule</button>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-4 m-0 p-1">
                </div>
            </div>

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