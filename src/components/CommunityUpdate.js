import { useEffect, useRef, useState } from "react";
import { api } from "../request/Api"
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";
import { utils } from "../utils/Utils";

export const CommunityUpdate = ({className, community, auto}) =>{
    const navigate = useNavigate();

    const timeoutRef = useRef();
    const idRef = useRef({value: null});
    const nameRef = useRef();
    const descriptionRef = useRef();
    const newPrivacyRef = useRef();
    const hideRef = useRef(false);

    const saveCommunity = () =>{
        const community = {
            id: idRef.current.value,
            name: nameRef.current.value,
            description: descriptionRef.current.value,
            privacy: newPrivacyRef.current,
            hide: hideRef.current
        }
        api.community.set(community).then((response)=>{
            navigate(routes.susu().nested().community(response.data.data[0].id));
        }).catch((error)=>{
            console.log(error);
        });
    }

    const autoSaveCommunity = () =>{
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            saveCommunity();
        }, 500);
    }

    useEffect(() => {
        if(!community) return;
        idRef.current.value = community.id;
        nameRef.current.value = community.attributes.name;
        descriptionRef.current.value = community.attributes.description;
        newPrivacyRef.current = community.attributes.privacy;
        hideRef.current = community.attributes.hide;
    }, [community]);

    return(
        <div className={className} style={{maxWidth: '800px'}}>
            <div className="h4 mb-3">Community</div>
            <div onChange={auto && autoSaveCommunity} className="text-nowrap w-100">
                <div style={{minWidth: '200px'}}>Community Name</div>
                <input ref={nameRef} className="form-control mb-3" placeholder="Community Name" type="text"/>
                <div style={{minWidth: '200px'}}>Description</div>
                <textarea ref={descriptionRef} className="form-control mb-3 resize-none" placeholder="Description" rows={5}/>

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
            {!auto && (
                <div className="d-flex justify-content-center mt-4 mb-3">
                    <button onClick={saveCommunity} className="btn btn-sm px-4">Save</button>
                </div>
            )}
        </div>
    )
}