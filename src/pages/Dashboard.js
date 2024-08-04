import { FaLayerGroup } from "react-icons/fa6";
import { FaPersonFalling } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";

export const Dashboard = () =>{
    const navigate = useNavigate();
    return(
        <div className="container">
            <div className="h4 my-4">Dashboard</div>
            <hr></hr>
            <button onClick={()=>navigate(routes.susu().nested().ownerGroups())} className="btn btn-light text-start shadow-sm me-2">
                <div className="d-flex">
                    <FaLayerGroup className="display-5"/>
                    <div className="ms-2">
                        <div className="h4">My Groups</div>
                        <div className="small">254</div>
                    </div>
                </div>
            </button>
            <div className="py-5">
                <div className="bg-light p-2" style={{maxWidth: '500px'}}>
                    <div className="mt-2 d-flex">
                        <div className="fw-bold me-3">Messages</div>
                        <span className="bg-danger text-white px-2">5 New Messages</span>
                    </div>
                    <hr></hr>
                    {[1,2,3,5,6,4].map((member, key)=>(
                        <div className="d-inline-block" key={key}>
                            <div className="d-flex flex-column m-3" key={key}>
                                <FaPersonFalling className="border display-3 rounded-circle p-2"/>
                                <div className="text-truncate">John Wick</div>
                                <div className="text-truncate">Today</div>
                            </div>
                        </div>
                    ))}
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-sm bg-transparent link-primary shadow-none border-0">View All Mesages</button>
                    </div>
                </div>
            </div>
            <table className="w-100 small table">
                <thead>
                    <tr className="border-bottom border-dark">
                        <th className="py-2">Member</th>
                        <th className="py-2">Date</th>
                        <th className="py-2">Status</th>
                        <th className="py-2">Contribution</th>
                        <th className="py-2">Amount Paid</th>
                    </tr>
                </thead>
                <tbody className="">
                    {[1,2,3].map((history, key)=>(
                        <tr className="border-bottom" key={key}>
                            <td className="py-2">Member</td>
                            <td className="py-2">04/23/2024</td>
                            <td className="py-2">
                                <span className="border border-success rounded-pill px-3 py-1 small">PAID</span>
                            </td>
                            <td className="py-2">$25.21</td>
                            <td className="py-2">$20.21</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}