import { useEffect, useRef, useState } from "react";
import { api } from "../request/Api"
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";
import { utils } from "../utils/Utils";

export const NewCommunity = () =>{
    const navigate = useNavigate();

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
        
    }, []);

    return(
        <div className="container">
            <div className="bg-light py-2 rounded-4 mt-2 px-3 px-md-5">
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

                        <hr></hr>
                        
                        <div className="form-group">
                            <label>Rules and Guidelines</label>
                            <textarea className="form-control" rows="3" style={{resize: 'none'}} disabled />
                        </div>

                        <div className="row d-flex">
                            <div className="col form-group">
                                <label>Privacy Settings</label>
                                <select className="form-control" disabled>
                                    <option value="Public">Public</option>
                                    <option value="Private">Private</option>
                                </select>
                            </div>
                            <div className="col form-group">
                                <label>Join Request Settings</label>
                                <select className="form-control" disabled>
                                    <option value="Open">Open</option>
                                    <option value="Approval Required">Approval Required</option>
                                </select>
                            </div>
                            <div className="col form-group">
                                <label>Group Type</label>
                                <select className="form-control" disabled>
                                    <option value="Open">Open</option>
                                    <option value="Closed">Closed</option>
                                    <option value="Invitation-only">Invitation-only</option>
                                </select>
                            </div>
                        </div>

                        <hr></hr>

                        <div className="w-100 ms-0 ms-md-2 my-3 my-md-0">
                            <div className="bg-transparent card-body">
                                <div className="form-group">
                                    <label>Social Media Links</label>
                                    <input type="text" className="form-control" disabled />
                                </div>
                            </div>
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