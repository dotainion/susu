import { MdLockOutline } from "react-icons/md";
import { MdPublic } from "react-icons/md";
import { FaCreditCard } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { api } from "../request/Api";
import { ParseError } from "../utils/ParseError";

export const GroupPrivacyCards = ({community, onCommunityChange}) =>{
    const [privacy, setPrivacy] = useState();
    const [errors, setErrors] = useState();

    const PRIVACY = {
        PRIVATE: 'private',
        PUBLIC: 'public',
        LINK: 'link'
    }

    const change = (newPrivacy) =>{
        setErrors(null);
        const data = {
            id: community.id,
            ...community.attributes,
            privacy: newPrivacy
        }
        api.community.set(data).then((response)=>{
            setPrivacy(response.data.data[0].attributes.privacy);
            onCommunityChange?.(response.data.data[0]);
        }).catch((error)=>{
            setErrors(new ParseError().message(error));
        });
    }

    useEffect(()=>{
        setPrivacy(community.attributes.privacy);
    }, [community]);

    return(
        <div className="card cursor-defualt border-0 overflow-hidden w-100 px-0 mt-3">
            <div className="card-body card-body-light">
                <div className="user-select-none">
                    <div>
                        <div className="h5">Privacy</div>
                        <div className="small">Choose who can view and access this group.</div>
                        {errors ? <div className="alert alert-danger small border-0">{errors}</div> : null}
                    </div>
                    <hr></hr>
                    <div className="row d-flex flex-column flex-md-row">
                        <div className="col-12 col-md-4 mb-2 mb-md-0 px-2">
                            <div onClick={()=>change(PRIVACY.PUBLIC)} className={`card overflow-hidden position-relative h-100 ${privacy === PRIVACY.PUBLIC ? 'border-primary' : ''}`}>
                                <div className="card-body">
                                    <div className="d-flex d-lg-block justify-content-between h5 fw-bold small">Public<MdPublic className="text-primary fs-5 ms-2"/></div>
                                    <div>Anyone can view this group content and join</div>
                                </div>
                                {privacy === PRIVACY.PUBLIC && (
                                    <div className="position-absolute top-0 end-0 text-primary mt-2 me-2">
                                        <FaCircleCheck className="fs-4"/>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-12 col-md-4 mb-2 mb-md-0 px-2">
                            <div onClick={()=>change(PRIVACY.PRIVATE)} className={`card overflow-hidden position-relative h-100 ${privacy === PRIVACY.PRIVATE ? 'border-primary' : ''}`}>
                                <div className="card-body">
                                    <div className="d-flex d-lg-block justify-content-between h5 fw-bold small">Private<MdLockOutline className="text-primary fs-5 ms-2"/></div>
                                    <div>Anyone who i invite or have the group info can join</div>
                                </div>
                                {privacy === PRIVACY.PRIVATE && (
                                    <div className="position-absolute top-0 end-0 text-primary mt-2 me-2">
                                        <FaCircleCheck className="fs-4"/>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-12 col-md-4 mb-2 mb-md-0 px-2">
                            <div onClick={()=>change(PRIVACY.LINK)} className={`card overflow-hidden position-relative h-100 ${privacy === PRIVACY.LINK ? 'border-primary' : ''}`}>
                                <div className="card-body">
                                    <div className="d-flex d-lg-block justify-content-between h5 fw-bold small">Only via links<FaCreditCard className="text-primary fs-5 ms-2"/></div>
                                    <div>Anyone who have the link can join</div>
                                </div>
                                {privacy === PRIVACY.LINK && (
                                    <div className="position-absolute top-0 end-0 text-primary mt-2 me-2">
                                        <FaCircleCheck className="fs-4"/>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}