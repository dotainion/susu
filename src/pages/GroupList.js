import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import { routes } from "../routes/Routes";
import { useNavigate } from "react-router-dom";
import { api } from "../request/Api";
import { GroupCard } from "../components/GroupCard";

export const GroupList = () => {
    const [groups, setGroups] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        api.group.groups().then((response)=>{
            setGroups(response.data.data);
        }).catch((error)=>{

        });
    }, []);

    return (
        <div className="container">
            <div className="search-row mb-3">
                <div className="my-3 d-inline-block border border-light rounded-3 bg-light">
                    <div className="d-flex align-items-center w-auto">
                        <input className="form-control bg-transparent shadow-none border-0 pe-1" placeholder="Search..." type="search" />
                        <IoSearchOutline className="fs-4 me-2"/>
                    </div>
                </div>
                <button onClick={()=>navigate(routes.susu().nested().newGroup())} className="d-flex align-items-center btn d-block shadow-none"><IoAdd className="me-2"/>Create Group</button>
            </div>
            <div className="row row-with-search-above">
                {
                    groups.length ?
                    groups.map((group, key) => (
                        <GroupCard group={group} key={key}/>
                    )): 
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}