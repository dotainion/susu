import { useEffect, useRef, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { routes } from "../routes/Routes";
import { useNavigate } from "react-router-dom";
import { api } from "../request/Api";
import { CommunityCard } from "../components/CommunityCard";
import { Loader } from "../components/Loader";
import { mockData } from "../contents/MockData";
import { Search } from "../widgets/Search";
import { InfiniteScrollContainer } from "../components/InfiniteScrollContainer";
import $ from "jquery";

export const Communities = () => {
    const [communities, setCommunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [spin, setSpin] = useState(false);

    const navigate = useNavigate();

    const valueRef = useRef();
    const timeoutRef = useRef();

    const searchCommunities = (e) =>{
        valueRef.current = e.target.value;
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setSpin(true);
            api.community.search({value: valueRef.current, limit: 100}).then((response)=>{
                setCommunities(response.data.data);
            }).catch((error)=>{
                setCommunities([]);
            }).finally(()=>{
                setSpin(false);
            });
        }, 500);
    }

    useEffect(() => {
        api.community.communities(100).then((response)=>{
            setCommunities(response.data.data);
        }).catch((error)=>{

        }).finally(()=>{
            setLoading(false);
        });
        if(process.env.NODE_ENV === 'development'){
            setCommunities(mockData.communities());
        }
    }, []);

    if(loading) return <Loader show/>

    return (
        <div className="container mb-5">
            <div className="search-row mb-5">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 my-3">
                    <Search onSearch={searchCommunities} />
                    <button 
                        onClick={()=>navigate(routes.susu().nested().newCommunity())} 
                        className="d-flex align-items-center btn btn-sm border btn-light text-primary py-1 px-3 d-block shadow-sm rounded-pill"
                    ><IoAdd className="fs-2 me-2"/>New</button>
                </div>
            </div>
            <InfiniteScrollContainer 
                className="row" 
                batchSize={100} 
                defaultItems={communities} 
                apiPath="api.community.search"
            >
                {(community)=>(
                    <CommunityCard 
                        community={community} 
                        key={community.id}
                    />
                )}
            </InfiniteScrollContainer>
            <Loader show={spin} />
        </div>
    )
}