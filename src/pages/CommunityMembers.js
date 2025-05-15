import { useEffect, useLayoutEffect, useState } from "react"
import { FaUserCircle } from "react-icons/fa"
import { api } from "../request/Api";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { useLayout } from "../layout/Layout";
import { mockData } from "../contents/MockData";
import { ParseError } from "../utils/ParseError";
import { MdGroupAdd, MdGroups, MdMoreVert } from 'react-icons/md';
import { FaTrashAlt, FaEnvelope, FaPhoneAlt, FaBan, FaEllipsisV } from 'react-icons/fa';
import { IoMdPerson } from 'react-icons/io';
import { AiOutlineWhatsApp } from 'react-icons/ai';
import { ImProfile } from "react-icons/im";
import img from "../images/group-bg-profile.png";
import $ from "jquery";
import { routes } from "../routes/Routes";

export const CommunityMembers = () =>{
    //const { setParams, setLayoutParams } = useLayout();
    
    const [toasts, setToasts] = useState([]);
    const [members, setMembers] = useState([]);
    const [community, setCommunity] = useState();
    const [loading, setLoading] = useState(true);

    const params = useParams();

    const addToast = (member) =>{
        setToasts((lists)=>[
            new (class{
                id = member.id;
                timeoutRef = null;
                content = `${member.attributes.firstName} ${member.attributes.lastName}`;
                constructor(){
                    this.timeout();
                }
                remove = () => setToasts((list)=>[...list.filter((t)=>t.id !== this.id)]);
                undo = () =>{
                    undoDelete(member);
                    this.remove();
                }
                timeout(){
                    clearTimeout(this.timeoutRef);
                    this.timeoutRef = setTimeout(() => {
                        this.remove();
                    }, 5000);
                }
            }),
            ...lists
        ]);
    }

    const deleteMember = (member) =>{
        api.community.unlink(params.communityId, member.id).then((response)=>{
            
        }).catch((error)=>{
            console.log(new ParseError().message(error));
        }).finally(()=>{
            addToast(member);
        });
    }

    const undoDelete = (member) =>{
        api.community.join(params.communityId, member.id).then((response)=>{
            
        }).catch((error)=>{
            console.log(new ParseError().message(error));
        }).finally(()=>{
            
        });
    }

    /*useLayoutEffect(() => {
        setParams({communityId: params.communityId});
        return () => setLayoutParams({});
    }, []);*/

    useEffect(()=>{
        let communityLoading = true;
        let userLoading = true;

        const handleLoading = () =>{
            if(!communityLoading && !userLoading){
                setLoading(false);
            }
        }

        api.community.community(params.communityId).then((response)=>{
            setCommunity(response.data.data[0]);
        }).catch((error)=>{
            
        }).finally(()=>{
            communityLoading = false;
            handleLoading();
        });
        api.user.byCommunity(params.communityId).then((response)=>{
            setMembers(response.data.data);
        }).catch((error)=>{
            
        }).finally(()=>{
            userLoading = false;
            handleLoading();
        });
        if(process.env.NODE_ENV === 'development'){
            setMembers(mockData.members());
            setCommunity(mockData.community());
        }
    }, []);

    if(loading) return null;

    return(
        <div className="container-lg py-5">
            <div className="card bg-primary bg-opacity-10 border-0 shadow-sm rounded-4">
                <div className="card-body bg-transparent">
                    <h5 className="fw-semibold mb-3">SusuSpice: <span className="text-primary">{community.attributes.name}</span></h5>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="text-muted small">Total Members: {members.length}</div>
                        <div className="d-flex gap-3">
                            <button className="d-flex align-items-center gap-2 btn btn-sm btn-outline-primary rounded-pill"><MdGroups/>View Group Details</button>
                            <button className="d-flex align-items-center gap-2 btn btn-sm btn-outline-primary rounded-pill"><MdGroupAdd/>Invite New Member</button>
                        </div>
                    </div>

                    <div className="row">
                        {members.map((member, key) => (
                            <CommunityMemberCard 
                                member={member}
                                onDelete={deleteMember}
                                key={key}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4">
                <button className="d-flex align-items-center gap-2 btn btn-sm btn-outline-primary rounded-pill"><MdGroupAdd/>Invite New Member</button>
                <button className="d-flex align-items-center gap-2 btn btn-sm btn-outline-primary rounded-pill"><MdGroups/>View Group Details</button>
            </div>

            <div className="toast-container top-0 end-0 p-3">
                {toasts.map((toast)=>(
                    <div className="toast show border-0" role="alert" aria-live="assertive" aria-atomic="true">
                        <div className="toast-body d-flex justify-content-between text-dark gap-2">
                            <div>{toast.content}</div>
                            <div className="d-flex align-items-center gap-2">
                                <a onClick={()=>toast.undo()} className="link-primary" type="button">Undo</a>
                                <button onClick={()=>toast.remove()} className="btn-close" type="button"></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const CommunityMemberCard = ({member, onDelete}) =>{
    const { user } = useAuth();

    const navigate = useNavigate();

    const viewProfile = () =>{
        navigate(routes.susu().nested().member(member.id));
    }

    return(
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3 p-2">
            <div onClick={viewProfile} className="card shadow-sm rounded-4 overflow-hidden border-0 position-relataive">
                <div className="card-body">
                    <div className="d-flex gap-3 mb-3">
                        <div className="rounded-circle overflow-hidden" style={{minWidth: '50px', maxWidth: '50px', minHeight: '50px', maxHeight: '50px'}}>
                            <img className="rounded-circle w-100 h-100" src={img} alt={`${member.attributes.firstName} ${member.attributes.lastName}'s profile`}/>
                        </div>
                        <div className="flex-fill small">
                            <h5 className="card-title text-trancate mb-1">{member.attributes.firstName} {member.attributes.lastName}</h5>
                            <p className="text-muted small text-trancate mb-1">{member.attributes.email}</p>
                            <div className="d-flex flex-wrap align-items-center justify-content-between">
                                <div className="card-text"><strong>Role:</strong> {member.id === user.id ? 'Admin' : 'Member'}</div>
                                <span className="badge bg-success text-white">Active</span>
                            </div>
                        </div>
                    </div>

                    <div onClick={e=>e.stopPropagation()} className="position-absolute top-0 end-0 p-2">
                        <button className="btn btn-sm border-0 bg-transparent text-dark rounded-circle" data-bs-toggle="dropdown" aria-expanded="false"><FaEllipsisV /></button>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li><a onClick={()=>onDelete(member)} className="d-flex align-items-center gap-2 dropdown-item bg-transparent text-danger"><FaTrashAlt/>Remove</a></li>
                            <li hidden><a onClick={()=>onDelete(member)} className="d-flex align-items-center gap-2 dropdown-item bg-transparent text-warning"><FaBan/>Deactivate</a></li>
                            <li><a href={`tel:${member.attributes.phoneNumber}`} className="d-flex align-items-center gap-2 dropdown-item bg-transparent text-primary"><FaPhoneAlt/>Call</a></li>
                        </ul>
                    </div>

                    <div onClick={e=>e.stopPropagation()} className="d-flex flex-wrap gap-3 mt-4">
                        <a href={`mailto:${member.attributes.email}`} className="flex-fill d-flex align-items-center justify-content-center btn btn-sm btn-outline-info rounded-pill"><FaEnvelope className="me-2" />Message</a>
                        <a href={`https://wa.me/${member.attributes.phoneNumber}`} className="flex-fill d-flex align-items-center justify-content-center btn btn-sm btn-outline-success rounded-pill" target="_blank" rel="noopener noreferrer"><AiOutlineWhatsApp className="me-2" />WhatsApp</a>
                    </div>
                </div>
            </div>
        </div>
    )
}