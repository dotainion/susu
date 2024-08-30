import { FaStar } from "react-icons/fa"
import { routes } from "../routes/Routes";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../request/Api";
import { utils } from "../utils/Utils";

export const GroupSusuWallet = () =>{
    const [susu , setSusu] = useState();
    const [members, setMembers] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [contributions, setContributions] = useState([]);
    const [percentage, setPercentage] = useState({max: 0, value: 0, percent: 0});
    const [consolidate, setConsolidate] = useState({total: null, balance: null, endDate: null});

    const params = useParams();
    const navigate = useNavigate();

    const expectedContribution = (memberId) =>{
        const mbSched = schedule.find((sch)=>sch.attributes.memberId === memberId);
        if(!mbSched) return 'No asign schedule';
        return utils.date.toLocalDate(mbSched.attributes.date);
    }

    useEffect(() => {
        api.susu.active(params.groupId).then((response)=>{
            setSusu(response.data.data[0]);
            setMembers(response.data.data[0].attributes.members || []);
        }).catch((error)=>{
            
        });
        api.schedule.list(params.groupId).then((response)=>{
            setSchedule(response.data.data);
        }).catch((error)=>{
            
        });
    }, []);

    useEffect(() => {
        if(!susu) return;
        api.contribution.list(susu.id).then((response)=>{
            setContributions(response.data.data);
        }).catch((error)=>{
            
        });
    }, [susu]);

    useEffect(() => {
        if(!susu) return;
        const totalExpectedContribution = (parseFloat(susu.attributes.contribution) * schedule.length) * susu.attributes.accurance;
        let totalContributions = 0;
        contributions.forEach((con)=>totalContributions += parseFloat(con.attributes.contribution));
        setConsolidate({
            total: totalExpectedContribution,
            balance: (totalExpectedContribution - totalContributions),
            endDate: utils.date.toLocalDate(schedule[schedule.length -1]?.attributes?.date),
        });
        setPercentage({
            max: totalExpectedContribution, 
            value: totalContributions, 
            percent: ((totalContributions / totalExpectedContribution) * 100) || 0
        });
    }, [contributions, schedule, susu]);

    return(
        <div className="container">
            <div className="h4 my-3">Group Susu Manager</div>
            <div>Susu Credit Line</div>
            <div className="h1 mb-4">${parseFloat(susu?.attributes?.contribution || 0).toFixed(2)}</div>

            <div className="d-flex align-items-center w-100">
                <div className="w-50">
                    <div className="small">Total Require Contribution</div>
                    <div className="fw-bold">${consolidate.total?.toFixed?.(2) || 0}</div>
                </div>
                <div className="w-50">
                    <div className="small text-muted">VALUE THROUGH</div>
                    <div className="small fw-bold">{utils.date.toLocalDate(susu?.attributes?.startDate)} - {consolidate.endDate}</div>
                </div>
                <div className="w-50">
                    <div className="small text-muted">GROUP OWNER</div>
                    <div className="small fw-bold">{susu?.attributes?.owner?.attributes?.firstName} {susu?.attributes?.owner?.attributes?.lastName}</div>
                </div>
            </div>

            <div className="d-flex align-items-center w-100 my-3">
                <div className="w-50">
                    <div className="small">Main Balance</div>
                    <div className="fw-bold">${consolidate.balance?.toFixed?.(2) || 0}</div>
                </div>
            </div>

            <div className="my-2">Members <b>({members.length})</b></div>
            <div className="mt-3">
                <span className="mt-3 me-3">Complete <b>{percentage.percent?.toFixed?.(2)}%</b></span>
                <span className="mt-3">Complete date <b>{consolidate?.endDate}</b></span>
            </div>
            <progress className="w-100 p-3 mb-3" value={percentage.value} max={percentage.max} />
            <div>
                <table className="w-100">
                    <tbody>
                        {members.map((member, key)=>(
                            <tr onClick={()=>navigate(routes.susu().nested().updateMemberSusuWallet(params.groupId, member.id))} className="border-bottom border-secondary pointer" key={member.id}>
                                <td className="py-2">
                                    <div className="d-flex">
                                        <div className="me-2 d-none d-sm-block">
                                            <FaStar className="fs-1" />
                                        </div>
                                        <div className="small">
                                            <div className="small">{member.attributes.firstName} {member.attributes.lastName}</div>
                                            <small className="btn small rounded-pill text-primary border border-primary py-0 px-2"><small><small>Contributor</small></small></small>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2">
                                    <div className="small">
                                        <div className="small">Expected contribution date</div>
                                        <div className="small">{expectedContribution(member.id)}</div>
                                    </div>
                                </td>
                                <td className="py-2 d-none d-sm-block">
                                    <div className="small">
                                        <div>{member.attributes.email}</div>
                                        <div>{member.attributes.phoneNumber || 'No Contact'}</div>
                                    </div>
                                </td>
                                <td className="py-2 small">
                                    <small>STATUS</small>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}