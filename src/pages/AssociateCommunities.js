import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import { routes } from "../routes/Routes";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../request/Api";
import { CommunityCard } from "../components/CommunityCard";
import { Loader } from "../components/Loader";
import { useAuth } from "../provider/AuthProvider";
import { mockData } from "../contents/MockData";

export const AssociateCommunities = () => {
    const { user } = useAuth();

    const [memberCommunities, setMemberCommunities] = useState([]);
    const [communities, setCommunities] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        let loadingCommunity = true;
        let loadingMbcommunity = true;
        
        api.community.ownerCommunities(params.memberId).then((response)=>{
            setCommunities(response.data.data);
        }).catch((error)=>{

        }).finally(()=>{
            loadingCommunity = false;
            if(!loadingCommunity && !loadingMbcommunity) setLoading(false);
        });
        api.community.memberCommunities(params.memberId).then((response)=>{
            setMemberCommunities(response.data.data);
        }).catch((error)=>{

        }).finally(()=>{
            loadingMbcommunity = false;
            if(!loadingCommunity && !loadingMbcommunity) setLoading(false);
        });
        if(process.env.NODE_ENV === 'development'){
            setCommunities(mockData.communities());
        }
    }, []);

    useEffect(() => {
        if(!memberCommunities.length) return;
        setCommunities((ownerCommunities)=>[...ownerCommunities, ...memberCommunities.filter((community)=>!ownerCommunities.find((c)=>c.id === community.id))]);
    }, [memberCommunities]);

    if(loading) return <Loader keepAlive center/>

    return (
        <div className="container mb-5">
            <div className="search-row d-flex justify-content-end my-3">
                <button 
                    onClick={()=>navigate(routes.susu().nested().newCommunity())} 
                    className="d-flex align-items-center btn d-block btn-light text-primary rounded-pill border shadow-sm py-1 px-3"
                ><IoAdd className="fs-2 me-2"/>New</button>
            </div>
            <div className="row">
                {communities.map((community) => (
                    <CommunityCard community={community} key={community.id}/>
                ))}
            </div>
        </div>
    )
}