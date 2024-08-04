import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import { routes } from "../routes/Routes";
import { useNavigate } from "react-router-dom";
import { api } from "../request/Api";
import { GroupCard } from "../components/GroupCard";
import { Loader } from "../components/Loader";
import { useAuth } from "../provider/AuthProvider";

export const OwnerGroupList = () => {
    const { user } = useAuth();

    const [groups, setGroups] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if(!user) return;
        api.group.ownerGroups(user.id).then((response)=>{
            setGroups(response.data.data);
        }).catch((error)=>{

        });
    }, [user]);

    return (
        <div className="container">
            <button onClick={()=>navigate(routes.susu().nested().newGroup())} className="d-flex align-items-center btn d-block shadow-none my-3"><IoAdd className="me-2"/>Create Group</button>
            <div className="row row-with-search-above">
                {
                    groups.length ?
                    groups.map((group, key) => (
                        <GroupCard group={group} key={key}/>
                    )): 
                    <Loader/>
                }
            </div>
        </div>
    )
}