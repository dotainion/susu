import { useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import { routes } from "../routes/Routes";
import { useNavigate } from "react-router-dom";
import { api } from "../request/Api";
import { CommunityCard } from "../components/CommunityCard";
import { Loader } from "../components/Loader";
import { mockData } from "../contents/MockData";
import { AiOutlinePlus } from "react-icons/ai";

export const Communities = () => {
    const [communities, setCommunities] = useState([]);
    const [loading, setLoading] = useState(true);

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

        }).finally(()=>{
            setLoading(false);
        });
        if(process.env.NODE_ENV === 'development'){
            setCommunities(mockData.communities());
        }
    }, []);

    if(loading) return <Loader keepAlive center/>

    return (
        <div className="container mb-5">
            <div className="search-row mb-5">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 my-3">
                    <div className="d-inline-block border bg-white rounded-pill overflow-hidden">
                        <div className="d-flex align-items-stretch align-items-center w-auto">
                            <input onKeyUp={searchCommunities} className="form-control bg-transparent shadow-none border-0 pe-1" placeholder="Search by name, email, or ID..." type="search" />
                            <div className="d-flex align-items-center">
                                <IoSearchOutline className="fs-4 mx-2"/>
                            </div>
                        </div>
                    </div>
                    <button 
                        onClick={()=>navigate(routes.susu().nested().newCommunity())} 
                        className="d-flex align-items-center btn btn-sm border btn-light text-primary py-1 px-3 d-block shadow-sm rounded-pill"
                    ><IoAdd className="fs-2 me-2"/>New</button>
                </div>
            </div>
            <div className="row">
                {communities.map((community) => (
                    <CommunityCard community={community} key={community.id}/>
                ))}
            </div>
        </div>
    )
}