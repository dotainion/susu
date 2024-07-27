import { useEffect, useRef } from "react";
import { utils } from "../utils/Utils";
import { ViewGroup } from "../pages/ViewGroup";
import { Member } from "../pages/Member";
import { useParams } from "react-router-dom";
import $ from "jquery";
import { GroupWallet } from "../pages/GroupWallet";
import { api } from "../request/Api";
import { Schedule } from "../pages/Schedule";

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
            <button onClick={getSchedules}>Click to display schedules</button>
        </div>
    )
}