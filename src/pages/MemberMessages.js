import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";
import { useState } from "react";

export const MemberMessages = () =>{
    const [members, setMembers] = useState([
        {id: 1},
        {id: 1},
        {id: 1},
        {id: 1},
        {id: 1},
        {id: 1},
        {id: 1},
        {id: 1},
        {id: 1},
        {id: 1},
        {id: 1},
        {id: 1},
        {id: 1},
        {id: 1},
        {id: 1},
        {id: 1},
        {id: 1},
        {id: 1},
        {id: 1},
        {id: 1},
        {id: 1},
    ]);

    const navigate = useNavigate();
    return(
        <div className="container">
            <div className="vh-100 overflow-auto mx-auto" style={{maxWidth: '800px'}}>
                need somthing like a button to say new messages that you click and go into the space of the button
                should be able to list members or goups to change to
                if its a group go to a different component that shows the person who messaging
                {members.map((message, key)=>(
                    <button onClick={()=>navigate(routes.susu().nested().messages(message.id))} className="btn bg-transparent d-flex align-items-center my-3 w-100 text-start" key={key}>
                        <div>
                            <FaUser className="display-5"/>
                        </div>
                        <div className="w-100">
                            <div className="d-flex w-100">
                                <div className="fw-bold text-truncate w-100">John Wick</div>
                                <div className="small me-2">15:41</div>
                            </div>
                            <div className="d-flex w-100">
                                <div className="small text-truncate w-100">This is my test message</div>
                                <div className="badge bg-success">99+</div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}