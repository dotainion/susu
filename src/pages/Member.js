import { useEffect, useState } from "react";
import { AiOutlineFileProtect } from "react-icons/ai";
import { FaRegCopy } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { api } from "../request/Api";
import { GroupMiniCard } from "../components/GroupMiniCard";
import { utils } from "../utils/Utils";
import $ from 'jquery';

export const Member = () => {
    const [member, setMember] = useState();
    const [groups, setGroups] = useState([]);

    const params = useParams();

    useEffect(() => {
        if(!params.memberId) return;
        api.user.user(params.memberId).then((response)=>{
            setMember(response.data.data[0]);
        }).catch((error)=>{

        });
        api.group.memberGroups(params.memberId).then((response)=>{
            setGroups(response.data.data);
        }).catch((error)=>{

        });
    }, []);

    if(!member){
        return(
            <div className="d-flex align-items-center justify-content-center w-100 vh-100">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-center w-100 my-5">
                <div className=" me-3">
                    <img style={{width: '150px', height: '150px'}} src="https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=" alt="" />
                </div>
                <div>
                    <div className="fs-3">{member?.attributes?.firstName} {member?.attributes?.lastName}</div>
                    <div className="my-2">Groups <b>45</b></div>
                    <div className="my-2">{member?.attributes?.email}</div>
                    <div className="my-2">{member?.attributes?.phoneNumber}</div>
                </div>
            </div>
            <div className="d-flex justify-content-center w-100 my-5">
                <AiOutlineFileProtect className="display-1 text-dark"/>
                <div className="ms-2">
                    <div>This account is protected</div>
                    <div className="mt-2">Member ID</div>
                    <div onClick={(e)=>utils.copy.toClipboard($(e.currentTarget).find('div').first())} className="d-flex align-items-center form-control bg-white position-relative pointer">
                        <div className="w-100">{member?.id}</div>
                        <button className="btn bg-transparent shadow-none border-0 p-0"><FaRegCopy className="fs-5 ms-2"/></button>
                    </div>
                </div>
            </div>
            <hr></hr>
            <div className="fw-bold">Groups</div>
            <div className="row">
                {
                    groups.length ?
                    groups.map((group, key) => (
                        <GroupMiniCard group={group} key={key}/>
                    )):null
                }
            </div>
        </div>
    )
}