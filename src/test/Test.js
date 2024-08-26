import { useEffect } from "react";
import { Dashboard } from "../pages/Dashboard";
import { Messangers } from "../pages/Messangers";
import { GroupMembersInvite } from "../pages/GroupMembersInvite";
import { NewGroup } from "../pages/NewGroup";
import { Group } from "../pages/Group";
import { Profile } from "../pages/Profile";
import { ViewGroup } from "../pages/ViewGroup";
import { UpdateMemberSusuWallet } from "../pages/UpdateMemberSusuWallet";
import { CommenceSusuOverlay } from "../components/CommenceSusuOverlay";
import { api } from "../request/Api";
import { ContributionRefund } from "../pages/ContributionRefund";

export const Test = () =>{

    const test = () =>{
        api.group.memberGroups('bf08fe63-ada7-42f9-94e7-b1e34b19b0d9').then((response)=>{
            console.log(response.data.data);
        }).catch((error)=>{

        });
    }
    
    useEffect(()=>{
        
    }, []);

    return(
        <div className="container">
            <ContributionRefund/>
        </div>
    )
}