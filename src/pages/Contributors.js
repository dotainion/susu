import { FaStar } from "react-icons/fa"
import { routes } from "../routes/Routes";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useLayoutEffect, useState } from "react";
import { api } from "../request/Api";
import { utils } from "../utils/Utils";
import { useAuth } from "../provider/AuthProvider";
import { ProgressBar } from "../components/ProgressBar";
import { useLayout } from "../layout/Layout";
import { ShareSocialMediaOverlay } from "../components/ShareSocialMediaOverlay";
import { mockData } from "../contents/MockData";

export const Contributors = () =>{
    const { user } = useAuth();
    const { setParams, setLayoutParams } = useLayout();

    const [susu , setSusu] = useState();
    const [members, setMembers] = useState([]);
    const [schedules, setSchedules] = useState([])
    const [openInvite, setOpenInvite] = useState(false);
    const [contributions, setContributions] = useState([]);
    const [percentage, setPercentage] = useState({max: 0, value: 0, percent: 0});
    const [consolidate, setConsolidate] = useState({total: null, balance: null, endDate: null});

    const params = useParams();
    const navigate = useNavigate();

    const randomBlueColor = () => {
        const hue = Math.floor(Math.random() * 50) + 200;
        const saturation = Math.floor(Math.random() * 20) + 70;
        const lightness = Math.floor(Math.random() * 20) + 60;
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

    const nextContribution = (memberId) =>{
        let index = null;
        const mbSched = schedules.find((sch)=>{
            index === null ? index = 0 : index ++;
            return !sch.attributes.contributions.find((cont)=>cont.attributes.memberId === memberId)
        });
        index === null ? index = 0 : index ++;
        const mbSched2 = schedules.find((_, i)=>index === i);
        if(!mbSched2) return 'NA';
        return utils.date.toLocalDate(mbSched2.attributes.date);
    }

    const expectedContribution = (memberId) =>{
        const mbSched = schedules.find((sch)=>{
            return !sch.attributes.contributions.find((cont)=>cont.attributes.memberId === memberId)
        });
        if(!mbSched) return 'NA';
        return utils.date.toLocalDate(mbSched.attributes.date);
    }

    const onMakePayment = (member) =>{
        if(susu?.attributes?.owner?.id !== user?.id){
            return navigate(routes.susu().nested().payment(susu.id, params.communityId, member.id));
        }
        navigate(routes.susu().nested().updateMemberSusuWallet(params.communityId, member.id));
    }

    useLayoutEffect(() => {
        setParams({communityId: params.communityId});
        return () => setLayoutParams({});
    }, []);

    useEffect(() => {
        api.susu.active(params.communityId).then((response)=>{
            setSusu(response.data.data[0]);
            setMembers(response.data.data[0].attributes.members || []);
        }).catch((error)=>{
            
        });
        api.schedule.list(params.communityId).then((response)=>{
            setSchedules(response.data.data);
        }).catch((error)=>{
            
        });
        if(process.env.NODE_ENV === 'development'){
            setMembers(mockData.susu().attributes.members);
            setSusu(mockData.susu());
        }
    }, []);

    useEffect(() => {
        if(!susu) return;
        api.contribution.list(susu.id).then((response)=>{
            setContributions(response.data.data);
        }).catch((error)=>{
            
        });
    }, [susu]);

    useEffect(() => {
        if(!susu) return;
        const totalExpectedContribution = (parseFloat(susu.attributes.contribution) * schedules.length) * susu.attributes.accurance;
        let totalContributions = 0;
        contributions.forEach((con)=>totalContributions += parseFloat(con.attributes.contribution));
        setConsolidate({
            total: totalExpectedContribution,
            balance: (totalExpectedContribution - totalContributions),
            endDate: utils.date.toLocalDate(schedules[schedules.length -1]?.attributes?.date),
        });
        setPercentage({
            max: totalExpectedContribution, 
            value: totalContributions, 
            percent: ((totalContributions / totalExpectedContribution) * 100) || 0
        });
    }, [contributions, schedules, susu]);

    return(
        <div className="container bg-white shadow-sm rounded-4 p-4 mt-4">
            <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="fw-bold text-dark mb-1">Contributors</h4>
                    <button onClick={()=>setOpenInvite(true)} className="btn btn-outline-primary btn-sm px-3 rounded-pill">Invite</button>
                </div>
                <small className="text-muted">Track financial progress and group activity</small>
            </div>

            {!susu && <div className="alert alert-danger">A susu cycle must be initiated before contributor information becomes available.</div>}

            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                <div>
                    <div className="text-uppercase text-muted small">Susu Credit Line</div>
                    <h2 className="fw-bold text-success">${parseFloat(susu?.attributes?.contribution || 0).toFixed(2)}</h2>
                </div>
                <div className="text-end">
                    <div className="text-uppercase text-muted small">Community Owner</div>
                    <div className="fw-semibold">{susu?.attributes?.owner?.attributes?.firstName} {susu?.attributes?.owner?.attributes?.lastName}</div>
                </div>
            </div>

            <div className="row text-secondary mb-4">
                <div className="col-md-4 mb-3">
                    <div className="text-uppercase small">Total Required</div>
                    <div className="fw-bold text-dark">${consolidate.total?.toFixed?.(2) || 0}</div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="text-uppercase small">Main Balance</div>
                    <div className="fw-bold text-dark">${consolidate.balance?.toFixed?.(2) || 0}</div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="text-uppercase small">Value Through</div>
                    <div className="fw-bold text-dark">{utils.date.toLocalDate(susu?.attributes?.startDate)} – {consolidate.endDate}</div>
                </div>
            </div>

            <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                <div>
                    <div className="text-uppercase small text-muted">Members</div>
                    <div className="fw-bold">{members.length} Total</div>
                </div>
                <div>
                    <div className="text-uppercase small text-muted">Completion</div>
                    <div className="fw-bold">{percentage.percent?.toFixed?.(2)}% – Ends {consolidate?.endDate}</div>
                </div>
            </div>
            
            <ProgressBar value={percentage.value} max={percentage.max} inBackground>{(percent)=><div>{percent}% complete</div>}</ProgressBar>
            <div className="d-flex justify-content-between align-items-center mt-5 mb-4">
                <h4 className="fw-bold text-dark mb-0">💸 Contributors</h4>
                <span className="text-muted fw-bold">{members.length} total</span>
            </div>
            <p>Please select a member from the list to apply their contribution. This ensures the correct records are updated and the transaction is properly attributed.</p>

            <div className="row">
                {
                    members.length ?
                    members.map((member) => (
                        <div key={member.id} className="col-md-6 col-lg-3 mb-4">
                            <div onClick={()=>onMakePayment(member)} className="bg-light border rounded-4 p-3 h-100 d-flex flex-column justify-content-between pointer" title="Click to make a contribution">
                                <div className="d-flex align-items-center mb-3">
                                    <div className="d-flex align-items-center justify-content-center rounded-circle me-3" style={{minWidth: '48px', maxWidth: '48px', minHeight: '48px', maxHeight: '48px', backgroundColor: randomBlueColor()}} title={`${user.attributes.firstName} ${user.attributes.lastName}`} >
                                        <div>{member.attributes.firstName?.[0]}{member.attributes.lastName?.[0]}</div>
                                    </div>
                                    <div>
                                        <div className="fw-semibold text-dark text-truncate">{member.attributes.firstName} {member.attributes.lastName}</div>
                                        <div className="text-muted small text-truncate">{member.attributes.email}</div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center small">
                                    <div className="small">
                                        <div className="small">Next Contribution</div>
                                        <small className="text-muted small">{nextContribution(member.id)}</small>
                                    </div>
                                    <div className="small">
                                        <div className="small">Expected Contribution</div>
                                        <span className="badge bg-success fw-semibold small">{expectedContribution(member.id)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )):
                    <div className="container bg-light border rounded-4 p-4 text-center mt-4">
                        <div className="mb-3">
                            <h5 className="fw-bold text-dark">No Contributors Yet</h5>
                            <p className="text-muted">
                                This susu cycle hasn’t received any contributions so far. Once members start contributing, you’ll see their details and progress.
                            </p>
                        </div>

                        <div className="d-flex justify-content-center">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/6598/6598510.png"
                                alt="No Contributors"
                                style={{ width: "120px", opacity: 0.6 }}
                            />
                        </div>

                        <div className="mt-4">
                            <button onClick={()=>setOpenInvite(true)} className="btn btn-outline-primary btn-sm">Invite Members to Contribute</button>
                        </div>
                    </div>
                }
            </div>

            <ShareSocialMediaOverlay
                show={openInvite}
                onClose={()=>setOpenInvite(false)}
                referenceId={susu?.id}
                isSusu={true}
            />
        </div>
    )
}