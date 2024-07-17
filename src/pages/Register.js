import { GiCondorEmblem } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";
import { api } from "../request/Api";
import { useState } from "react";
import { ParseError } from "../utils/ParseError";

export const Register = () =>{
    const [error, setError] = useState();

    const navigate = useNavigate();

    const register = (e) =>{
        e.stopPropagation();
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
            navigate(routes.susu().default());
        }).catch((error)=>{
            setError(new ParseError().message(error));
        });
    }
    return(
        <form onSubmit={register} className="d-flex vh-100">
            <div className="d-md-flex d-none align-items-center justify-content-center bg-light w-100">
                <GiCondorEmblem style={{fontSize: '300px'}}/>
            </div>
            <div className="d-flex flex-column justify-content-center w-100 p-4">
                <div style={{maxWidth: '500px'}}>
                    <h1>Susu Application</h1>
                    <hr></hr>
                    {error ? <div className="text-danger">{error}</div> : null}
                    <small>First Name</small>
                    <input className="form-control mb-3" placeholder="John" type="text" name="firstName" required/>
                    <small>Last Name</small>
                    <input className="form-control mb-3" placeholder="Wick" type="text" name="lastName" required/>
                    <small>Email Address</small>
                    <input className="form-control mb-3" placeholder="example@example.com" type="email" name="email" required/>
                    <small>Password</small>
                    <input className="form-control mb-3" placeholder="User1234#" type="password" name="password" required/>
                    <small>Confirm Password</small>
                    <input className="form-control mb-3" placeholder="User1234#" type="password" name="confirmPassword" required/>
                    <button className="btn px-4 mt-3 d-block" type="submit">Sign up</button>
                    <span onClick={()=>navigate(routes.signIn())} className="link-primary d-inlne-block btn px-0 border-0 mt-3">Sign in instead</span>
                </div>
            </div>
        </form>
    )
}