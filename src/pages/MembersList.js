import { useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { api } from "../request/Api";
import { routes } from "../routes/Routes";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";

export const MembersList = () => {
    const [members, setMembers] = useState([]);

    const navigate = useNavigate();

    const timeoutRef = useRef();

    const onSearch = (e) =>{
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            api.user.search(e.target.value).then((response)=>{
                setMembers(response.data.data);
            }).catch((error)=>{
                setMembers([]);
            });
        }, 500);
    }

    useEffect(() => {
        api.user.users().then((response)=>{
            setMembers(response.data.data);
        }).catch((error)=>{

        });
    }, []);
    return (
        <div className="container">
            <div className="search-row my-3 d-inline-block border border-light rounded-3 bg-light">
                <div className="d-flex align-items-center w-auto">
                    <input onKeyUp={onSearch} className="form-control bg-transparent shadow-none border-0 pe-1" placeholder="Search..." type="search" />
                    <IoSearchOutline className="fs-4 me-2"/>
                </div>
            </div>
            <div className="row row-with-search-above-mini">
                {
                    members.length ?
                    members.map((member, key) => (
                        <div className="col-12 col-xl-3 col-lg-4 col-md-6 p-1" key={key}>
                            <div onClick={()=>navigate(routes.susu().nested().member(member.id))} className="card card-hover position-relative h-100 m-1">
                                <div className="card-body rounded-3">
                                    <div className="d-flex align-items-center">
                                        <img className="card-img-sub" src="https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=" alt="" />
                                        <div>
                                            <div className="fw-bold">{member.attributes.firstName} {member.attributes.lastName}</div>
                                            <div className="small lh-1"><small>Communities <b>25</b></small></div>
                                        </div>
                                    </div>
                                    <div className="text-muted small my-2">{member.attributes.bio}</div>
                                </div>
                            </div>
                        </div>
                    )): 
                    <Loader/>
                }
            </div>
        </div>
    )
}