import { useEffect } from "react";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { Messangers } from "../pages/Messangers";
import { NewCommunity } from "../pages/NewCommunity";
import { Community } from "../pages/Community";
import { Profile } from "../pages/Profile";
import { ViewCommunity } from "../pages/ViewCommunity";
import { UpdateMemberSusuWallet } from "../pages/UpdateMemberSusuWallet";
import { CommenceSusuOverlay } from "../components/CommenceSusuOverlay";
import { api } from "../request/Api";
import { ContributionRefund } from "../pages/ContributionRefund";
import { ModalOverlay } from "../container/ModalOverlay";
import { InviteOption } from "../components/InviteOption";
import { Invited } from "../pages/Invited";
import { AssignSchedule } from "../pages/AssignSchedule";
import { Appearance } from "../pages/Appearance";
import { CommunityDashboard } from "../pages/dashboard/CommunityDashboard";
import { Transaction } from "../pages/dashboard/Transaction";
import { ShareSocialMediaOverlay } from "../components/ShareSocialMediaOverlay";
import { Susu } from "../pages/Susu";
import { NavMain } from "../layout/navigator/NavMain";
import { Payments } from "../pages/Payments";
import { PaymentSuccess } from "../pages/PaymentSuccess";
import { SiTruenas } from "react-icons/si";
import { PaymentRefund } from "../pages/PaymentRefund";
import { Schedule } from "../pages/Schedule";

export const Test = () =>{

    const test = () =>{
        api.community.memberCommunities('bf08fe63-ada7-42f9-94e7-b1e34b19b0d9').then((response)=>{
            console.log(response.data.data);
        }).catch((error)=>{

        });
    }
    
    useEffect(()=>{
        //example of designs
        //https://trello.com/
        //form this: Workflows for any project, big or small
    }, []);

    return(
        <div className="container">
            <ViewCommunity />
        </div>
    )
}