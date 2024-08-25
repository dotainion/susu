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

export const Test = () =>{
    
    useEffect(()=>{
        
    }, []);

    return(
        <div className="container">
            <ViewGroup/>
        </div>
    )
}