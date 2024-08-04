import { useEffect, useState } from "react"
import { FaUserCircle } from "react-icons/fa"
import { api } from "../request/Api";
import { useParams } from "react-router-dom";

export const SusuMembers = () =>{
    const [members, setMembers] = useState([]);

    const params = useParams();

    useEffect(()=>{
        api.user.bySusu(params.susuId).then((response)=>{
            setMembers(response.data.data);
        }).catch((error)=>{

        });
    }, []);

    return(
        <div className="d-flex justify-content-center text-nowrap w-100">
            <div className="w-100" style={{maxWidth: '600px'}}>
                <div className="h4 text-center my-4">Susu Members</div>
                <hr></hr>
                {members.map((member, key)=>(
                    <MemberCard member={member} key={key}/>
                ))}
            </div>
        </div>
    )
}

const MemberCard = ({member}) =>{
    const [undo, setUndo] = useState(false);
    const [undoSpinner, setUndoSpinner] = useState(false);
    const [removeSpinner, setRemoveSpinner] = useState(false);

    const params = useParams();

    const deleteMember = () =>{
        setRemoveSpinner(true);
        api.susu.unlink(params.groupId, member.id).then((response)=>{
            setUndo(true);
        }).catch((error)=>{
            console.log(error);
        }).finally(()=>{
            setRemoveSpinner(false);
        });
    }

    const undoDeleteMember = () =>{
        setUndoSpinner(true);
        api.susu.join(params.groupId, member.id).then((response)=>{
            setUndo(false);
        }).catch((error)=>{
            console.log(error);
        }).finally(()=>{
            setUndoSpinner(false);
        });
    }

    return(
        <button className="selected-label btn bg-transparent d-block shadow-none text-start my-1 border-0 w-100">
            <label className="d-flex align-items-center pointer">
                <div className="me-2">
                    <FaUserCircle className="display-5"/>
                </div>
                <input className="d-none" type="checkbox" id={member.id}/>
                <div className="w-100">
                    <div className="text-truncate">{member.attributes.firstName} {member.attributes.lastName}</div>
                    <div className="small"><small>First Name Last Name</small></div>
                </div>
                <div>
                    {
                        undo
                        ? <button onClick={undoDeleteMember} className="d-flex align-items-center btn btn-sm btn-outline-primary bg-transparent text-primary">
                            {
                                undoSpinner 
                                ? <div className="spinner-border spinner-border-sm me-2" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div> 
                                : null
                            }
                            <div>Undo</div>
                        </button>
                        : <button onClick={deleteMember} className="d-flex align-items-center btn btn-sm btn-danger">
                            {
                                removeSpinner
                                ? <div className="spinner-border spinner-border-sm me-2" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                : null
                            }
                            <div>Remove</div>
                        </button>
                    }
                </div>
            </label>
        </button>
    )
}