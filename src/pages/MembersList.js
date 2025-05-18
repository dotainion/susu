import { useEffect, useRef, useState } from "react";
import { api } from "../request/Api";
import { routes } from "../routes/Routes";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";
import { FiPhone, FiMapPin, FiHome } from 'react-icons/fi';
import { HiOutlineUser } from 'react-icons/hi';
import { mockData } from "../contents/MockData";
import { Search } from "../widgets/Search";
import img from "../images/group-bg-profile.png";
import { InfiniteScrollContainer } from "../components/InfiniteScrollContainer";

export const MembersList = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [spin, setSpin] = useState(false);

    const navigate = useNavigate();

    const valueRef = useRef();
    const timeoutRef = useRef();

    const onSearch = (e) =>{
        valueRef.current = e.target.value;
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setSpin(true);
            api.user.search({value: valueRef.current, limit: 100}).then((response)=>{
                setMembers(response.data.data);
            }).catch((error)=>{
                setMembers([]);
            }).finally(()=>{
                setSpin(false);
            });
        }, 100);
    }

    useEffect(() => {
        api.user.users().then((response)=>{
            setMembers(response.data.data);
        }).catch((error)=>{

        }).finally(()=>{
            setLoading(false);
        });
        if(process.env.NODE_ENV === 'development'){
            setMembers(mockData.susu().attributes.members);
        }
    }, []);

    if(loading) return <Loader show/>

    return (
        <div className="container py-5">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
                <h2 className="mb-0">Member Directory</h2>
                <Search onSearch={onSearch} />
            </div>

            <InfiniteScrollContainer
                className="row" 
                batchSize={100} 
                defaultItems={members} 
                apiPath="api.user.search"
            >
                {(member)=>(
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-2" key={member.id}>
                        <div
                            onClick={() => navigate(routes.susu().nested().member(member.id))}
                            className="card h-100 border-0 shadow-sm rounded-2 pointer hover-shadow transition overflow-hidden"
                        >
                            <div className="card-body p-3">
                                <div className="d-flex align-items-center mb-2">
                                    <div
                                        className="overflow-hidden rounded-circle bg-primary text-white d-flex justify-content-center align-items-center fw-bold flex-shrink-0"
                                        style={{ width: '42px', height: '42px', fontSize: '1.1rem' }}
                                    >
                                        <img src={img} className="w-100 h-100" alt={member.attributes.firstName} draggable={false} />
                                    </div>
                                    <div className="ms-3 flex-grow-1">
                                        <h6 className="mb-0 text-truncate">{member.attributes.firstName} {member.attributes.lastName}</h6>
                                        <div className="small text-muted text-truncate">{member.attributes.email}</div>
                                    </div>
                                </div>

                                <div className="small text-muted d-flex flex-wrap gap-2 mt-2">
                                    {member.attributes.phoneNumber && (
                                        <span className="badge bg-light border text-dark">
                                            <FiPhone className="me-1" />{member.attributes.phoneNumber}
                                        </span>
                                    )}
                                    {member.attributes.address?.attributes?.state && (
                                        <span className="badge bg-light border text-dark">
                                            <FiMapPin className="me-1" />{member.attributes.address?.attributes?.state}
                                        </span>
                                    )}
                                    {member.attributes.address?.attributes?.address && (
                                        <span className="badge bg-light border text-dark">
                                            <FiHome className="me-1" />{member.attributes.address?.attributes?.address}
                                        </span>
                                    )}
                                    {member.attributes.gender && (
                                        <span className="badge bg-light border text-dark">
                                            <HiOutlineUser className="me-1" />{member.attributes.gender}
                                        </span>
                                    )}
                                </div>

                                {member.attributes.bio && (
                                    <div className="mt-3 small text-muted" style={{ maxHeight: '40px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {member.attributes.bio}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </InfiniteScrollContainer>
            <Loader show={spin} />
        </div>
    )
}
