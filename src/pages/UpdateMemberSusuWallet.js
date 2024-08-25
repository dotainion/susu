import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { routes } from "../routes/Routes";
import { api } from "../request/Api";
import $ from 'jquery';
import { utils } from "../utils/Utils";

export const UpdateMemberSusuWallet = () =>{
    const [susu, setSusu] = useState();
    const [schedules, setSchedules] = useState([]);
    const [member, setMember] = useState();
    const [dueDate, setDueDate] = useState();
    const [showCustom, setShowCustom] = useState(false);
    const [contributions, setContributions] = useState([]);
    const [price, setPrice] = useState({payments: 0, refunds: 0, payouts: 0});
    const [extimatedTotalPayout, setExtimatedTotalPayout] = useState(0);

    const params = useParams();
    const navigate = useNavigate();

    const contributionRef = useRef();

    const addContribution = () =>{
        api.contribution.add(susu.id, params.memberId, susu.attributes.contribution).then((response)=>{
            setContributions((contributs)=>[response.data.data[0], ...contributs]);
        }).catch((error)=>{
            console.log(error);
        });
    }

    const addCustomContribution = () =>{
        if(parseFloat(contributionRef.current.value || 0) <= 0){
            return console.error('Contribution cannot be under zero.');
        }
        api.contribution.add(susu.id, params.memberId, contributionRef.current.value).then((response)=>{
            setShowCustom(false);
            setContributions((contributs)=>[response.data.data[0], ...contributs]);
        }).catch((error)=>{
            console.log(error);
        });
    }

    useEffect(()=>{
        api.susu.active(params.groupId).then((response)=>{
            setSusu(response.data.data[0]);
        }).catch((error)=>{

        });

        $(document).on('click', ()=>setShowCustom(false));
    }, []);

    useEffect(()=>{
        if(!susu) return;
        api.user.user(params.memberId).then((response)=>{
            setMember(response.data.data[0]);
        }).catch((error)=>{

        });
        api.contribution.listContributions(susu.id, params.memberId).then((response)=>{
            setContributions(response.data.data);
        }).catch((error)=>{

        });
        api.schedule.list(params.groupId).then((response)=>{
            setSchedules(response.data.data);
            setExtimatedTotalPayout((response.data.data.length * parseFloat(susu.attributes.contribution || 0)) * susu.attributes.accurance);
            setDueDate(response.data.data.find((sch)=>sch.attributes.memberId === params.memberId));
        }).catch((error)=>{

        });
    }, [susu]);

    useEffect(()=>{
        let priceObject = {payments: 0, refunds: 0, payouts: 0};
        contributions.forEach((history)=>{
            if(history.type === 'contribution') priceObject.payments += parseFloat(history.attributes.contribution || 0);
            if(history.type === 'refund') priceObject.refunds += parseFloat(history.attributes.amount || 0);
            if(history.type === 'payout') priceObject.payouts += parseFloat(history.attributes.amount || 0);
        });
        setPrice(priceObject);
    }, [contributions]);

    return(
        <div className="container">
            <div className="d-flex align-items-center w-100 text-nowrap mt-3">
                <div className="h4 w-100">Contribution Management</div>
                <button onClick={()=>navigate(routes.susu().nested().groupSusuWallet(params.groupId))} className="btn btn-sm mx-1">Back to Group Wallet</button>
            </div>
            <div className="my-3">Credit Line Details: Overview</div>
            <div className="d-block d-md-flex w-100 shadow-sm bg-light rounded-4 p-4">
                <div className="w-100">
                    <div>
                        <button 
                            onClick={()=>navigate(routes.susu().nested().member(params.memberId))} 
                            className="btn bg-transparent shadow-none border-0 mb-3 text-decoration-underline link-primary pointer p-0"
                        >{member?.attributes?.firstName} {member?.attributes?.lastName}</button>
                        <div className="d-flex">
                            <div className="w-50">
                                <div>Susu Credit Line</div>
                                <div className="h3">${parseFloat(susu?.attributes?.contribution || 0).toFixed(2)}</div>
                            </div>
                            <div className="w-50">
                                <div className="small"><small>Extimated total payout</small></div>
                                <div className="small"><small>${extimatedTotalPayout.toFixed(2)}</small></div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex my-3">
                        <progress className="w-100 p-3 me-1" value={price.payments} max={extimatedTotalPayout} />
                        <progress className="w-100 p-3 mx-1" value={price.refunds} max={extimatedTotalPayout} />
                        <progress className="w-100 p-3 ms-1" value={price.payouts} max={extimatedTotalPayout} />
                    </div>
                    <div className="d-flex w-100">
                        <div className="w-50">
                            <div className="small"><GoDotFill/> Payments</div>
                            <div className="fw-bold">{price.payments.toFixed(2)}</div>
                        </div>
                        <div className="w-50">
                            <div className="small"><GoDotFill/> Refunds</div>
                            <div className="fw-bold">{price.refunds.toFixed(2)}</div>
                        </div>
                        <div className="w-50">
                            <div className="small"><GoDotFill/> Payouts</div>
                            <div className="fw-bold">{price.payouts.toFixed(2)}</div>
                        </div>
                    </div>
                </div>
                <div className="border border danger mx-3 d-none d-md-block"></div>
                <div className="border border danger my-4 d-block d-md-none"></div>
                <div className="text-nowrap">
                    <div>Credit Statement</div>
                    <div className="d-flex w-100 my-4">
                        <div className="w-50">
                            <div className="small">Total Payment</div>
                            <div className="fw-bold">{price.payments.toFixed(2)}</div>
                        </div>
                        <div className="w-50">
                            <div className="small">Due Date</div>
                            {dueDate ? <div className="fw-bold">{utils.date.toLocalDate(dueDate.attributes.date)}</div> : null}
                        </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center position-relative">
                        <div className="me-5">View Details</div>
                        <div className="d-flex flex-column">
                            <button onClick={addContribution} className="btn btn-sm bg-sidebar px-3 mb-1">Add Contribution</button>
                            <button onClick={(e)=>{setShowCustom(true); e.stopPropagation();}} className="btn btn-sm btn-secondary px-3 mt-1">Custom Contribution</button>
                        </div>
                        {
                            showCustom 
                            ? <div className="bg-white rounded-3 position-absolute top-50 end-0 translate-middle-y shadow border" onClick={(e)=>e.stopPropagation()}>
                                <div className="d-flex align-items-center px-3 my-2">
                                    <input ref={contributionRef} className="form-control me-2 shadow-none" type="number" placeholder="Custom Contribution" min={0}/>
                                    <button onClick={addCustomContribution} className="btn btn-sm btn-secondary">Add</button>
                                </div>
                            </div>
                            : null
                        }
                    </div>
                </div>
            </div>
            <div className="text-secondary mt-5">History</div>
            <div>
                <table className="w-100">
                    <tbody>
                        {contributions.map((contribe, key)=>(
                            <tr className="border-bottom" key={key}>
                                <td className="py-2 small">{contribe.attributes.date}</td>
                                <td className="py-2 d-none d-sm-block">
                                    <div className="small">
                                        <div>Contribution</div>
                                        <div>${contribe.attributes.contribution}</div>
                                    </div>
                                </td>
                                <td className="py-2 small">
                                    {contribe.attributes.paid ? <span className="border border-success rounded-pill px-3 py-1">PAID</span> : null}
                                    {contribe.attributes.refunded ? <span className="border border-success rounded-pill px-3 py-1">REFUNDED</span> : null}
                                    {contribe.attributes.payout ? <span className="border border-success rounded-pill px-3 py-1">WITHDRAWAL</span> : null}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}