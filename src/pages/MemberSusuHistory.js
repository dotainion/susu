import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { routes } from "../routes/Routes";
import { FaStar } from "react-icons/fa";
import { api } from "../request/Api";

export const MemberSusuHistory = () =>{
    const [susu, setSusu] = useState();
    const [histories, setHistories] = useState([]);

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
            setHistories(response.data.data);
        }).catch((error)=>{

        });
    }, []);

    return(
        <div className="container">
            <div className="d-flex align-items-center w-100 text-nowrap mt-3">
                <div className="h4 w-100">Contribution History</div>
                <button onClick={()=>navigate(routes.susu().nested().groupSusuWallet(params.groupId))} className="btn btn-sm mx-1">To Group Wallet</button>
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
                                    <span className="border border-success rounded-pill px-3 py-1">PAID</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}