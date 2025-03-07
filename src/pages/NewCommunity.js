import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../request/Api";
import { routes } from "../routes/Routes";
import { GroupPrivacyCards } from "../components/GroupPrivacyCards";

export const NewCommunity = () =>{
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const idRef = useRef({value: null});
    const nameRef = useRef();
    const descriptionRef = useRef();
    const newPrivacyRef = useRef({value: null});
    const hideRef = useRef({value: false});

    const saveCommunity = () =>{
        setLoading(true);
        const community = {
            id: idRef.current.value,
            name: nameRef.current.value,
            description: descriptionRef.current.value,
            privacy: newPrivacyRef.current.value,
            hide: hideRef.current.value
        }
        api.community.set(community).then((response)=>{
            navigate(routes.susu().nested().community(response.data.data[0].id));
        }).catch((error)=>{
            console.log(error);
        }).finally(()=>{
            setLoading(false);
        });
    }

    useEffect(() => {
        
    }, []);
    
    return(
        <div className="container py-2 mt-2">
            <div className="m-auto mt-3" style={{maxWidth: '800px'}}>
                <div className="h4 mb-3">Community</div>
                <div className="w-100">
                    <div style={{minWidth: '200px'}}>Community Name</div>
                    <input ref={nameRef} className="form-control mb-3" placeholder="Community Name" type="text"/>
                    <div style={{minWidth: '200px'}}>Description</div>
                    <textarea ref={descriptionRef} className="form-control mb-3 resize-none" placeholder="Description" rows={5}/>
    
                    <hr></hr>
    
                    <GroupPrivacyCards onPrivacyChange={(privacy)=>newPrivacyRef.current.value = privacy} asInput/>
                </div>
                <div className="d-flex justify-content-center mt-4 mb-3">
                    <button onClick={saveCommunity} className="btn btn-sm px-4" disabled={loading}>Save</button>
                </div>
            </div>  12
        </div>
    )
}