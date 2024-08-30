import { useNavigate } from "react-router-dom";
import mobileView from "../images/mobile-view.png";
import { routes } from "../routes/Routes";
import { GiWorld } from "react-icons/gi";
import { GiPadlockOpen } from "react-icons/gi";
import { MdSwitchAccount } from "react-icons/md";
import { ModalOverlay } from "../container/ModalOverlay";
import { useEffect, useRef, useState } from "react";
import { ParseError } from "../utils/ParseError";
import { useAuth } from "../provider/AuthProvider";
import { api } from "../request/Api";

export const Invited = () =>{
    const { signIn } = useAuth();

    const [showLogin, setShowLogin] = useState();
    const [showRegister, setShowRegister] = useState();
    const [showConfirm, setShowConfirm] = useState();
    const [error, setError] = useState();
    const [user, setUser] = useState();
    const [message, setMessage] = useState();

    const navigate = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();

    const joinGroup = (groupId, memberId) =>{
        api.group.join(groupId, memberId).then((response)=>{
            setShowConfirm(true);
        }).catch((error)=>{
            setError(new ParseError().message(error));
        });
    }

    const joinSusu = (susuId, memberId) =>{
        api.susu.join(susuId, memberId).then((response)=>{
            setShowConfirm(true);
        }).catch((error)=>{
            setError(new ParseError().message(error));
        });
    }

    const middleWare = () =>{
        const searchArgs = window.location.hash.substring(1).split('?')[1];
        const params = new URLSearchParams(searchArgs);
        if(params.get('susuId')){
            setMessage('Congratulations! You have successfully joined the susu group. Welcome!');
            return joinSusu(params.get('susuId'), user.id);
        }
        if(params.get('groupId')){
            setMessage('Congratulations! You have successfully joined the group. Welcome!');
            return joinGroup(params.get('groupId'), user.id);
        }
    }

    const login = (e) =>{
        e.preventDefault();
        setError(null);
        api.auth.signIn(emailRef.current.value, passwordRef.current.value).then((response)=>{
            setUser(response.data.data[0]);
            setShowLogin(false);
            middleWare();
        }).catch((error)=>{
            setError(new ParseError().message(error));
        });
    }

    const register = (e) =>{
        e.preventDefault();
        setError(null);
        const formData = new FormData(e.target);
        const data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phoneNumber: formData.get('phoneNumber'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword')
        };
        api.auth.signUp(data).then((response)=>{
            setUser(response.data.data[0]);
            setShowRegister(false);
            middleWare();
        }).catch((error)=>{
            setError(new ParseError().message(error));
        });
    }

    useEffect(()=>{
        if(!user) return;
        middleWare();
    }, [user]);

    useEffect(()=>{
        setError(null);
    }, [showLogin, showRegister, showConfirm]);

    return(
        <div className="invited">
            <div className="d-block d-md-flex pt-5">
                <div className="w-100 pt-5 pe-5">
                    <h1>Boost your savings:</h1>
                    <h1>Smarter.</h1>
                    <p>Jon the community of users who are revolutionizing their financial habits</p>
                    <ul>
                        <li>Flexible Saving Plans</li>
                        <li>Instant Access</li>
                        <li>Automated Transactions</li>
                    </ul>
                    <div className="rounded-3 bg-light p-3 my-1">
                        <div className="mb-1">I already have an account and would like to confirm the invitation.</div>
                        <button onClick={()=>setShowLogin(true)} className="d-flex align-items-center btn btn-sm btn-primary">Confirm invite<GiPadlockOpen className="ms-2"/></button>
                    </div>
                    <div className="rounded-3 bg-light p-3 my-1">
                        <div className="mb-1">I would like to create an account and confirm the invitation.</div>
                        <button onClick={()=>setShowRegister(true)} className="d-flex align-items-center btn btn-sm btn-primary">Confirm invite<MdSwitchAccount className="ms-2"/></button>
                    </div>
                    <div className="rounded-3 p-3 my-1">
                        <button onClick={()=>navigate(routes.onboarding())} className="d-flex align-items-center btn btn-sm btn-secondary">Go to website<GiWorld className="ms-2"/></button>
                    </div>
                </div>
                <img className="w-50" src={mobileView} alt=""/>
            </div>
            <ModalOverlay show={showLogin} title={'Account confirmation'} onClose={()=>setShowLogin(false)}>
                {error ? <div className="alert alert-danger border-0 py-1">{error}</div> : null}
                <small>Email</small>
                <input ref={emailRef} className="form-control mb-2" placeholder="example@example.com" type="email"/>
                <small className="mt-2">Password</small>
                <input ref={passwordRef} className="form-control mb-2" placeholder="User1234#" type="password"/>
                <div className="d-flex justify-content-end mt-2">
                    <button onClick={login} className="btn btn-sm btn-primary">Confirm Access</button>
                </div>
            </ModalOverlay>
            <ModalOverlay show={showRegister} title={'Account confirmation: Register'} onClose={()=>setShowRegister(false)}>
                <form onSubmit={register}>
                    {error ? <div className="alert alert-danger border-0 py-1">{error}</div> : null}
                    <small>First Name</small>
                    <input className="form-control mb-2" placeholder="John" type="text" name="firstName" required/>
                    <small>Last Name</small>
                    <input className="form-control mb-2" placeholder="Wick" type="text" name="lastName" required/>
                    <small>Email Address</small>
                    <input className="form-control mb-2" placeholder="example@example.com" type="email" name="email" required/>
                    <small>Password</small>
                    <input className="form-control mb-2" placeholder="User1234#" type="password" name="password" required/>
                    <small>Confirm Password</small>
                    <input className="form-control mb-2" placeholder="User1234#" type="password" name="confirmPassword" required/>
                    <button className="btn btn-sm btn-primary" type="submit">Sign up</button>
                </form>
            </ModalOverlay>
            <ModalOverlay 
                show={showConfirm} 
                title={'Account confirmation'} 
                noHeader
                backdropOff
                footer={[
                    {title: 'Okay', color: 'primary', onClick: ()=>{
                        setShowConfirm(false);
                        navigate(routes.signIn());
                    }}
                ]}
            >
                <div className="text-success">{message}</div>
            </ModalOverlay>
        </div>
    )
}