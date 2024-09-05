import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import { routes } from "../routes/Routes";
import { useNavigate } from "react-router-dom";
import { api } from "../request/Api";
import { CommunityCard } from "../components/CommunityCard";
import { Loader } from "../components/Loader";
import { useAuth } from "../provider/AuthProvider";

export const AssociateCommunities = () => {
    const { user } = useAuth();

    const [memberCommunities, setMemberCommunities] = useState([]);
    const [communities, setCommunities] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if(!user) return;
        api.community.ownerCommunities(user.id).then((response)=>{
            setCommunities(response.data.data);
        }).catch((error)=>{

        });
        api.community.memberCommunities(user.id).then((response)=>{
            setMemberCommunities(response.data.data);
        }).catch((error)=>{

        });
    }, [user]);

    useEffect(() => {
        if(!memberCommunities.length) return;
        setCommunities((ownerCommunities)=>[...ownerCommunities, ...memberCommunities.filter((community)=>!ownerCommunities.find((c)=>c.id === community.id))]);
    }, [memberCommunities]);

    return (
        <div className="container">
            <button onClick={()=>navigate(routes.susu().nested().newCommunity())} className="d-flex align-items-center btn d-block shadow-none my-3"><IoAdd className="me-2"/>Create Community</button>
            <div className="row">
                {
                    communities.length ?
                    communities.map((community) => (
                        <CommunityCard communities={communities} key={community.id}/>
                    )): 
                    <Loader/>
                }
            </div>
        </div>
    )
}