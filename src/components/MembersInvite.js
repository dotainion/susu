import { useEffect, useRef, useState } from "react"
import { FaUserCircle } from "react-icons/fa"
import { api } from "../request/Api";
import { useParams } from "react-router-dom";
import { utils } from "../utils/Utils";
import { ParseError } from "../utils/ParseError";

export const MembersInvite = ({isSusu, referenceId, title}) =>{
    const [members, setMembers] = useState([]);

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

    return(
        <div className="d-flex justify-content-center text-nowrap w-100">
            <div className="w-100" style={{maxWidth: '600px'}}>
                <div className="h4 text-center my-4">{title}</div>
                <input onKeyUp={onSearch} className="form-control shadow-none" type="text" placeholder="Search members..."/>
                <hr></hr>
                {members.map((member, key)=>(
                    <MemberInviteCard 
                        member={member}
                        isSusu={isSusu}
                        referenceId={referenceId}
                        key={key}
                    />
                ))}
            </div>
        </div>
    )
}

const MemberInviteCard = ({member, isSusu, referenceId}) =>{
    const [invite, setInvaite] = useState();
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState();

    const params = useParams();

    const share = () =>{
        setLoading(true);
        utils.share.url('/some/url', 'some title').then(()=>{
            setLoading(false);
        });
    }

    const sendInvite = (e) =>{
        setLoading(true);
        setErrors(null);
        const data = {
            id: null,
            memberId: member.id,
            targetId: referenceId,
            isSusu: isSusu,
        }
        api.invite.set(data).then((response)=>{
            setChecked(true);
            setInvaite(response.data.data[0]);
        }).catch((error)=>{
            setErrors(new ParseError().message(error));
        }).finally(()=>{
            setLoading(false);
        });
    }

    const undoInvite = (e) =>{
        setLoading(true);
        setErrors(null);
        api.invite.delete(invite.id).then((response)=>{
            setChecked(false);
            setInvaite(null);
        }).catch((error)=>{
            setErrors(new ParseError().message(error));
        }).finally(()=>{
            setLoading(false);
        });
    }

    return(
        <button className="btn bg-transparent d-block shadow-none text-start my-1 border-0 w-100">
            <div className="d-flex align-items-center pointer">
                <div className="position-relative me-2">
                    <FaUserCircle className="fs-1"/>
                </div>
                <div className="w-100">
                    <div className="text-truncate">{member.attributes.firstName} {member.attributes.lastName}</div>
                    <div className="small lh-0"><small>{member.attributes.email}</small></div>
                    {errors ? <div className="small text-danger">{errors}</div> : null}
                </div>
                {
                    loading
                        ? <div className="me-2">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        : <>
                            <button onClick={share} className="btn btn-sm bg-sidebar shadow-none me-2">Share</button>
                            {
                                checked
                                    ? <button onClick={undoInvite} className="btn btn-sm bg-transparent border text-brown shadow-none">Undo</button>
                                    : <button onClick={sendInvite} className="btn btn-sm bg-sidebar shadow-none">Invite</button>
                            }
                        </>
                }
            </div>
        </button>
    )
}