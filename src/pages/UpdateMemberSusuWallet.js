import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { routes } from "../routes/Routes";
import { FaStar } from "react-icons/fa";
import { api } from "../request/Api";

export const UpdateMemberSusuWallet = () =>{
    const [susu, setSusu] = useState();
    const [history, setHistory] = useState([]);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        api.susu.active(params.groupId).then((response)=>{
            setSusu(response.data.data[0]);
        }).catch((error)=>{

        });
    }, []);

    useEffect(()=>{
        if(!susu) return;
        api.history.lisHistory(susu.id, params.memberId).then((response)=>{
            setHistory(response.data.data);
        }).catch((error)=>{

        });
    }, [susu]);

    return(
        <div className="container">
            <div className="d-flex align-items-center w-100 text-nowrap mt-3">
                <div className="h4 w-100">Contribution Management</div>
                <button onClick={()=>navigate(routes.susu().nested().groupSusuWallet(params.groupId))} className="btn btn-sm mx-1">Back to Group Wallet</button>
            </div>
            <div className="my-3">Credit Line Details: Overview of May 2024</div>
            <div className="d-block d-md-flex w-100 shadow-sm bg-white p-4">
                <div className="w-100">
                    <div>
                        <button onClick={()=>navigate(routes.susu().nested().member(params.memberId))} className="btn bg-transparent shadow-none border-0 mb-3 text-decoration-underline link-primary pointer p-0">John Wick</button>
                        <div>Susu Credit Line</div>
                        <div className="h1">15,00.00</div>
                    </div>
                    <div className="d-flex my-3">
                        <progress className="w-100 p-3 mb-3 me-1" value={25} max={100} />
                        <progress className="w-100 p-3 mb-3 mx-1" value={25} max={100} />
                        <progress className="w-100 p-3 mb-3 ms-1" value={25} max={100} />
                    </div>
                    <div className="d-flex w-100">
                        <div className="w-50">
                            <div className="small"><GoDotFill/> Card Speeds</div>
                            <div className="fw-bold">15,00.00</div>
                        </div>
                        <div className="w-50">
                            <div className="small"><GoDotFill/> Invoice Payment</div>
                            <div className="fw-bold">15,00.00</div>
                        </div>
                        <div className="w-50">
                            <div className="small"><GoDotFill/> Available Limit</div>
                            <div className="fw-bold">15,00.00</div>
                        </div>
                    </div>
                </div>
                <div className="border border danger mx-3 d-none d-md-block"></div>
                <div className="border border danger my-4 d-block d-md-none"></div>
                <div className="text-nowrap">
                    <div>Credit Statement due form May 2024</div>
                    <div className="d-flex w-100 my-4">
                        <div className="w-50">
                            <div className="small">Total Payment</div>
                            <div className="fw-bold">2000.00</div>
                        </div>
                        <div className="w-50">
                            <div className="small">Due Date</div>
                            <div className="fw-bold">12 Jun 2022</div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="me-5">View Details</div>
                        <div className="d-flex flex-column">
                            <button className="btn btn-sm btn-primary px-3 mb-1">Add Contribution</button>
                            <button className="btn btn-sm btn-secondary px-3 mt-1">Custom Contribution</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-secondary mt-5">History</div>
            <div>
                <table className="w-100">
                    <tbody>
                        {history.map((member, key)=>(
                            <tr className="border-bottom border-secondary" key={key}>
                                <td className="py-2 small">{member.attributes.date}</td>
                                <td className="py-2 d-none d-sm-block">
                                    <div className="small">
                                        <div>Contribution</div>
                                        <div>${member.attributes.contribution}</div>
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