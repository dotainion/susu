import { GiCondorEmblem } from "react-icons/gi";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../routes/Routes";
import { useAuth } from "../provider/AuthProvider";
import { useEffect, useState } from "react";
import { ParseError } from "../utils/ParseError";

export const Signin = () =>{
    const { signIn } = useAuth();

    const [error, setError] = useState();

    const navigate = useNavigate();

    const login = (e) =>{
        e.preventDefault();
        const data = new FormData(e.target);
        signIn(data.get('email'), data.get('password'), (status)=>{
            if(status.error){
                return setError(new ParseError().message(status.error));
            }
            navigate(routes.susu().default());
        });
    }

    useEffect(()=>{
        const params = new URLSearchParams(window.location.href);
        console.log(params.get('susuId'));
    }, []);

    return(
        <form onSubmit={login} className="d-flex vh-100">
            <div className="d-md-flex d-none align-items-center justify-content-center bg-light w-100">
                <GiCondorEmblem style={{fontSize: '300px'}}/>
            </div>
            <div className="d-flex flex-column justify-content-center w-100 p-4">
                <div style={{maxWidth: '500px'}}>
                    <h1>Susu Application</h1>
                    <hr></hr>
                    {error ? <div className="text-danger">{error}</div> : null}
                    <small>Email Address</small>
                    <input className="form-control mb-3" placeholder="example@example.com" type="email" name="email" required/>
                    <small>Password</small>
                    <input className="form-control mb-3" placeholder="User1234#" type="password" name="password" required/>
                    <button className="btn px-4 mt-3 d-block" type="submit">Sign in</button>
                    <span onClick={()=>navigate(routes.register())} className="link-primary d-inlne-block btn px-0 border-0 mt-3">Sign up instead</span>
                </div>
            </div>
        </form>
    )
}