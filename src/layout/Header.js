import { useNavigate } from "react-router-dom";
import { Dropdown } from "../widgets/Dropdown";
import { useAuth } from "../provider/AuthProvider";
import { routes } from "../routes/Routes";
import { MdMenu } from "react-icons/md";

export const Header = () =>{
    const { isAuthenticated, user } = useAuth();

    const navigate = useNavigate();

    return(
        <div className="d-flex justify-content-md-end">
            <div className="d-flex w-md-100 align-items-center flex-md-row-reverse gap-2 justify-content-between justify-content-md-end py-3">
                {
                    isAuthenticated &&
                    <button 
                        onClick={()=>navigate(routes.susu().default())} 
                        className="btn btn-sm btn-primary rounded-circle me-auto"
                        style={{minWidth: '41px', maxWidth: '41px', minHeight: '41px', maxHeight: '41px'}}
                        title={`Continue as ${user.attributes.firstName} ${user.attributes.lastName}`}
                    >{user.attributes.firstName?.[0]?.toUpperCase?.()}</button>
                }
                <div className="dropdown border-0 bg-transparent m-0 p-0">
                    <button className="btn bg-transparent d-block d-md-none shadow-none border-0 p-0" id="header1" data-bs-toggle="dropdown" aria-expanded="false">
                        <MdMenu className="display-5 text-dark"/>
                    </button>
                    <div className="dropdown-menu top-0 border-0 bg-transparent d-md-block position-md-absolute m-0 p-0">
                        <div className="d-flex flex-wrap gap-md-2 border rounded-3 bg-light p-1" aria-labelledby="header1">
                            <button onClick={()=>navigate(routes.onboarding())} className="btn btn-sm btn-light shadow-none w-md-100 text-md-center text-start">Home</button>
                            <button onClick={()=>navigate(routes.aboutUs())} className="btn btn-sm btn-light shadow-none w-md-100 text-md-center text-start">About us</button>
                            <button onClick={()=>navigate(routes.reasonForUs())} className="btn btn-sm btn-light shadow-none w-md-100 text-md-center text-start">Reason for us</button>
                            <button onClick={()=>navigate(routes.signIn())} className="btn btn-sm btn-light shadow-none w-md-100 text-md-center text-start">Sign in</button>
                            <button onClick={()=>navigate(routes.register())} className="btn btn-sm btn-light shadow-none w-md-100 text-md-center text-start">Sing up</button>
                            <Dropdown 
                                className="btn btn-sm btn-light shadow-none w-md-100 text-md-center text-start"
                                asContent
                                options={[{
                                    title: 'The application will be available for download soon'
                                }]}
                            >Download App</Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}