import React, { useState, useEffect, useRef } from 'react';
import { api } from '../request/Api';
import { useNavigate, useParams } from 'react-router-dom';
import paymentImg from '../images/card-payment.png';
import $ from 'jquery';
import { ParseError } from '../utils/ParseError';
import { Loader } from '../components/Loader';

const TYPE = {
    FULL: 'FULL',
    PARTIAL: 'PARTIAL'
}

export const PaymentRefund = () => {
    const [errors, setErrors] = useState();
    const [loading, setLoading] = useState(false);
    const [contribution, setContribution] = useState();
    const [amount, setAmount] = useState();

    const params = useParams();
    const navigate = useNavigate();

    const partialElementRef = useRef();

    const onRefund = async(e) =>{
        try{
            e.preventDefault();
            setLoading(true);

            const response = await api.refund.card({
                amount: amount,
                paymentIntentId: params.paymentIntentId
            });
            console.log(response.data.data[0]);
            
            const refundResponse = await api.refund.add({
                susuId: params.susuId,
                memberId: params.memberId,
                amount: amount,
                contributionId: contribution.id,
                type: 'Card'
            });
            console.log(refundResponse.data.data[0]);
        }catch(error){
            setErrors(new ParseError().message(error));
        }finally{
            setLoading(false);
        }
    }

    const onTypeChange = (e) =>{
        if(e.target.value === TYPE.FULL){
            $(partialElementRef.current).hide('fast');
            $(partialElementRef.current).find('input').attr('required', true);
            setAmount(null);
        }else if (e.target.value === TYPE.PARTIAL){
            $(partialElementRef.current).show('fast');
            $(partialElementRef.current).find('input').removeAttr('required');
            setAmount($(partialElementRef.current).find('input').val());
        }
    }

    useEffect(() => {
        api.contribution.contribution().then((response)=>{
            setContribution(response.data.data[0]);
        }).catch((error)=>{
            setErrors(new ParseError().message(error));
        });
    }, []);

    if(!contribution) return <Loader center/>

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-12 border p-3 rounded-3 mt-3" style={{maxWidth: '500px'}}>
                    <div className="h4 mb-3">Refund Payment</div>

                    <div className="mb-3" style={{height: '200px'}}>
                        <img className="w-100 h-100" src={paymentImg}/>
                    </div>
                    
                    <hr></hr>

                    <table className="table bg-transparent-">
                        <tbody>
                            <tr>
                                <td className="bg-transparent border-0 px-0">Payment ID</td>
                                <td className="bg-transparent border-0 px-0">136842315</td>
                            </tr>
                            <tr>
                                <td className="bg-transparent border-0 px-0">Order ID</td>
                                <td className="bg-transparent border-0 px-0">136842315</td>
                            </tr>
                        </tbody>
                    </table>

                    <form onSubmit={onRefund} onKeyUp={()=>setErrors(null)}>
                        <label className="d-flex align-items-center py-1">
                            <input onChange={onTypeChange} style={{width: '20px', height: '20px'}} name="payment-amount" value={TYPE.FULL} type="radio" required/>
                            <span className="ms-2">Full refund ({contribution.attributes.contribution})</span>
                        </label>
                        <div>
                            <label className="d-flex align-items-center py-1">
                                <input onChange={onTypeChange} style={{width: '20px', height: '20px'}} name="payment-amount" value={TYPE.PARTIAL} type="radio" required/>
                                <span className="ms-2">Partial refund</span>
                            </label>
                            <div ref={partialElementRef} style={{display: 'none'}}>
                                <input onChange={(e)=>setAmount(e.target.value)} className="form-control" placeholder="Enter partial amount" />
                                <div className="small text-muted">Please enter the partial amount to be refunded.</div>
                            </div>
                        </div>

                        {errors ? <div className="py-2 text-danger">{errors}</div> : null}

                        <div className="d-flex justify-content-center">
                            <button className="btn btn-sm bg-primary mt-4 m-auto" type="submit" disabled={loading} style={{width: '200px'}}>
                                {loading 
                                    ? <div className="spinner-border spinner-border-sm text-white" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div> 
                                    : <span>Refund ${amount}</span> 
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}