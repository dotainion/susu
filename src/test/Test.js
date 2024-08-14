import { useEffect, useRef } from "react";
import { utils } from "../utils/Utils";
import { ViewGroup } from "../pages/ViewGroup";
import { Member } from "../pages/Member";
import { useParams } from "react-router-dom";
import $ from "jquery";
import { GroupWallet } from "../pages/GroupSusuWallet";
import { api } from "../request/Api";
import { Schedule } from "../pages/Schedule";
import { NewGroup } from "../pages/NewGroup";
import { UpdateMemberSusuWallet } from "../pages/UpdateMemberSusuWallet";
import { Group } from "../pages/Group";
import { GroupMembers } from "../pages/GroupMembers";
import { Dashboard } from "../pages/Dashboard";
import { Messangers } from "../pages/Messangers";
import { GroupMessages } from "../pages/GroupMessages";
import { Messages } from "../pages/Messages";
import { MessangerSearchGroupOrMember } from "../pages/MessangerSearchGroupOrMember";
import { SelectMembersOverlay } from "../components/SelectMembersOverlay";
import { GroupCard } from "../components/GroupCard";

let start = false;
export const Test = () =>{
    const dateRef = useRef();

    const params = useParams();

    const getSchedules = () =>{
        api.schedule.list(params?.memberId).then((response)=>{
            console.log(response.data.data);
        }).catch((error)=>{
            console.log(error);
        });
    }

    useEffect(()=>{
        
    }, []);

    return(
        <div className="container">
            <div>
                <input className=""/>
            </div>
        </div>
    )
}