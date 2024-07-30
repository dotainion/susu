import { FaStar } from "react-icons/fa"
import { routes } from "../routes/Routes";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../request/Api";

export const GroupSusuWallet = () =>{
    const [susu , setSusu] = useState();
    const [members, setMembers] = useState([]);

    const params = useParams();
    const navigate = useNavigate();

    const percentage = 85;

    useEffect(() => {
        api.susu.active(params.groupId).then((response)=>{
            setSusu(response.data.data[0]);
            setMembers(response.data.data[0].attributes.members);
        }).catch((error)=>{
            
        });
    }, []);

    return(
        <div className="container">
            <div className="h4 my-3">Group Wallet</div>
            <div>Susu Credit Line</div>
            <div className="h1 mb-4">15,00.00</div>
            <div className="d-flex align-items-center w-100">
                <div className="w-50">
                    <div className="small">Main Balance</div>
                    <div className="fw-bold">$658975,2254.25</div>
                </div>
                <div className="w-50">
                    <div className="small text-muted">VALUE THRU</div>
                    <div className="small fw-bold">08/21/2024</div>
                </div>
                <div className="w-50">
                    <div className="small text-muted">GROUP OWNER</div>
                    <div className="small fw-bold">Franklin Jr.</div>
                </div>
            </div>
            <div className="my-2">Members <b>25</b></div>
            <div className="mt-3">
                <span className="mt-3 me-3">Complete <b>{percentage}%</b></span>
                <span className="mt-3">Complete date <b>Jan, 25 2024</b></span>
            </div>
            <progress className="w-100 p-3 mb-3" value={percentage} max={100} />
            <div>
                <table className="w-100">
                    <tbody>
                        {members.map((member, key)=>(
                            <tr onClick={()=>navigate(routes.susu().nested().updateMemberSusuWallet(params.groupId, member.id))} className="border-bottom border-secondary pointer" key={key}>
                                <td className="py-2">
                                    <div className="d-flex">
                                        <div className="me-2 d-none d-sm-block">
                                            <FaStar className="fs-1" />
                                        </div>
                                        <div className="small">
                                            <div className="small">John Wick</div>
                                            <small className="btn small rounded-pill text-primary border border-primary py-0 px-2"><small><small>Completed</small></small></small>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2">
                                    <div className="small">
                                        <div className="small">June 1, 2024</div>
                                        <div className="small">08:22 AM</div>
                                    </div>
                                </td>
                                <td className="py-2 d-none d-sm-block">
                                    <div className="small">
                                        <div>example@example.com</div>
                                        <div>+1 473 555-5555</div>
                                    </div>
                                </td>
                                <td className="py-2 small">
                                    <small>PAYMENT METHOD</small>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}