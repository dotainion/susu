import { useEffect, useState } from "react";
import { ProgressBar } from "../components/ProgressBar";
import { FaUsers, FaMoneyBillWave, FaCalendarAlt, FaUserCircle, FaClock, FaShieldAlt } from "react-icons/fa";
import { api } from "../request/Api";
import { useNavigate, useParams } from "react-router-dom";
import { utils } from "../utils/Utils";
import { routes } from "../routes/Routes";
import { OwnerJoinSusuAlert } from "./OwnerJoinSusuAlert";

export const SusuCard = ({susu: susuProp}) =>{
    const [members, setMembers] = useState([]);
    const [susuMembers, setSusuMembers] = useState([]);
    const [susu, setSusu] = useState();
    const [schedules, setSchedules] = useState([]);
    const [totalExpected, setTotalExpected] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [contribution, setContribution] = useState([]);
    const [loading, setLoading] = useState(true);

    const params = useParams();
    const navigate = useNavigate();
    
    const StatusBadge = ({susu}) => {
        if(susu){
            if(susu.attributes.canceled) return <span className="badge bg-danger fs-6">Canceled</span>;
            if(susu.attributes.completed) return <span className="badge bg-primary fs-6">Completed</span>;
            if(susu.attributes.pendingStart === false && !susu.attributes.canceled && !susu.attributes.completed){
                return <span className="badge bg-success fs-6">Active</span>;
            }
        }
        return <span className="badge bg-secondary fs-6">Pending</span>;
    }

    const currentPayout = () =>{
        const today = new Date();
        let current = null;
        for (const item of schedules) {
            const date = new Date(item.attributes.date);
            if (date <= today) current = item;
            else break;
        }
        return current?.attributes?.date || null;
    }

    const nextPayout = () =>{
        const today = new Date();
        for (const item of schedules) {
            const date = new Date(item.attributes.date);
            if (date > today) return item.attributes.date;
        }
        return null;
    }

    useEffect(()=>{
        if(!susu) return;
        setSusuMembers(susu.attributes.members);
        const expected = (parseFloat(susu.attributes.contribution) * parseInt(susu.attributes.accurance)) * schedules.length;

        let payments = 0;
        contribution.forEach((c)=>payments += parseFloat(c.attributes.contribution));

        setTotalExpected(expected);
        setPercentage((payments / expected) * 100);
    }, [susu, schedules, contribution]);

    
    useEffect(()=>{
        if(!susu) return;
        api.contribution.list(susu.id).then((response)=>{
            setContribution(response.data.data);
        }).catch((error)=>{

        }).finally(()=>{
            
        });
    }, [susu]);
    
    useEffect(() => {
        let loadingSchedule = true;
        let loadingMembers = true;
        let loadingSusu = true;

        const handleLoading = () =>{
            if(!loadingMembers && !loadingSusu && !loadingSchedule){
                setLoading(false);
            }
        }
        
        if(susuProp){
            loadingSusu = false;
            setSusu(()=>susuProp);
        }else{
            api.susu.active(params.communityId).then((response)=>{
                setSusu(response.data.data[0]);
            }).catch((error)=>{

            }).finally(()=>{
                loadingSusu = false;
                handleLoading();
            });
        }
        api.user.byCommunity(params.communityId).then((response)=>{
            setMembers(response.data.data);
        }).catch((error)=>{
            
        }).finally(()=>{
            loadingMembers = false;
            handleLoading();
        });
        api.schedule.list(params.communityId).then((response)=>{
            setSchedules(response.data.data.sort((a, b)=>new Date(a.attributes.date) - new Date(b.attributes.date)));
        }).catch((error)=>{

        }).finally(()=>{
            loadingSchedule = false;
            handleLoading();
        });
    }, [susuProp]);
    
    if(loading || !susu) return null;

    return(
        <div className="card border-0 p-4 mb-4 rounded-4 mt-3">
            <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center mb-3">
                    <FaUsers className="me-2 text-primary" size={60} />
                    <div>
                        <h4 className="mb-0">Spice Up Savings – {utils.date.toLocalDate(susu.attributes.startDate)}</h4>
                        <small className="text-muted">{susu.attributes.cycle} Group Contributions</small>
                    </div>
                </div>
                <StatusBadge susu={susu}/>
            </div>
            <OwnerJoinSusuAlert susu={susu} />

            <p className="text-muted">
                A group of {members.length} trusted members contributes <strong>${susu.attributes.contribution}</strong> {susu.attributes.cycle}.
                One member receives the pooled amount. Transparent, secure,
                and automatic.
            </p>

            <div className="row text-secondary mb-4">
                <div className="col-md-4 mb-2">
                    <FaMoneyBillWave className="me-2 text-success" />
                    <strong>Contribution:</strong> ${susu.attributes.contribution}/{susu.attributes.cycle}
                </div>
                <div className="col-md-4 mb-2">
                    <FaCalendarAlt className="me-2 text-info" />
                    <strong>Current Payout:</strong> {currentPayout()}
                </div>
                <div className="col-md-4 mb-2">
                    <FaClock className="me-2 text-warning" />
                    <strong>Next Payment:</strong> {nextPayout()}
                </div>
            </div>Total Members

            <h6 className="fw-bold mb-3">Your Contribution Progress</h6>
            <ProgressBar value={percentage} max={totalExpected}>{(perc)=><div>{perc}% contributed</div>}</ProgressBar>

            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="p-3 border rounded-3">
                        <h6 className="mb-2">Payout Status</h6>
                        <span className="badge bg-secondary">Not Received</span>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="p-3 border rounded-3">
                        <h6 className="mb-2">Total Expected</h6>
                        <span className="text-success fw-bold">${totalExpected}</span>
                    </div>
                </div>
            </div>

            <h6 className="fw-bold mb-2">Susu Members {susuMembers.length}</h6>
            <div className="d-flex flex-wrap gap-3 mb-4">
                {susuMembers.slice(0, 5).map((member, idx) => (
                    <div onClick={()=>navigate(routes.susu().nested().member(member.id))} key={idx} className="d-flex align-items-center gap-2">
                        <FaUserCircle size={24} />
                        <span>{member.attributes.firstName} {member.attributes.lastName}</span>
                    </div>
                ))}
                {susu && susuMembers.length > 5 && (
                    <span onClick={()=>navigate(routes.susu().nested().susuMembers(susu.id, params.communityId))} className="text-muted">+{susuMembers.length - susuMembers.slice(0, 5)?.length} more</span>
                )}
            </div>

            <div className="alert alert-info d-flex align-items-center">
                <FaShieldAlt className="me-2" />
                All transactions are automated and securely processed via SusuSpice Wallet.
            </div>

            <hr className="my-4" />
            <div className="row text-secondary">
                <div className="col-md-3 mb-3">
                    <small className="text-uppercase fw-semibold">Total Members</small>
                    <h5 className="fw-bold text-dark mt-1">{members.length}</h5>
                </div>
                <div className="col-md-3 mb-3">
                    <small className="text-uppercase fw-semibold">Total Susu Members</small>
                    <h5 className="fw-bold text-dark mt-1">{susuMembers.length}</h5>
                </div>
                <div className="col-md-3 mb-3">
                    <small className="text-uppercase fw-semibold">Your Position</small>
                    <h5 className="fw-bold text-dark mt-1">{susuMembers.length} Recipient</h5>
                </div>
                <div className="col-md-3 mb-3">
                    <small className="text-uppercase fw-semibold">Contribution Frequency</small>
                    <h5 className="fw-bold text-dark mt-1">{susu.attributes.cycle} ${susu.attributes.contribution}</h5>
                </div>
            </div>
        </div>
    )
}