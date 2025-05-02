import { FaObjectUngroup } from "react-icons/fa";
import { FaEllipsisVertical } from "react-icons/fa6";
import { useAuth } from "../provider/AuthProvider";
import { routes } from "../routes/Routes";
import { useNavigate } from "react-router-dom";
import { BiSolidUserAccount } from "react-icons/bi";
import { LuGroup } from "react-icons/lu";
import { IoChatbubbles } from "react-icons/io5";
import { DashboardOptionButton } from "./DashboardOptionButton";
import { MdDashboard } from "react-icons/md";

export const NavHeader = () =>{
    const { signOut } = useAuth();

    const navigate = useNavigate();

    const quickLinks = [
        {
            title: 'Account',
            icon: BiSolidUserAccount,
            onClick: ()=>navigate(routes.susu().nested().profile()),
            bg: 'primary'
        },{
            title: 'New Community',
            icon: LuGroup,
            onClick: ()=>navigate(routes.susu().nested().newCommunity()),
            bg: 'info'
        },{
            title: 'Community Hub',
            icon: FaObjectUngroup,
            onClick: ()=>navigate(routes.susu().nested().associateCommunities()),
            bg: 'warning'
        },{
            title: 'Chats',
            icon: IoChatbubbles,
            onClick: ()=>navigate(routes.susu().nested().messangers()),
            bg: 'secondary'
        },
    ];

    return(
        <div className="pt-3">
            <div className="card overflow-hidden hidden">
                <div className="card-body bg-primary text-center text-light">
                    <div className="d-flex">
                        <div className="w-100">Susu Group Savings</div>
                        <div className="dropdown mb-sm-3 me-2 me-sm-0">
                            <a href="#" className="d-flex justify-content-center d-block w-100" id="dropdownMenu1" data-bs-toggle="dropdown" aria-expanded="false">
                                <FaEllipsisVertical className="fs-6 text-light"/>
                            </a>
                            <ul className="dropdown-menu text-smallshadow" aria-labelledby="dropdownMenu1">
                                <li><a onClick={signOut} className="dropdown-item pointer">Sign out</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="h1">Track your savings in real-time</div>
                    <div className="d-flex gap-3 align-items-center justify-content-center">
                        <div>A financial tool for modern communities</div>
                        <DashboardOptionButton className="btn btn-sm btn-light d-flex align-items-center gap-1">
                            <MdDashboard />
                            <span>Dashboard</span>
                        </DashboardOptionButton>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-wrap justify-content-center pt-2">
                {quickLinks.map((link, key)=>(
                    <div className="small text-center" style={{minWidth: '130px', maxWidth: '130px'}} key={key}>
                        <button onClick={link.onClick} className={`rounded-circle p-2 btn btn-${link.bg}`}><link.icon className="fs-3"/></button>
                        <div className="small">{link.title}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}