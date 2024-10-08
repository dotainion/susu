import { useEffect, useRef, useState } from "react";
import { api } from "../request/Api"
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";
import { utils } from "../utils/Utils";
import { SelectOption } from "../widgets/SelectOption";

export const NewCommunity = () =>{
    const navigate = useNavigate();

    const [cycle , setCycle] = useState();
    const [cycles , setCycles] = useState();

    const idRef = useRef(null);
    const nameRef = useRef();
    const descriptionRef = useRef();
    const hideRef = useRef(false);

    const createCommunity = () =>{
        const community = {
            id: idRef.current,
            name: nameRef.current.value,
            description: descriptionRef.current.value,
            hide: hideRef.current
        }
        api.community.set(community).then((response)=>{
            navigate(routes.susu().nested().community(response.data.data[0].id));
        }).catch((error)=>{
            console.log(error);
        });
    }

    useEffect(()=>{
        api.susu.cycles().then((response)=>{
            const cycleLists = response.data.data.map((cyc)=>{
                return {
                    title: cyc.attributes.cycle, 
                    value: cyc.attributes.cycle
                }
            });
            setCycles(cycleLists);
        }).catch((error)=>{
            console.log(error);
        });
    }, []);

    return(
        <div className="container">
            <div className="bg-light py-2 rounded-4 mt-2 px-3">
                <div className="h4 my-3">Community</div>
                <div className="d-xl-flex d-block w-100">
                    <div className="me-5 mb-4">
                        <img style={{width: '200px', height: '200px'}} src="https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=" alt="" />
                    </div>
                    <div className="text-nowrap w-100">
                        <div className="d-md-flex d-block">
                            <div style={{minWidth: '200px'}}>Community Name</div>
                            <input ref={nameRef} className="form-control mb-3" placeholder="Community Name" type="text" style={{maxWidth: '500px'}}/>
                        </div>
                        <div className="d-md-flex d-block">
                            <div style={{minWidth: '200px'}}>Description</div>
                            <textarea ref={descriptionRef} className="form-control mb-3" placeholder="Description" style={{resize: 'none', maxWidth: '500px'}}/>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center my-3">
                    <button onClick={createCommunity} className="btn btn-sm px-4">Save</button>
                </div>
            </div>
        </div>
    )
}