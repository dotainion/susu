import { Fragment, useEffect, useRef, useState } from "react";
import { api } from "../request/Api";
import { ParseError } from "../utils/ParseError";
import { useNavigate, useParams } from "react-router-dom";
import { utils } from "../utils/Utils";
import { Loader } from "../components/Loader";
import { routes } from "../routes/Routes";
import { mockData } from "../contents/MockData";
import { RiRefund2Fill } from "react-icons/ri";
import { TbCreditCardRefund } from "react-icons/tb";
import { BsCashCoin } from "react-icons/bs";
import { FaCreditCard } from "react-icons/fa";

export const ContributionRefund = () =>{
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const [custom, setCustom] = useState();
    const [refunds, setRefunds] = useState([]);
    const [contributions, setContributions] = useState([]);
    const [selected, setSelected] = useState();
    const [amount, setAmount] = useState();
    const [reason, setReason] = useState();
    const [loading, setLoading] = useState(true);

    const params = useParams();
    const navigate = useNavigate();

    const addRefund = () =>{
        setError(null);
        if(!selected) return setError('Must first select a contribution.');
        const data = {
            susuId: params.susuId,
            memberId: params.memberId,
            amount: amount,
            reason: reason,
            contributionId: selected.id,
            type: 'Cash'
        }
        api.refund.add(data).then((response)=>{
            setRefunds((rfds)=>[response.data.data[0], ...rfds]);
        }).catch((error)=>{
            setError(new ParseError().message(error));
        });
    }

    const onSelect = (contribute) =>{
        setSelected(contribute);
        setError('');
        setSuccess('');
        setAmount(contribute.attributes.contribution);
    }

    useEffect(()=>{
        let contributionLoading = true;
        let refundsLoading = true;
    
        api.contribution.listContributions(params.susuId, params.memberId).then((response)=>{
            setContributions(response.data.data.sort((a, b)=>new Date(a.attributes.date) - new Date(b.attributes.date)).reverse());
        }).catch((error)=>{

        }).finally(()=>{
            contributionLoading = false;
            if(!contributionLoading && !refundsLoading){
                setLoading(false);
            }
        });
        api.refund.listRefunds(params.susuId, params.memberId).then((response)=>{
            setRefunds(response.data.data.sort((a, b)=>new Date(a.attributes.date) - new Date(b.attributes.date)).reverse());
        }).catch((error)=>{

        }).finally(()=>{
            refundsLoading = false;
            if(!contributionLoading && !refundsLoading){
                setLoading(false);
            }
        });
        if(process.env.NODE_ENV === 'development'){
            setRefunds(mockData.refunds());
            setContributions(mockData.contributions());
        }
    }, []);

    if(loading) return <Loader show/>

    return(
        <div className="container py-5">
            <div className="h4 text-center my-4">Refund Management</div>
            <hr></hr>

            <div className="row g-3">
                <div className="col-md-4">
                    <div className="card border h-100">
                        <div className="card-header border-0">
                            <strong>Contributions</strong>
                        </div>
                        <ul className="list-group list-group-flush overflow-auto" style={{maxHeight: '80vh'}}>
                            {contributions.length === 0 && (
                                <li className="list-group-item text-muted">No contributions available.</li>
                            )}
                            {contributions.map((contribute) => (
                                <li onClick={()=>onSelect(contribute)} className={`list-group-item list-group-item-action pointer ${selected?.id === contribute.id ? 'active text-white' : ''}`} key={contribute.id}>
                                    <div className="d-flex justify-content-between">
                                        <span className="fw-semibold">{contribute.attributes.user.attributes.firstName} {contribute.attributes.user.attributes.lastName}</span>
                                        <strong>${contribute.attributes.contribution.toFixed(2)}</strong>
                                    </div>
                                    <small className="text-muted">{utils.date.toLocalDate(contribute.attributes.date)}</small>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="col-md-8">
                    <div className="card border h-100">
                        <div className="card-header border-0">
                            <strong>Refund Details</strong>
                        </div>
                        <div className="card-body">
                            {!selected ? (
                                <p className="text-muted">Select a contribution to begin the refund process.</p>
                            ) : (
                                <Fragment>
                                    <div className="d-flex justify-content-end">
                                        {
                                            selected.attributes.paymentIntentId
                                                ? <span className="badge bg-primary me-2 text-uppercase"><FaCreditCard className="me-2"/>Card</span>
                                                : <span className="badge bg-secondary me-2 text-uppercase"><BsCashCoin className="me-2"/>Cash</span>
                                        }
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-sm-6"><strong>Member:</strong> {selected.attributes.user.attributes.firstName} {selected.attributes.user.attributes.lastName}</div>
                                        <div className="col-sm-6"><strong>Amount:</strong> ${selected.attributes.contribution.toFixed(2)}</div>
                                        <div className="col-sm-6"><strong>Date:</strong> {utils.date.toLocalDate(selected.attributes.date)}</div>
                                        {selected.attributes.paymentIntentId && (
                                            <div className="col-sm-6"><strong>Payment ID:</strong> {selected.attributes.paymentIntentId}</div>
                                        )}
                                    </div>

                                    <div>
                                        <div className="mb-3">
                                            <label htmlFor="reason" className="form-label">Refund Reason</label>
                                            <textarea onChange={(e)=>setReason(e.target.value)} className="form-control resize-none" rows="3" placeholder="Why are you refunding this contribution?" id="reason"></textarea>
                                            <div className="mt-3 user-select-none">
                                                <div className="d-flex align-items-center mb-2">
                                                    <input onChange={e=>setCustom(e.target.checked)} className="form-check-input pointer ms-0 mt-0 me-1" checked={custom} type="checkbox" id="customerCheck"/>
                                                    <label htmlFor="customerCheck" className="form-label pointer mb-0">Add custom refund</label>
                                                </div>
                                                <div className={`bg-light p-2 rounded-3 border ${custom ? '' : 'd-none'}`}>
                                                    <label htmlFor="customAmount" className="form-label">Custom amount</label>
                                                    <input onChange={(e)=>setAmount(e.target.value)} className="form-control" value={amount} type="number" id="customAmount" />
                                                </div>
                                                <div className={`border rounded-3 p-2 ${custom ? 'd-none' : ''}`}>
                                                    <label htmlFor="customAmount" className="form-label">Contribution amount</label>
                                                    <div>${selected.attributes.contribution.toFixed(2)}</div>
                                                </div>
                                            </div>
                                        </div>

                                        {error && <div className="alert alert-danger">{error}</div>}
                                        {success && <div className="alert alert-success">{success}</div>}
                                        {
                                            selected.attributes.paymentIntentId.trim()
                                            ? <button onClick={()=>navigate(routes.susu().nested().cardRefund(params.susuId, params.memberId, selected.id))} className="d-flex align-items-center btn btn-sm btn-primary" type="button">
                                                <TbCreditCardRefund className="me-2"/>
                                                <span>Refund card payment</span>
                                            </button>
                                            : <div className="dropdown">
                                                <button className="d-flex align-items-center btn btn-sm btn-primary" id="customContribution1" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <RiRefund2Fill className="me-2"/>
                                                    <span>Add Refund</span>
                                                </button>
                                                <ul className="dropdown-menu text-smallshadow" aria-labelledby="customContribution1">
                                                    <li><a onClick={addRefund} className="dropdown-item bg-success text-light pointer">Confirm Refund</a></li>
                                                </ul>
                                            </div>
                                        }
                                    </div>
                                </Fragment>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-secondary mt-4">History</div>
            <div className="row g-3">
                {refunds.map((refund) => (
                    <div className="col-md-6 col-lg-4" key={refund.id}>
                        <div className="card overflow-hidden rounded-3 border-0 shadow-sm h-100">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start mb-1">
                                    <span className="text-muted small">{utils.date.toLocalDate(refund.attributes.date)}</span>
                                    <span className="badge bg-success fs-6">${refund.attributes.amount.toFixed(2)}</span>
                                </div>
                                <div className="fw-semibold text-muted mb-2">{refund.attributes.user?.attributes?.firstName} {refund.attributes.user?.attributes?.lastName}</div>
                                <div className="bg-light rounded-3 px-1">{refund.attributes.description}</div>
                                <div className="d-flex justify-content-end mt-1">
                                    <span className="badge bg-secondary text-uppercase">{refund.attributes.type}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}