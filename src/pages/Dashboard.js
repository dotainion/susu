import { FaLayerGroup } from "react-icons/fa6";
import { FaPersonFalling } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";
import { SchedulePayoutChart } from "../components/SchedulePayoutChart";
import { useEffect, useState } from "react";
import { api } from "../request/Api";
import { Dropdown } from "../widgets/Dropdown";
import { useAuth } from "../provider/AuthProvider";
import { utils } from "../utils/Utils";

export const Dashboard = () =>{
    const { user } = useAuth();

    const [groups, setGroups] = useState([]);
    const [histories, setHistories] = useState([]);
    const [selectGroup, setSelectGroup] = useState();

    const navigate = useNavigate();

    useEffect(()=>{
        if(!user?.id) return;
        api.group.memberGroups(user.id).then((response)=>{
            setGroups(response.data.data);
        }).catch((error)=>{

        });
    }, [user]);

    useEffect(()=>{
        if(!selectGroup) return;
        api.schedule.list(selectGroup.id).then((response)=>{
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
    }, [selectGroup]);

    return(
        <div className="container">
            <div className="h4 my-4">Dashboard</div>
            <hr></hr>
            <div className="d-sm-flex d-block">
                <button 
                    onClick={()=>navigate(routes.susu().nested().ownerGroups())} 
                    className="btn btn-light text-start shadow-sm me-2 d-flex align-items-center mb-3"
                >
                    <FaLayerGroup className="fs-5"/>
                    <div className="fs-bold ms-2">Go to my groups</div>
                </button>
                <Dropdown 
                    className="btn-light text-start shadow-sm me-2 d-flex align-items-center mb-3"
                    options={groups.map((g)=>({title: g.attributes.name, onClick: ()=>setSelectGroup(g)}))}
                    defaultValue={'You are not yet in a group'}
                >
                    <FaLayerGroup className="fs-5"/>
                    <div className="fs-bold ms-2">{selectGroup?.attributes?.name || 'Select group to see'} :stats</div>
                </Dropdown>
            </div>
            <hr></hr>

            <SchedulePayoutChart groupId={selectGroup?.id}/>

            <div className="text-secondary mt-3">History</div>
            <table className="w-100 small table">
                <thead>
                    <tr className="border-bottom border-dark">
                        <th className="py-2">Member</th>
                        <th className="py-2">Date</th>
                        <th className="py-2">Status</th>
                        <th className="py-2">Amount</th>
                    </tr>
                </thead>
                <tbody className="">
                    {histories.map((history, key)=>(
                        <tr className="border-bottom" key={key}>
                            <td className="py-2">{history.attributes.user.attributes.firstName} {history.attributes.user.attributes.lastName}</td>
                            <td className="py-2">{utils.date.toLocalDateTime(history.attributes.date)}</td>
                            <td className="py-2">
                                {history.type === 'contribution' ? <span className="border border-success rounded-pill px-3 py-1 small">PAID</span> : null}
                                {history.type === 'refund' ? <span className="border border-success rounded-pill px-3 py-1 small">REFUND</span> : null}
                                {history.type === 'payout' ? <span className="border border-success rounded-pill px-3 py-1 small">PAYOUT</span> : null}
                            </td>
                            <td className="py-2">${history.attributes.contribution || history.attributes.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}