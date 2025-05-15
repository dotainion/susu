import { useEffect, useRef, useState } from "react";
import { FaRegCopy } from "react-icons/fa6";
import { api } from "../request/Api";
import { useAuth } from "../provider/AuthProvider";
import { utils } from "../utils/Utils";
import { ParseError } from "../utils/ParseError";
import { PageHeader } from "../layout/PageHeader";
import img from "../images/group-bg-profile.png";
import $ from 'jquery';

export const Profile = () =>{
    const { user } = useAuth();

    const [address, setAddress] = useState();
    const [communities, setCommunities] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);
    const [toastStatus, setToastStatus] = useState(null);

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

    const oldPasswordRef = useRef();
    const newPasswordRef = useRef();

    const toastTimeoutRef = useRef();
    
    const update = () =>{
        updateProfile();
        upateAddress();
    }

    const updateProfile = () =>{
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
            toast('Your profile was updated successfully.', 'success');
        }).catch((error)=>{
            toast(new ParseError().message(error), 'danger');
        });
    }

    const upateAddress = () =>{
        const data = {
            id: address?.id || user.id,//the address id is the same as the user id, this is the link
            country: countryRef.current.value,
            state: stateRef.current.value,
            address: addressRef.current.value,
            apt: aptRef.current.value,
            zip: zipRef.current.value
        }
        api.user.setAddress(data).then((response)=>{
            toast('Your address was updated successfully.', 'success');
        }).catch((error)=>{
            toast(new ParseError().message(error), 'danger');
        });
    }

    const changePassword = () =>{
        api.auth.changePassword(user.id, newPasswordRef.current.value, oldPasswordRef.current.value).then((response)=>{
            toast('Your password has been changed successfully.', 'success');
        }).catch((error)=>{
            toast(new ParseError().message(error), 'danger');
        });
    }

    const toast = (message, status) =>{
        setToastMessage(message);
        setToastStatus(status);
        setShowToast(true);
        clearTimeout(toastTimeoutRef.current);
        toastTimeoutRef.current = setTimeout(() => {
            setShowToast(false);
        }, 5000);
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

        api.community.memberCommunities(user.id).then((response)=>{
            setCommunities(response.data.data);
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
        <div className="container bg-white">
            <div className="d-md-flex d-block gap-1 w-100 p-3">
                <div className="col-12 col-md-4 border rounded-3">
                    <div className="text-center">
                        <div className="h4 my-3">Profile</div>
                        <img className="border m-auto rounded-4" style={{width: '200px', height: '200px'}} src={img} alt="" />
                        <div className="py-3 px-2">
                            <div className="text-muted">Community Memberships</div>
                            <div className="fw-bold w-100">{communities.length}</div>
                        </div>
                    </div>
                    <div className="bg-light border rounded-3 p-2 mb-3">
                        <button disabled className="btn btn-sm btn-light border w-100">Update Photo</button>
                    </div>
                    <div className="mb-3">
                        <div className="small text-muted">Old Password</div>
                        <input ref={oldPasswordRef} className="form-control" type="password"/>
                    </div>
                    <div className="mb-3">
                        <div className="small text-muted">New Password</div>
                        <input ref={newPasswordRef} className="form-control" type="password"/>
                    </div>
                    <button onClick={changePassword} className="btn btn-sm btn-light w-100">Change Password</button>
                </div>

                <div onChange={update} className="text-nowrap w-100 col-12 col-md-8">                    
                    <div className="card overflow-hidden border rounded-3 mb-3">
                        <div className="card-header border-0 text-muted small">User information</div>
                        <div className="card-body">
                            <div className="mb-3">
                                <div className="small text-muted">First Name</div>
                                <input ref={firstNameRef} className="form-control" placeholder="John" type="text"/>
                            </div>
                            <div className="mb-3">
                                <div className="small text-muted">Last Name</div>
                                <input ref={lastNameRef} className="form-control" placeholder="Wick" type="text"/>
                            </div>
                            <div>
                                <div className="small text-muted">Gender</div>
                                <select ref={genderRef} className="form-control form-select">
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card border overflow-hidden rounded-3 mb-3">
                        <div className="card-header border-0 text-muted small">Contact information</div>
                        <div className="card-body">
                            <div className="mb-3">
                                <div className="small text-muted">Email</div>
                                <input ref={emailRef} className="form-control" placeholder="example@example.com" type="email"/>
                            </div>
                            <div>
                                <div className="small text-muted">Phone Number</div>
                                <input ref={phoneRef} className="form-control" placeholder="1 (473) 000 0000" type="tel"/>
                            </div>
                        </div>
                    </div>

                    <div className="card border overflow-hidden rounded-3 mb-3">
                        <div className="card-header border-0 text-muted small">About me</div>
                        <div className="card-body">
                            <div>
                                <div className="small text-muted">Bio</div>
                                <textarea ref={bioRef} className="form-control resize-none" placeholder="Bio" rows={5}/>
                            </div>
                        </div>
                    </div>

                    <div className="card border overflow-hidden rounded-3">
                        <div className="card-header border-0 text-muted small">Location</div>
                        <div className="card-body">
                            <div className="mb-3">
                                <div className="small text-muted">Country</div>
                                <select ref={countryRef} className="form-control form-select">
                                    <option>Grenada</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <div className="small text-muted">State</div>
                                <select ref={stateRef} className="form-control form-select">
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
                            <div className="mb-3">
                                <div className="small text-muted">Address</div>
                                <input ref={addressRef} className="form-control" placeholder="Address" type="text"/>
                            </div>
                            <div className="mb-3">
                                <div className="small text-muted">Apartment</div>
                                <input ref={aptRef} className="form-control" placeholder="Apt" type="text"/>
                            </div>
                            <div>
                                <div className="small text-muted">Zip</div>
                                <input ref={zipRef} className="form-control" placeholder="00000" type="text" disabled/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <hr></hr>
            <div className="d-flex w-100 justify-content-center flex-column striped-list">
                <div className="py-3 px-2 m-auto" style={{maxWidth: '500px'}}>
                    <div className="small text-muted">Member ID</div>
                    <div onClick={(e)=>utils.copy.toClipboard($(e.currentTarget).find('div').first())} className="d-flex align-items-center form-control bg-white position-relative pointer">
                        <div className="w-100 text-nowrap">{user?.id}</div>
                        <button className="btn bg-transparent shadow-none border-0 p-0"><FaRegCopy className="text-secondary fs-5"/></button>
                    </div>
                    <div className="small">The Member ID serves as a unique identifier assigned to each member within the SUSU app. You can use this ID to easily locate and add members to your savings and credit communities. Simply paste or enter the Member ID into the search field to find specific members.</div>
                </div>
            </div>

            <div className="toast-container top-0 end-0 p-3">
                {showToast && (
                    <div className="toast bg-white show border-0" role="alert" aria-live="assertive" aria-atomic="true">
                        <div className={`toast-body alert alert-${toastStatus} border-0 d-flex justify-content-between text-dark gap-2`}>
                            <div className="text-danger">{toastMessage}</div>
                            <button onClick={()=>setShowToast(false)} className="btn-close" type="button"></button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}