import { useLocation, useNavigate } from "react-router-dom";
import { Dropdown } from "../widgets/Dropdown";
import { useAuth } from "../provider/AuthProvider";
import { routes } from "../routes/Routes";
import { MdMenu } from "react-icons/md";
import { useEffect } from "react";
import $ from 'jquery';

export const Header = () =>{
    const { isAuthenticated, user } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const options = [
        {
            title: 'Home',
            onClick: ()=>navigate(routes.landing()),
            css: (location.pathname === routes.landing() ? 'active' : ''),
        },{
            title: 'About Us',
            onClick: ()=>navigate(routes.about()),
            css: (location.pathname === routes.about() ? 'active' : ''),
        },{
            title: 'Reason For Us',
            onClick: ()=>navigate(routes.reason()),
            css: (location.pathname === routes.reason() ? 'active' : ''),
        },{
            title: 'FAQ',
            onClick: ()=>navigate(routes.faq()),
            css: (location.pathname === routes.faq() ? 'active' : ''),
        },{
            title: 'Contact Us',
            onClick: ()=>navigate(routes.contact()),
            css: (location.pathname === routes.contact() ? 'active' : ''),
        },{
            title: 'Sign In',
            onClick: ()=>navigate(routes.signIn()),
            css: (location.pathname === routes.signIn() ? 'active' : ''),
        },{
            title: 'Get Started',
            onClick: ()=>navigate(routes.register()),
            css: (location.pathname === routes.register() ? 'active' : ''),
        },
    ];

    return(
        <header className="position-fixed start-0 top-0 w-100">
            <div className="container">
                <div className="d-flex justify-content-md-end">
                    <div className="d-flex w-md-100 align-items-center flex-md-row-reverse gap-2 justify-content-between justify-content-md-end py-3">
                        {
                            isAuthenticated &&
                            <button 
                                onClick={()=>navigate(routes.susu().default())} 
                                className="btn btn-sm btn-secondary rounded-circle me-auto"
                                style={{minWidth: '41px', maxWidth: '41px', minHeight: '41px', maxHeight: '41px'}}
                                title={`Continue as ${user.attributes.firstName} ${user.attributes.lastName}`}
                            >{user.attributes.firstName?.[0]?.toUpperCase?.()}</button>
                        }
                        <div className="dropdown border-0 bg-transparent m-0 p-0">
                            <button className="btn bg-transparent d-block d-md-none shadow-none border-0 p-0" id="header1" data-bs-toggle="dropdown" aria-expanded="false">
                                <MdMenu className="display-5 text-secondary"/>
                            </button>
                            <div className="dropdown-menu top-0 border-0 bg-transparent d-md-block position-md-absolute m-0 p-0">
                                <div className="d-flex flex-wrap gap-md-3 border rounded-3 bg-light py-1 px-3" aria-labelledby="header1">
                                    {options.map((nav, key)=>(
                                        <a 
                                            onClick={nav.onClick} 
                                            className={`btn btn-sm w-md-100 text-md-center text-start underline-animate shadow-none text-dark border-0 px-0 ${nav.css}`}
                                            key={key}
                                        >{nav.title}</a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}