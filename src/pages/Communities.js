import { useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import { routes } from "../routes/Routes";
import { useNavigate } from "react-router-dom";
import { api } from "../request/Api";
import { CommunityCard } from "../components/CommunityCard";
import { Loader } from "../components/Loader";

export const Communities = () => {
    const [communities, setCommunities] = useState([]);

    const navigate = useNavigate();

    const timeoutRef = useRef();

    const searchCommunities = (e) =>{
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            api.community.search(e.target.value).then((response)=>{
                setCommunities(response.data.data);
            }).catch((error)=>{
                setCommunities([]);
            });
        }, 500);
    }

    useEffect(() => {
        api.community.communities().then((response)=>{
            setCommunities(response.data.data);
        }).catch((error)=>{

        });
    }, []);

    return (
        <div className="container">
            <div className="search-row mb-3">
                <div className="my-3 d-inline-block border border-light rounded-3 bg-light">
                    <div className="d-flex align-items-center w-auto">
                        <input onKeyUp={searchCommunities} className="form-control bg-transparent shadow-none border-0 pe-1" placeholder="Search..." type="search" />
                        <IoSearchOutline className="fs-4 me-2"/>
                    </div>
                </div>
                <button onClick={()=>navigate(routes.susu().nested().newCommunity())} className="d-flex align-items-center btn d-block shadow-none"><IoAdd className="me-2"/>Create Community</button>
            </div>
            <div className="row row-with-search-above">
                {
                    communities.length ?
                    communities.map((community, key) => (
                        <CommunityCard community={community} key={key}/>
                    )): 
                    <Loader/>
                }
            </div>
        </div>
    )
}