import { useEffect, useRef, useState } from "react";
import { api } from "../request/Api";
import { ParseError } from "../utils/ParseError";
import { useParams } from "react-router-dom";
import { utils } from "../utils/Utils";
import $ from "jquery";

export const ContributionRefund = () =>{
    const [errors, setErrors] = useState();
    const [refunds, setRefunds] = useState([]);
    const [contributions, setContributions] = useState([]);
    const [selectedContribution, setSelectedContribution] = useState();

    const params = useParams();
        
    const amountRef = useRef();
    const contributionRef = useRef();

    const addRefund = () =>{
        setErrors(null);
        if(!selectedContribution) return setErrors('Must first select a contribution.');
        const data = {
            susuId: params.susuId,
            memberId: params.memberId,
            amount: amountRef.current.value,
            contributionId: selectedContribution.id
        }
        api.refund.add(data).then((response)=>{
            setRefunds((rfds)=>[response.data.data[0], ...rfds]);
        }).catch((error)=>{
            setErrors(new ParseError().message(error));
        });
    }

    const onSelect = (payment) =>{
        setSelectedContribution(payment);
        amountRef.current.value = payment.attributes.contribution;
    }

    useEffect(()=>{
        api.contribution.listContributions(params.susuId, params.memberId).then((response)=>{
            setContributions(response.data.data.sort((a, b)=>new Date(a.attributes.date) - new Date(b.attributes.date)).reverse());
        }).catch((error)=>{

        });
        api.refund.listRefunds(params.susuId, params.memberId).then((response)=>{
            setRefunds(response.data.data.sort((a, b)=>new Date(a.attributes.date) - new Date(b.attributes.date)).reverse());
        }).catch((error)=>{

        });

        $(contributionRef.current).on('change', (e)=>{
            const options = Array.from(e.target.options).filter((option)=>option.selected);
            if (options.length > 1) {
                options.forEach((option)=>option.selected = false);
                options[0].selected = true;
            }
        });
    }, []);

    return(
        <div className="container">
            <div className="h4 text-center my-4">Refund Management</div>
            <hr></hr>
            <div className="m-auto" style={{maxWidth: '800px'}}>
                <div className="d-block d-sm-flex w-100 p-4 rounded-4 bg-light my-3">
                    <div className="w-100">
                        <div className="fw-bold">Select a contribution to refun</div>
                        <select ref={contributionRef} className="form-control shadow-none overflow-auto" multiple style={{height: '300px', maxHeight: '300px'}}>
                            {contributions.map((payment)=>(
                                <option className="py-1 pointer" onClick={()=>onSelect(payment)} key={payment.id}>{utils.date.toLocalDateTime(payment.attributes.date)} - ${payment?.attributes?.contribution}</option>
                            ))}
                        </select>
                    </div>
                    <div className="d-none d-sm-block mx-2"></div>
                    <div className="d-flex align-items-center w-100">
                        <div className="w-100">
                            <div className="d-sm-none d-block my-3"></div>
                            {errors ? <div className="alert alert-danger border-0 py-1">{errors}</div> : null}
                            <div className="">Add amount to refund</div>
                            <input ref={amountRef} className="form-control shadow-none w-100" placeholder="0.00"/>
                            <div className="small text-secondary"><small>Contribution: ${selectedContribution?.attributes?.contribution || '0'} {selectedContribution ? utils.date.toLocalDateTime(selectedContribution?.attributes?.date) : ''}</small></div>
                            <button onClick={addRefund} className="btn btn-sm mt-3">Add Refund</button>
                        </div>
                    </div>
                </div>
                <div className="text-secondary mt-5">History</div>
                <div className="bg-light">
                    <table className="w-100">
                        <tbody>
                            {refunds.map((refund)=>(
                                <tr className="border-bottom" key={refund.id}>
                                    <td className="py-2 small">{utils.date.toLocalDateTime(refund.attributes.date)}</td>
                                    <td className="py-2 d-none d-sm-block small">${refund.attributes.amount}</td>
                                    <td className="py-2 small">
                                        <span className="border border-danger rounded-pill px-3 py-1">REFUNDED</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}