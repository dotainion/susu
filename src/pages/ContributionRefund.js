import { useEffect, useRef, useState } from "react";
import { api } from "../request/Api";
import { ParseError } from "../utils/ParseError";
import { useParams } from "react-router-dom";
import { utils } from "../utils/Utils";
import $ from "jquery";

export const ContributionRefund = () =>{
    const [errors, setErrors] = useState();
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
            console.log(response.data.data);
            setContributions(response.data.data);
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
            <div className="d-block d-sm-flex w-100 m-auto p-4 rounded-4 bg-sec my-3" style={{maxWidth: '800px'}}>
                <div className="w-100">
                    <div className="fw-bold">Select a contribution to refun</div>
                    <select ref={contributionRef} className="form-control shadow-none overflow-auto" multiple style={{height: '300px', maxHeight: '300px'}}>
                        {contributions.map((payment)=>(
                            <option className="py-1 pointer" onClick={()=>onSelect(payment)} key={payment.id}>{utils.date.toLocalDate(payment.attributes.date)}</option>
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
                        <div className="small text-secondary"><small>Contribution: {selectedContribution?.attributes?.contribution || '0'}</small></div>
                        <button onClick={addRefund} className="btn btn-sm mt-3">Add refund</button>
                    </div>
                </div>
            </div>
        </div>
    )
}