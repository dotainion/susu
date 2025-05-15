import { useEffect, useState } from "react";
import { AiOutlineFileProtect } from "react-icons/ai";
import { FaRegCopy } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../request/Api";
import { utils } from "../utils/Utils";
import { mockData } from "../contents/MockData";
import { Loader } from "../components/Loader";
import { FaEnvelope, FaLocationArrow, FaPhoneAlt } from 'react-icons/fa';
import { FaCalendarAlt, FaGenderless, FaPhone, FaUserCircle } from 'react-icons/fa';
import { AiOutlineWhatsApp } from 'react-icons/ai';
import { routes } from "../routes/Routes";
import { MdLocationOn } from "react-icons/md";
import { RiProfileLine } from "react-icons/ri";
import { IoPeopleSharp } from "react-icons/io5";
import { TiMessages } from "react-icons/ti";
import { MdDateRange, MdEmail, MdGroups } from "react-icons/md";
import { FaMoneyBillAlt, FaHandHoldingUsd, FaChartLine } from 'react-icons/fa';
import { FaMoneyBillWave } from 'react-icons/fa';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { BsGraphUpArrow } from 'react-icons/bs';
import { FcComboChart } from "react-icons/fc";
import { GiReceiveMoney } from "react-icons/gi";
import imgBg from "../images/member-bg.png";
import imgBglit from "../images/member-bg-light.png";
import img from "../images/group-bg-profile2.png";
import $ from "jquery";
import { useAuth } from "../provider/AuthProvider";

export const Member = () => {
    const [member, setMember] = useState();
    const [communities, setCommunities] = useState([]);
    const [loading, setLoading] = useState(true);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        let userLoading = true;
        let communityLoading = true;

        const handleLoad = () =>{
            if(!userLoading && !communityLoading){
                setLoading(false);
            }
        }

        api.user.user(params.memberId).then((response)=>{
            setMember(response.data.data[0]);
        }).catch((error)=>{

        }).finally(()=>{
            userLoading = false;
            handleLoad();
        });
        api.community.memberCommunities(params.memberId).then((response)=>{
            setCommunities(response.data.data);
        }).catch((error)=>{

        }).finally(()=>{
            communityLoading = false;
            handleLoad();
        });
        if(process.env.NODE_ENV === 'development'){
            setMember(mockData.user());
            setCommunities(mockData.communities());
        }
    }, []);

    if(loading){
        return <Loader center keepAlive />;
    }

    return (
        <div className="container">
            <div className="position-relative user-select-none" style={{background: 'linear-gradient(135deg, #0d6efd, #1e40af, #0dcaf0)', minHeight: '192px', maxHeight: '192px'}}>
                <img className="position-absolute top-0 start-0 w-100" src={imgBglit} alt="" style={{minHeight: '192px', maxHeight: '192px', zIndex: 1, borderBottomLeftRadius: '50%'}} draggable={false} />
                <img className="position-relative w-100" src={imgBg} alt="" style={{minHeight: '192px', maxHeight: '192px', zIndex: 2, borderBottomLeftRadius: '100%'}} draggable={false} />
            </div>
            <div className="d-block d-md-flex align-items-center gap-3">
                <div className="d-flex align-items-center gap-3">
                    <div className="rounded-circle overflow-hidden position-relative" style={{minWidth: '130px', minHeight: '130px', maxWidth: '130px', maxHeight: '130px', marginTop: '-25px', zIndex: 3}}>
                        <img className="w-100 h-100" src={img} alt="" draggable={false} />
                    </div>
                    <div className="h4 d-md-none">{member.attributes.firstName} {member.attributes.lastName}</div>
                </div>
                <div className="me-auto">
                    <div className="h4 d-none d-md-block">Ming Li</div>
                    <div className="small text-muted">{member.attributes.bio}</div>
                </div>
                <div className="d-flex flex-wrap gap-2 text-nowrap pt-3 w-auto">
                    <button onClick={()=>navigate(routes.susu().nested().messages(member.id))} className="d-flex align-items-center gap-2 btn btn-sm btn-primary shadow-none"><TiMessages/>Message</button>
                    <button onClick={()=>window.location.href = `mailto:${member.attributes.email}`} className="d-flex align-items-center gap-2 btn btn-sm btn-primary shadow-none"><MdEmail/>Email</button>
                    <button onClick={()=>navigate(routes.susu().nested().communities())} className="d-flex align-items-center gap-2 btn btn-sm btn-primary shadow-none"><MdGroups/>Communities</button>
                    <button className="d-flex align-items-center gap-2 btn btn-sm btn-primary shadow-none" disabled><MdGroups/>Associate Communities</button>
                </div>
            </div>

            <div className="d-block d-md-flex gap-3 my-3 small">
                <div className="flex-fill bg-white rounded-3">
                    <div  className="p-3">
                        <h6 className="fw-semibold mb-3">Member ID</h6>
                        <div className="d-flex">
                            <div>
                                <AiOutlineFileProtect className="display-1 text-primary"/>
                            </div>
                            <div className="ms-2 text-nowrap w-100">
                                <div>This account is public</div>
                                <div className="mt-2">Member ID</div>
                                <div onClick={(e)=>utils.copy.toClipboard($(e.currentTarget).find('div').first())} className="d-flex align-items-center form-control bg-white position-relative pointer">
                                    <div className="w-100 text-truncate" title={member?.id}>{member?.id}</div>
                                    <button className="btn bg-transparent shadow-none border-0 p-0"><FaRegCopy className="fs-5 ms-2"/></button>
                                </div>
                            </div>
                        </div>
                        
                        <hr></hr>

                        <h6 className="d-flex align-items-center gap-2 fw-semibold mb-3"><RiProfileLine className="text-primary"/>Personal Details</h6>
                        <ul className="list-unstyled">
                            <li className="d-flex align-items-center gap-2 mb-2"><MdEmail className="text-primary"/><strong>Email:</strong> {member.attributes.email}</li>
                            <li className="d-flex align-items-center gap-2 mb-2"><FaPhone className="text-primary"/><strong>Phone Number:</strong> {member.attributes.phoneNumber || 'N/A'}</li>
                            <li className="d-flex align-items-center gap-2 mb-2"><IoPeopleSharp className="text-primary"/><strong>Gender:</strong> {member.attributes.gender}</li>
                            <li className="d-flex align-items-center gap-2 mb-2"><MdDateRange className="text-primary"/><strong>Date Joined:</strong> {utils.date.toLocalDate(member.attributes.date)}</li>
                        </ul>

                        <hr></hr>

                        <h6 className="d-flex align-items-center gap-2 fw-semibold mb-3"><MdLocationOn className="text-primary"/>Address</h6>
                        {member.attributes.address ? (
                            <ul className="list-unstyled">
                                <li className="mb-2"><strong>Country:</strong> {member.attributes.address.attributes.country}</li>
                                <li className="mb-2"><strong>State:</strong> {member.attributes.address.attributes.state}</li>
                                <li className="mb-2"><strong>Street Address:</strong> {member.attributes.address.attributes.address} {member.attributes.address.attributes.apt && `Apt: ${member.attributes.address.attributes.apt}`}</li>
                                <li className="mb-2"><strong>ZIP Code:</strong> {member.attributes.address.attributes.zip}</li>
                            </ul>
                        ) : (
                            <p className="text-muted">Address details not available.</p>
                        )}
                    </div>
                </div>

                <div className="flex-fill bg-white rounded-3">
                    <div className="p-3">
                        <h6 className="d-flex align-items-center gap-2 fw-semibold mb-3"><MdGroups className="text-primary"/>Associate Groups</h6>
                        {communities.slice(0, 5).map((community) => (
                            <div onClick={()=>navigate(routes.susu().nested().community(community.id))} className="d-flex align-items-center gap-2 pointer mb-1" key={community.id}>
                                <img src={img} alt="" style={{minWidth: '40px', minHeight: '40px', maxWidth: '40px', maxHeight: '40px'}} draggable={false} />
                                <div className="">
                                    <div className="fw-semibold text-truncate">Pure science</div>
                                    <div className="d-flex align-items-center text-muted">
                                        <div className="text-truncate">31k members</div>
                                        <div className="text-truncate">14k posts</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="d-flex justify-content-start mt-3">
                            {communities.length > 5 && (
                                <button onClick={()=>navigate(routes.susu().nested().associateCommunities(params.memberId))} className="btn btn-sm btn-primary">See {communities.length - communities.slice(0, 5).length} more...</button>
                            )}
                        </div>

                        <hr></hr>
                    </div>
                </div>
            </div>
        </div>
    )
}