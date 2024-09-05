import { useEffect } from "react";
import { Dashboard } from "../pages/Dashboard";
import { Messangers } from "../pages/Messangers";
import { CommunityMembersInvite } from "../pages/CommunityMembersInvite";
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
            
        </div>
    )
}