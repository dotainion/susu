import { useEffect, useRef, useState } from "react";
import { FaRegCopy } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { api } from "../request/Api";

export const Profile = () =>{
    const [profile, setProfile] = useState();
    const [address, setAddress] = useState();

    const params = useParams();

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const genderRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const bioRef = useRef();
    const countryRef = useRef();
    const stateRef = useRef();
    const addressRef = useRef();

    useEffect(() => {
        if(params.profileId) return;
        api.user.user(params.profileId).then((response)=>{
            setProfile(response.data.data[0]);
        }).catch((error)=>{

        });
        api.user.address(params.profileId).then((response)=>{
            setAddress(response.data.data[0]);
        }).catch((error)=>{

        });
    }, []);

    useEffect(() => {
        if(!profile) return;
        firstNameRef.current.value = profile.attributes.firstName;
        lastNameRef.current.value = profile.attributes.lastName;
        genderRef.current.value = profile.attributes.gender;
        emailRef.current.value = profile.attributes.email;
        phoneRef.current.value = profile.attributes.phoneNumber;
        bioRef.current.value = profile.attributes.bio;
    }, [profile]);

    useEffect(() => {
        if(!address) return;
        countryRef.current.value = address.attributes.country;
        stateRef.current.value = address.attributes.state;
        addressRef.current.value = address.attributes.address;
    }, [address]);

    return(
        <div className="container">
            <div className="h4 my-3">Profile</div>
            <div className="d-xl-flex d-block w-100">
                <div className="me-5 mb-4">
                    <img style={{width: '200px', height: '200px'}} src="https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=" alt="" />
                </div>
                <div className="text-nowrap w-100">
                    <div className="d-md-flex d-block">
                        <div style={{minWidth: '200px'}}>First Name</div>
                        <input ref={firstNameRef} className="form-control mb-3" placeholder="John" type="text" style={{maxWidth: '500px'}}/>
                    </div>
                    <div className="d-md-flex d-block">
                        <div style={{minWidth: '200px'}}>Last Name</div>
                        <input ref={lastNameRef} className="form-control mb-3" placeholder="Wick" type="text" style={{maxWidth: '500px'}}/>
                    </div>
                    <div className="d-md-flex d-block">
                        <div style={{minWidth: '200px'}}>Gender</div>
                        <select ref={genderRef} className="form-control form-select mb-3" style={{maxWidth: '500px'}}>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>
                    <div className="border-bottom border-white mb-3 text-muted small">Contact information</div>
                    <div className="d-md-flex d-block">
                        <div style={{minWidth: '200px'}}>Email</div>
                        <input ref={emailRef} className="form-control mb-3" placeholder="example@example.com" type="email" style={{maxWidth: '500px'}}/>
                    </div>
                    <div className="d-md-flex d-block">
                        <div style={{minWidth: '200px'}}>Phone Number</div>
                        <input ref={phoneRef} className="form-control mb-3" placeholder="1 (473) 000 0000" type="tel" style={{maxWidth: '500px'}}/>
                    </div>
                    <div className="border-bottom border-white mb-3 text-muted small">About me</div>
                    <div className="d-md-flex d-block">
                        <div style={{minWidth: '200px'}}>Bio</div>
                        <textarea ref={bioRef} className="form-control mb-3" placeholder="Description" style={{resize: 'none', maxWidth: '500px'}}/>
                    </div>
                    <div className="border-bottom border-white mb-3 text-muted small">Location</div>
                    <div className="d-md-flex d-block">
                        <div style={{minWidth: '200px'}}>Country</div>
                        <select ref={countryRef} className="form-control form-select mb-3" style={{maxWidth: '500px'}}>
                            <option>Grenada</option>
                        </select>
                    </div>
                    <div className="d-md-flex d-block">
                        <div style={{minWidth: '200px'}}>State</div>
                        <select ref={stateRef} className="form-control form-select mb-3" style={{maxWidth: '500px'}}>
                            <option>Grenada</option>
                            <option>Saint George</option>
                            <option>Saint John</option>
                            <option>Saint Mark</option>
                            <option>Saint Patrick</option>
                            <option>Saint Andrew</option>
                            <option>Saint David</option>
                            <option>Carriacou</option>
                            <option>Petite Martinique</option>
                        </select>
                    </div>
                    <div className="d-md-flex d-block">
                        <div style={{minWidth: '200px'}}>Address</div>
                        <input ref={addressRef} className="form-control mb-3" placeholder="Address" type="text" style={{maxWidth: '500px'}}/>
                    </div>
                </div>
            </div>
            <div className="d-flex w-100 justify-content-center flex-column striped-list">
                <div className="py-3 px-2 m-auto" style={{maxWidth: '500px'}}>
                    <div>Member ID</div>
                    <div className="d-flex align-items-center form-control bg-white">
                        <div className="w-100">{profile?.id}</div>
                        <button className="btn bg-transparent shadow-none border-0 p-0"><FaRegCopy className="fs-5"/></button>
                    </div>
                    <div className="small">The Member ID serves as a unique identifier assigned to each member within the SUSU app. You can use this ID to easily locate and add members to your savings and credit groups. Simply paste or enter the Member ID into the search field to find specific members.</div>
                </div>
                <div className="py-3 px-2 m-auto" style={{maxWidth: '500px'}}>
                    <div>Group Memberships</div>
                    <div className="w-100">25</div>
                </div>
            </div>
        </div>
    )
}