import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { api } from "../request/Api";

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