import { useEffect, useState } from "react"
import { api } from "../request/Api";
import { useAuth } from "../provider/AuthProvider";
import { useParams } from "react-router-dom";

export const OwnerJoinSusuAlert = ({susu: susuProp}) =>{
    const { user } = useAuth();

    const [susu, setSusu] = useState(susuProp);
    const [show, setShow] = useState(false);

    const params = useParams();

    const join = () =>{
        api.susu.join(susu.attributes.communityId, user.id).then((response)=>{
            setShow(false)
        }).catch((error)=>{

        });
    }
    
    const decline = () => {
        localStorage.setItem(`declinedSusu_${susu.id}`, 'true');
        setShow(false);
    }

    const handleAlerting = (list) =>{
        if(list.find((sch)=>sch.attributes.memberId === user.id)){
            return setShow(false);
        }
        setShow(true);
    }

    useEffect(()=>{
        if(susuProp) return;
        api.susu.active(params.communityId).then((response)=>{
            setSusu(response.data.data[0]);
        }).catch((error)=>{

        });
    }, [susuProp]);

    useEffect(()=>{
        if(!susu) return;
        const hasDeclined = localStorage.getItem(`declinedSusu_${susu.id}`) === 'true';
        if(hasDeclined) return;
        if(!susu.attributes.pendingStart) return;
        handleAlerting(susu.attributes.members);
    }, [susu]);

    if(!susu || !show) return null;

    return(
        <div className="alert alert-info d-flex align-items-center justify-content-between rounded-4 shadow-sm border-0 px-4 py-3">
            <div>
                <strong>Join your susu?</strong>
                <div className="small text-muted">As the creator, would you like to participate in this susu?</div>
            </div>
            <div className="d-flex gap-2">
                <button onClick={join} className="btn btn-sm btn-primary">Yes, Join</button>
                <button onClick={decline} className="btn btn-sm btn-outline-secondary">No, Thanks</button>
            </div>
        </div>
    )
}