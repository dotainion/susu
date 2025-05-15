import { FaLayerGroup } from "react-icons/fa6";
import { FaPersonFalling } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../../routes/Routes";
import { SchedulePayoutChart } from "../../components/SchedulePayoutChart";
import { useEffect, useState } from "react";
import { api } from "../../request/Api";
import { Dropdown } from "../../widgets/Dropdown";
import { useAuth } from "../../provider/AuthProvider";
import { utils } from "../../utils/Utils";

export const SusuDashboard = () =>{
    const { user } = useAuth();

    const [histories, setHistories] = useState([]);

    const navigate = useNavigate();
    const params = useParams();

    useEffect(()=>{
        if(!params.susuId) return;
        api.schedule.list(params.susuId).then((response)=>{
            let unSortedPayments = [];
            response.data.data.forEach((schedule)=>{
                unSortedPayments = [
                    ...unSortedPayments, 
                    ...schedule.attributes.payouts, 
                    ...schedule.attributes.refunds, 
                    ...schedule.attributes.contributions
                ];
            });
            setHistories(unSortedPayments.sort((a, b)=> new Date(a.attributes.date) - new Date(b.attributes.date)));
        }).catch((error)=>{

        });
    }, [params]);

    return(
        <div className="">
            <SchedulePayoutChart communityId={params.susuId}/>
            <div className="text-secondary mt-3">History</div>
            <table className="w-100 small table">
                <thead>
                    <tr className="bg-transparent">
                        <th className="py-2 bg-transparent">Member</th>
                        <th className="py-2 bg-transparent">Date</th>
                        <th className="py-2 bg-transparent">Status</th>
                        <th className="py-2 bg-transparent">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {histories.map((history, key)=>(
                        <tr className="bg-transparent" key={key}>
                            <td className="py-2">{history.attributes.user.attributes.firstName} {history.attributes.user.attributes.lastName}</td>
                            <td className="py-2">{utils.date.toLocalDateTime(history.attributes.date)}</td>
                            <td className="py-2">
                                {history.type === 'contribution' ? <span className="border border-success rounded-pill px-3 py-1 small">PAID</span> : null}
                                {history.type === 'refund' ? <span className="border border-danger rounded-pill px-3 py-1 small">REFUND</span> : null}
                                {history.type === 'payout' ? <span className="border border-primary rounded-pill px-3 py-1 small">PAYOUT</span> : null}
                            </td>
                            <td className="py-2">${history.attributes.contribution || history.attributes.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}