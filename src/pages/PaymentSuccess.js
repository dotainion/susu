import { useEffect, useState } from "react";
import { api } from "../request/Api";
import { useParams } from "react-router-dom";
import { ParseError } from "../utils/ParseError";
import { Loader } from "../components/Loader";
import { routes } from "../routes/Routes";

export const PaymentSuccess = () =>{
    const [receipt, setReceipt] = useState();
    const [charge, setCharge] = useState();
    const [errors, setErrors] = useState();

    const params = useParams();

    useEffect(()=>{
        api.payment.paymentReceipt(params.paymentIntentId).then((response)=>{
            setReceipt(response.data.data[0]);
            setCharge(response.data.data[0].attributes.charges[0]);
        }).catch((error)=>{
            setErrors(new ParseError().message(error));
        });
    }, []);

    if(errors) return <div className="alert alert-danger my-5">{errors}</div>

    if(!receipt || !charge) return <Loader keepAlive center/>

    return(
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-sm w-100" style={{maxWidth: '500px'}}>
                <div className="card-body text-center">
                    <h1 className="text-success mb-4"><i className="bi bi-check-circle"></i> Payment Successful!</h1>
                    <p className="lead mb-4">Your payment has been successfully processed.</p>

                    <table className="table text-break mb-3">
                        <tbody>
                            <tr>
                                <td colSpan={2}>Payment Details</td>
                            </tr>
                            <tr>
                                <td>Amount Paid:</td>
                                <td>${receipt.attributes.amount}</td>
                            </tr>
                            <tr>
                                <td>Payment Date:</td>
                                <td>{new Date(receipt.attributes.date).toLocaleDateString()}</td>
                            </tr>
                            <tr>
                                <td>Transaction ID:</td>
                                <td>{charge.id}</td>
                            </tr>
                        </tbody>
                    </table>

                    <p className="mb-4">Thank you for your contribution to the group!</p>

                    <div className="d-flex flex-wrap gap-2">
                        <a href={charge.attributes.url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-success">View Receipt</a>
                        <a href={routes.susu().nested().updateMemberSusuWallet(params.susuId, params.memberId)} className="btn btn-sm btn-success">Return to Homepage</a>
                    </div>
                </div>
            </div>
        </div>
    )
}