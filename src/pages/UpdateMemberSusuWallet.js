import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { routes } from "../routes/Routes";
import { api } from "../request/Api";
import $ from 'jquery';
import { utils } from "../utils/Utils";
import { Dropdown } from "../widgets/Dropdown";
import { ParseError } from "../utils/ParseError";
import { useAuth } from "../provider/AuthProvider";
import { Loader } from "../components/Loader";
import { useLayout } from "../layout/Layout";
import { mockData } from "../contents/MockData";
import { ProgressBar } from "../components/ProgressBar";
import { FaPlus, FaMinus, FaExchangeAlt, FaHistory, FaWallet, FaArrowUp, FaArrowDown, FaMinusCircle, FaPlusCircle } from "react-icons/fa";

export const UpdateMemberSusuWallet = () =>{
    const { user } = useAuth();
    const { setParams, setLayoutParams } = useLayout();

    const [susu, setSusu] = useState();
    const [memberSchedules, setMemberSchedules] = useState([]);
    const [member, setMember] = useState();
    const [errors, setErrors] = useState();
    const [showCustom, setShowCustom] = useState(false);
    const [contributions, setContributions] = useState([]);
    const [payouts, setPayouts] = useState([]);
    const [refunds, setRefunds] = useState([]);
    const [history, setHistory] = useState([]);
    const [price, setPrice] = useState({payments: 0, refunds: 0, payouts: 0});
    const [extimatedTotalPayout, setExtimatedTotalPayout] = useState(0);
    const [currentDateTime, setCurrentDateTime] = useState();
    const [loading, setLoading] = useState(true);

    const params = useParams();
    const navigate = useNavigate();

    const contributionRef = useRef();
    const intervalRef = useRef();

    const addContribution = () =>{
        setErrors(null);
        const data = {
            susuId: susu.id, 
            memberId: params.memberId, 
            contribution: susu.attributes.contribution,
            type: 'Cash'
        }
        api.contribution.add(data).then((response)=>{
            setContributions((contributs)=>[response.data.data[0], ...contributs]);
        }).catch((error)=>{
            setErrors(new ParseError().message(error));
        });
    }

    const addCustomContribution = () =>{
        if(parseFloat(contributionRef.current.value || 0) <= 0){
            return setErrors('Contribution cannot be under zero.');
        }
        const data = {
            susuId: susu.id, 
            memberId: params.memberId, 
            contribution: contributionRef.current.value,
            type: 'Cash'
        }
        api.contribution.add(data).then((response)=>{
            setShowCustom(false);
            setContributions((contributs)=>[response.data.data[0], ...contributs]);
        }).catch((error)=>{
            setErrors(new ParseError().message(error));
        });
    }

    useLayoutEffect(() => {
        setParams({communityId: params.communityId});
        return () => setLayoutParams({});
    }, []);

    useEffect(()=>{
        api.susu.active(params.communityId).then((response)=>{
            setSusu(response.data.data[0]);
        }).catch((error)=>{

        });

        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setCurrentDateTime(utils.date.toLocalDateTime(new Date()));
        }, 1000);

        $(document).on('click', ()=>setShowCustom(false));

        if(process.env.NODE_ENV === 'development'){
            setSusu(mockData.susu());
        }

        return()=>{
            clearInterval(intervalRef.current);
        }
    }, []);

    useEffect(()=>{
        if(!susu) return;

        let userLoading = true;
        let contributionLoading = true;
        let refundLoading = true;
        let payoutLoading = true;
        let scheduleLoading = true;

        const checkLoading = () =>{
            if(!userLoading, !contributionLoading, !refundLoading, !payoutLoading, !scheduleLoading){
                setLoading(false);
            }
        }

        api.user.user(params.memberId).then((response)=>{
            setMember(response.data.data[0]);
        }).catch((error)=>{

        }).finally(()=>{
            userLoading = false;
            checkLoading();
        });
        api.contribution.listContributions(susu.id, params.memberId).then((response)=>{
            setContributions(response.data.data);
        }).catch((error)=>{

        }).finally(()=>{
            contributionLoading = false;
            checkLoading();
        });
        api.refund.listRefunds(susu.id, params.memberId).then((response)=>{
            setRefunds(response.data.data);
        }).catch((error)=>{

        }).finally(()=>{
            refundLoading = false;
            checkLoading();
        });
        api.payout.listPayouts(susu.id, params.memberId).then((response)=>{
            setPayouts(response.data.data);
        }).catch((error)=>{

        }).finally(()=>{
            payoutLoading = false;
            checkLoading();
        });
        api.schedule.list(params.communityId).then((response)=>{
            setMemberSchedules(response.data.data.filter((sch)=>sch.attributes.memberId === params.memberId));
            setExtimatedTotalPayout((response.data.data.length * parseFloat(susu.attributes.contribution || 0)) * susu.attributes.accurance);
        }).catch((error)=>{

        }).finally(()=>{
            scheduleLoading = false;
            checkLoading();
        });
    }, [susu]);

    useEffect(()=>{
        let priceObject = {payments: 0, refunds: 0, payouts: 0};
        refunds.forEach((refund)=> priceObject.refunds += parseFloat(refund.attributes.amount || 0));
        payouts.forEach((payout)=>priceObject.payouts += parseFloat(payout.attributes.amount || 0));
        contributions.forEach((contribution)=>priceObject.payments += parseFloat(contribution.attributes.contribution || 0));
        setPrice(priceObject);
        setHistory([...refunds, ...payouts, ...contributions].sort((a, b)=>new Date(a.attributes.date) - new Date(b.attributes.date)).reverse());
    }, [contributions, payouts, refunds]);


    const balance = 2450.75;
    const transactions = [
      { id: 1, type: "deposit", amount: 1500, date: "2025-05-01", method: "Bank Transfer" },
      { id: 2, type: "withdrawal", amount: 500, date: "2025-05-03", method: "Mobile Money" },
      { id: 3, type: "transfer", amount: 200, date: "2025-05-05", recipient: "John Doe" },
    ];

    if(loading) return <Loader keepAlive center/>

    if(!susu || !user || susu?.attributes?.owner?.id !== user?.id){
        /*return(
            <div className="container my-5">
                <div className="alert alert-danger h4">You are not authorize to assign schedules</div>
            </div>
        )*/
    }

    return(
        <div className="container py-5">
            <div className="d-block d-sm-flex align-items-center w-100 text-nowrap mt-3">
                <div className="h4 w-100">Contribution Management</div>
                <button onClick={()=>navigate(routes.susu().nested().contributors(params.communityId))} className="btn btn-sm mx-1">Participants</button>
                <button onClick={()=>navigate(routes.susu().nested().memberSusuHistory(susu.id, params.memberId))} className="btn btn-sm mx-1">Contribution history</button>
            </div>
            <div className="my-3">Credit Line Details: Overview</div>
            <div className="d-block d-md-flex w-100 bg-light rounded-4 p-4">
                <div className="w-100">
                    <div>
                        <button 
                            onClick={()=>navigate(routes.susu().nested().member(params.memberId))} 
                            className="btn bg-transparent shadow-none border-0 mb-3 text-decoration-underline link-primary pointer p-0"
                        >{member?.attributes?.firstName} {member?.attributes?.lastName}</button>
                        <div className="d-flex">
                            <div className="w-50">
                                <div>Susu Credit Line</div>
                                <div className="h3">${parseFloat(susu.attributes.contribution || 0).toFixed(2)}</div>
                            </div>
                            <div className="w-50">
                                <div className="small"><small>Extimated total payout</small></div>
                                <div className="small"><small>${extimatedTotalPayout.toFixed(2)}</small></div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex gap-3 my-3">
                        <div className="flex-fill">
                            <div className="small"><GoDotFill/> Payments</div>
                            <ProgressBar className="w-100" value={price.payments} ymax={extimatedTotalPayout} inBackground>
                                {(percent)=>`${percent}%`}
                            </ProgressBar>
                            <div className="fw-bold">{price.payments.toFixed(2)}</div>
                        </div>
                        <div className="flex-fill">
                            <div className="small"><GoDotFill/> Refunds</div>
                            <ProgressBar className="w-100" value={price.refunds} ymax={extimatedTotalPayout} inBackground>
                                {(percent)=>`${percent}%`}
                            </ProgressBar>
                            <div className="fw-bold">{price.refunds.toFixed(2)}</div>
                        </div>
                        <div className="flex-fill">
                            <div className="small"><GoDotFill/> Payouts</div>
                            <ProgressBar className="w-100" value={price.payouts} ymax={extimatedTotalPayout} inBackground>
                                {(percent)=>`${percent}%`}
                            </ProgressBar>
                            <div className="fw-bold">{price.payouts.toFixed(2)}</div>
                        </div>
                    </div>
                </div>
                <div className="border border danger mx-3 d-none d-md-block"></div>
                <div className="border border danger my-4 d-block d-md-none"></div>
                <div className="text-nowrap">
                    <div className="d-flex">
                        <div className="w-100">Credit Statement</div>
                        <a onClick={()=>navigate(routes.susu().nested().refund(susu?.id, params.memberId))} className="link-primary pointer">Add Refund</a>
                    </div>
                    {errors ? <div className="alert alert-danger border-0 py-1">{errors}</div> : null}
                    <div className="d-flex justify-content-center w-100 my-4">
                        <div className="me-3 w-100">
                            <div className="small">Total Payment</div>
                            <div className="fw-bold">{(price.payments - price.refunds).toFixed(2)}</div>
                        </div>
                        <div className="w-auto">
                            <div className="small">Current Time</div>
                            <div className="small">{currentDateTime}</div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center position-relative">
                        <div className="me-5">View Details</div>
                        <div className="d-flex flex-column">
                            <div className="small text-muted fw-bold">Cash payment</div>
                            <div className="dropdown">
                                <button className="btn btn-sm bg-sidebar w-100 px-3 mb-1" id="contribution1" data-bs-toggle="dropdown" aria-expanded="false">Add Contribution</button>
                                <ul className="dropdown-menu text-smallshadow" aria-labelledby="contribution1">
                                    <li><a onClick={addContribution} className="dropdown-item bg-success text-light pointer">Confirm payment</a></li>
                                </ul>
                            </div>
                            <button onClick={(e)=>{setShowCustom(true); e.stopPropagation();}} className="btn btn-sm btn-secondary px-3 mt-1">Custom Contribution</button>
                            <hr></hr>
                            <button onClick={()=>navigate(routes.susu().nested().payment(susu?.id, params.communityId, params.memberId))} className="btn btn-sm btn-primary px-3 mt-1">Card Payment</button>
                        </div>
                        {
                            showCustom 
                            ? <div className="bg-white rounded-3 position-absolute top-50 end-0 translate-middle-y shadow border" onClick={(e)=>e.stopPropagation()}>
                                <div className="d-flex align-items-center px-3 my-2">
                                    <input ref={contributionRef} className="form-control me-2 shadow-none" type="number" placeholder="Custom Contribution" min={0}/>
                                    <div className="dropdown">
                                        <button className="btn btn-sm btn-secondary" id="customContribution1" data-bs-toggle="dropdown" aria-expanded="false">Add</button>
                                        <ul className="dropdown-menu text-smallshadow" aria-labelledby="customContribution1">
                                            <li><a onClick={addCustomContribution} className="dropdown-item bg-success text-light pointer">Confirm payment</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            : null
                        }
                    </div>
                </div>
            </div>
            <div className="text-secondary mt-5">History</div>
            <div className="bg-light">
                <table className="table w-100">
                    <tbody>
                        {history.map((his)=>(
                            <tr className="border-bottom" key={his.id}>
                                <td className="bg-transparent py-2 small">{utils.date.toLocalDateTime(his.attributes.date)}</td>
                                <td className="bg-transparent py-2 d-none d-sm-block small">${his.attributes?.contribution || his.attributes?.amount}</td>
                                <td className="bg-transparent py-2 small">
                                    {his.type === 'contribution' ? <span className="border border-success rounded-pill px-3 py-1 small">PAID</span> : null}
                                    {his.type === 'refund' ? <span className="border border-danger rounded-pill px-3 py-1 small">REFUND</span> : null}
                                    {his.type === 'payout' ? <span className="border border-primary rounded-pill px-3 py-1 small">PAYOUT</span> : null}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}