import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../request/Api";
import { useAuth } from "../../provider/AuthProvider";
import { CommunityDashboard } from "./CommunityDashboard";
import { SusuDashboard } from "./SusuDashboard";
import { MdCancel, MdCheckCircle, MdHourglassEmpty } from "react-icons/md";
import { DashboardOptionButton } from "../../components/DashboardOptionButton";
import { ShareSocialMediaOverlay } from "../../components/ShareSocialMediaOverlay";

export const Dashboard = () =>{
    const { user } = useAuth();

    const [susu, setSusu] = useState();

    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();

    const Status = () => {
        if (susu && susu.attributes.canceled) {
            return (<><MdCancel className="text-danger" size={24} /><span>Canceled</span></>);
        }else if (susu && susu.attributes.completed) {
            return (<><MdCheckCircle className="text-primary" size={24} /><span>Completed</span></>);
        }else if (susu && susu.attributes.pendingStart === false && !susu.attributes.canceled && !susu.attributes.completed) {
            return (<><MdCheckCircle className="text-success" size={24} /><span>Active</span></>);
        }
        return (<><MdHourglassEmpty className="text-warning" size={24} /><span>Pending</span></>);
    }

    useEffect(()=>{
        api.susu.fetch(params.susuId).then((response)=>{
            setSusu(response.data.data[0]);
        }).catch((error)=>{

        });
    }, [location]);

    return(
        <div className="container">
            <div className="d-flex align-items-center gap-2 py-3 mb-3">
                <div className="d-flex align-items-center w-100">
                    <h4><b>Community</b></h4>
                    <small className="ms-2">Dashboard</small>
                </div>
                <button className="btn btn-sm btn-light"></button>
                <DashboardOptionButton className="form-control btn btn-sm btn-light w-auto" />
                <div className="d-flex form-control bg-light w-auto border-0">
                    <Status />
                </div>
            </div>
            <div className="my-4">
                <CommunityDashboard />
            </div>
            <div className="my-4">
                <SusuDashboard />
            </div>
        </div>
    )
}