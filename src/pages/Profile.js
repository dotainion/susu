import { useEffect, useRef, useState } from "react";
import { FaRegCopy } from "react-icons/fa6";
import { api } from "../request/Api";
import { useAuth } from "../provider/AuthProvider";
import { utils } from "../utils/Utils";
import $ from 'jquery';
import { ParseError } from "../utils/ParseError";

export const Profile = () =>{
    const { user } = useAuth();

    const [address, setAddress] = useState();
    const [groups, setGroups] = useState([]);
    const [error, setError] = useState();

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const genderRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const bioRef = useRef();
    const countryRef = useRef();
    const stateRef = useRef();
    const addressRef = useRef();
    const aptRef = useRef();
    const zipRef = useRef();

    
    const update = () =>{
        updateProfile();
        upateAddress();
    }

    const updateProfile = () =>{
        setError(null);
        const data = {
            id: user.id,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            gender: genderRef.current.value,
            email: emailRef.current.value,
            phoneNumber: phoneRef.current.value,
            bio: bioRef.current.value,
        };
        api.user.editProfile(data).then((response)=>{
            
        }).catch((error)=>{
            setError(new ParseError().message(error));
        });
    }

    const upateAddress = () =>{
        setError(null);
        const data = {
            id: address?.id || user.id,//the address id is the same as the user id, this is the link
            country: countryRef.current.value,
            state: stateRef.current.value,
            address: addressRef.current.value,
            apt: aptRef.current.value,
            zip: zipRef.current.value
        }
        api.user.setAddress(data).then((response)=>{
            
        }).catch((error)=>{
            setError(new ParseError().message(error));
        });
    }

    useEffect(() => {
        if(!user) return;

        firstNameRef.current.value = user.attributes.firstName;
        lastNameRef.current.value = user.attributes.lastName;
        genderRef.current.value = user.attributes.gender;
        emailRef.current.value = user.attributes.email;
        phoneRef.current.value = user.attributes.phoneNumber;
        bioRef.current.value = user.attributes.bio;

        api.user.address(user.id).then((response)=>{
            setAddress(response.data.data[0]);
        }).catch((error)=>{

        });

        api.group.memberGroups(user.id).then((response)=>{
            setGroups(response.data.data);
        }).catch((error)=>{

        });
    }, [user]);

    useEffect(() => {
        if(!address) return;
        countryRef.current.value = address.attributes.country;
        stateRef.current.value = address.attributes.state;
        addressRef.current.value = address.attributes.address;
        aptRef.current.value = address.attributes.apt;
    }, [address]);

    return(
        <div className="container">
            <div className="h4 my-3">Profile</div>
            <div className="d-xl-flex d-block w-100">
                <div className="me-5 mb-4">
                    <img style={{width: '200px', height: '200px'}} src="https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=" alt="" />
                    <div className="py-3 px-2" style={{maxWidth: '500px'}}>
                        <div>Group Memberships</div>
                        <div className="fw-bold w-100">{groups.length}</div>
                    </div>
                </div>
                <div onChange={update} className="text-nowrap w-100">
                    {error ? <div className="alert alert-danger border-0">{error}</div> : null}
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
                    <div className="border-bottom mb-3 text-muted small">Contact information</div>
                    <div className="d-md-flex d-block">
                        <div style={{minWidth: '200px'}}>Email</div>
                        <input ref={emailRef} className="form-control mb-3" placeholder="example@example.com" type="email" style={{maxWidth: '500px'}}/>
                    </div>
                    <div className="d-md-flex d-block">
                        <div style={{minWidth: '200px'}}>Phone Number</div>
                        <input ref={phoneRef} className="form-control mb-3" placeholder="1 (473) 000 0000" type="tel" style={{maxWidth: '500px'}}/>
                    </div>
                    <div className="border-bottom mb-3 text-muted small">About me</div>
                    <div className="d-md-flex d-block">
                        <div style={{minWidth: '200px'}}>Bio</div>
                        <textarea ref={bioRef} className="form-control mb-3" placeholder="Bio" style={{resize: 'none', maxWidth: '500px'}}/>
                    </div>
                    <div className="border-bottom mb-3 text-muted small">Location</div>
                    <div className="d-md-flex d-block">
                        <div style={{minWidth: '200px'}}>Country</div>
                        <select ref={countryRef} className="form-control form-select mb-3" style={{maxWidth: '500px'}}>
                            <option>Grenada</option>
                        </select>
                    </div>
                    <div className="d-md-flex d-block">
                        <div style={{minWidth: '200px'}}>State</div>
                        <select ref={stateRef} className="form-control form-select mb-3" style={{maxWidth: '500px'}}>
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
                    <div className="d-md-flex d-block">
                        <div style={{minWidth: '200px'}}>Apartment</div>
                        <input ref={aptRef} className="form-control mb-3" placeholder="Apt" type="text" style={{maxWidth: '500px'}}/>
                    </div>
                    <div className="d-md-flex d-block">
                        <div style={{minWidth: '200px'}}>Zip</div>
                        <input ref={zipRef} className="form-control mb-3" placeholder="00000" type="text" style={{maxWidth: '500px'}} disabled/>
                    </div>
                </div>
            </div>
            <div className="bg-sec rounded-4 d-flex w-100 justify-content-center flex-column striped-list">
                <div className="py-3 px-2 m-auto" style={{maxWidth: '500px'}}>
                    <div>Member ID</div>
                    <div onClick={(e)=>utils.copy.toClipboard($(e.currentTarget).find('div').first())} className="d-flex align-items-center form-control bg-white position-relative pointer">
                        <div className="w-100 text-nowrap">{user?.id}</div>
                        <button className="btn bg-transparent shadow-none border-0 p-0"><FaRegCopy className="fs-5"/></button>
                    </div>
                    <div className="small">The Member ID serves as a unique identifier assigned to each member within the SUSU app. You can use this ID to easily locate and add members to your savings and credit groups. Simply paste or enter the Member ID into the search field to find specific members.</div>
                </div>
            </div>
        </div>
    )
}