import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";
import { useRef, useState } from "react";
import { api } from "../request/Api";

export const MessangerSearchGroupOrMember = () =>{
    const [messangers, setMessangers] = useState([]);

    const navigate = useNavigate();

    const timeoutRef = useRef();

    const search = (e) =>{
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            api.message.searchMessagners(e.target.value).then((response)=>{
                setMessangers(response.data.data);
            }).catch((error)=>{
                console.log(error);
            });
        }, 500);
    }

    const navigateTo = (memberOrGroup) =>{
        if(memberOrGroup.type === 'group'){
            return navigate(routes.susu().nested().groupMessages(memberOrGroup.id));
        }
        navigate(routes.susu().nested().messages(memberOrGroup.id));
    }

    return(
        <div className="container">
            <div className="d-flex flex-column vh-100 mx-auto" style={{maxWidth: '800px'}}>
                <div className="d-flex align-items-center w-100 rounded-3 bg-white py-2 my-3">
                    <input onChange={search} className="form-control shadow-none border-0" type="text" placeholder="Search members or group..."/>
                </div>
                <div className="mb-auto overflow-auto">
                    {messangers.map((messenger, key)=>(
                        <button onClick={()=>navigateTo(messenger)} className="btn bg-transparent d-flex align-items-center py-3 w-100 text-start border-0 border-bottom rounded-0" key={key}>
                            <div className="me-2">
                                <FaUser className="display-5"/>
                            </div>
                            <div className="w-100">
                                <div className="fw-bold text-truncate w-100">John Wick</div>
                                <div className="small lh-1">{messenger.type === 'user' ? 'Member' : 'Group'}</div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}