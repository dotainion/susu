import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";
import { useAuth } from "../provider/AuthProvider";
import mobileView from "../images/mobile-view.png";

export const Onboarding = () =>{
    const { isAuthenticated, user } = useAuth();

    const navigate = useNavigate();
    return(
        <div className="w-100" style={{minHeight: '100vh'}}>
            <div className="container pt-5">
                <div className="d-flex pt-5">
                    <div className="w-100">
                        <h1>Boost your savings:</h1>
                        <h1>Smarter.</h1>
                        <p>Jon the community of users who are revolutionizing their financial habits</p>
                        <ul>
                            <li>Flexible Saving Plans</li>
                            <li>Instant Access</li>
                            <li>Automated Transactions</li>
                            <button className="btn btn-lg btn-light mt-4">Download App</button>
                        </ul>
                    </div>
                    <div className="w-100">
                        <div className="d-flex justify-content-end">
                            {
                                isAuthenticated
                                    ? <button onClick={()=>navigate(routes.susu().default())} className="btn btn-sm btn-success">Continue as {user?.attributes?.firstName} {user?.attributes?.lastName}</button>
                                    : <button onClick={()=>navigate(routes.signIn())} className="btn btn-sm btn-success">Sign in</button>
                            }
                            <button onClick={()=>navigate(routes.register())} className="btn btn-sm btn-primary ms-3">Sign up</button>
                        </div>
                        <img className="w-50" src={mobileView} alt=""/>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <div className="text-center border-bottom p-3">
                    <img style={{width: '100px'}} src="https://fastsusu.com/wp-content/uploads/2022/06/Frame-167-5.png" alt=""/>
                    <div className="fw-bold">Choose your journey</div>
                    <small>what is your role at the company. this can help lead where yopu start within our app.</small>
                    <div className="d-flex justify-content-center m-4">
                        <button onClick={()=>navigate(routes.signIn())} className="btn px-4">Sign in</button>
                        <button onClick={()=>navigate(routes.register())} className="btn px-4 ms-3">Sign up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}