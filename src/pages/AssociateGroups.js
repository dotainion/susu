import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import { routes } from "../routes/Routes";
import { useNavigate } from "react-router-dom";
import { api } from "../request/Api";
import { GroupCard } from "../components/GroupCard";
import { Loader } from "../components/Loader";
import { useAuth } from "../provider/AuthProvider";

export const AssociateGroups = () => {
    const { user } = useAuth();

    const [memberGroups, setMemberGroups] = useState([]);
    const [groups, setGroups] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if(!user) return;
        api.group.ownerGroups(user.id).then((response)=>{
            setGroups(response.data.data);
        }).catch((error)=>{

        });
        api.group.memberGroups(user.id).then((response)=>{
            setMemberGroups(response.data.data);
        }).catch((error)=>{

        });
    }, [user]);

    useEffect(() => {
        if(!memberGroups.length) return;
        setGroups((ownerGroups)=>[...ownerGroups, ...memberGroups.filter((group)=>!ownerGroups.find((g)=>g.id === group.id))]);
    }, [memberGroups]);

    return (
        <div className="container">
            <button onClick={()=>navigate(routes.susu().nested().newGroup())} className="d-flex align-items-center btn d-block shadow-none my-3"><IoAdd className="me-2"/>Create Group</button>
            <div className="row">
                {
                    groups.length ?
                    groups.map((group) => (
                        <GroupCard group={group} key={group.id}/>
                    )): 
                    <Loader/>
                }
            </div>
        </div>
    )
}