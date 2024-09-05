import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { routes } from "../routes/Routes";
import { FaStar } from "react-icons/fa";
import { api } from "../request/Api";

export const MemberSusuHistory = () =>{
    const [susu, setSusu] = useState();
    const [histories, setHistories] = useState([]);
    const [payouts, setPayouts] = useState([]);
    const [refunds, setRefunds] = useState([]);
    const [contributions, setContributions] = useState([]);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        api.susu.fetch(params.susuId).then((response)=>{
            setSusu(response.data.data[0]);
        }).catch((error)=>{

        });
    }, []);

    useEffect(()=>{
        api.contribution.listContributions(params.susuId, params.memberId).then((response)=>{
            setContributions(response.data.data);
        }).catch((error)=>{

        });
        api.payout.listPayouts(params.susuId, params.memberId).then((response)=>{
            setPayouts(response.data.data);
        }).catch((error)=>{

        });
        api.refund.listRefunds(params.susuId, params.memberId).then((response)=>{
            setRefunds(response.data.data);
        }).catch((error)=>{

        });
    }, []);

    useEffect(()=>{
        setHistories([...payouts, ...refunds, ...contributions].sort((a, b)=>new Date(a.attributes.date) - new Date(b.attributes.date)));
    }, [payouts, refunds, contributions]);

    return(
        <div className="container">
            <div className="d-flex align-items-center w-100 text-nowrap mt-3">
                <div className="h4 w-100">Contribution History</div>
                {susu ? <button onClick={()=>navigate(routes.susu().nested().CommunitySusuWallet(susu.attributes.communityId))} className="btn btn-sm mx-1">To Community Wallet</button> : null}
            </div>
            <div>
                <table className="w-100">
                    <tbody>
                        {histories.map((history, key)=>(
                            <tr className="border-bottom" key={key}>
                                <td className="py-2 small">{history.attributes.data}</td>
                                <td className="py-2 d-none d-sm-block">
                                    <div className="small">
                                        <div>Contribution</div>
                                        <div>${history.attributes.contribution}</div>
                                    </div>
                                </td>
                                <td className="py-2 small">
                                    {history.type === 'contribution' ? <span className="border border-success rounded-pill px-3 py-1 small">PAID</span> : null}
                                    {history.type === 'refund' ? <span className="border border-danger rounded-pill px-3 py-1 small">REFUND</span> : null}
                                    {history.type === 'payout' ? <span className="border border-primary rounded-pill px-3 py-1 small">PAYOUT</span> : null}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}