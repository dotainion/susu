import { PiCaretDownLight } from "react-icons/pi";
import { PiCaretRightLight } from "react-icons/pi";
import { GiCondorEmblem } from "react-icons/gi";
import { MdMenu } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import $ from "jquery";
import { routes } from "../routes/Routes";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import logo from "../images/logo.png";
import { useSidebar } from "./SidebarProvider";
import { utils } from "../utils/Utils";

export const Sidebar = () =>{
    const { signOut } = useAuth();

    const navigate = useNavigate();

    useEffect(()=>{
        
    }, []);

    return(
        <>
        <div className="d-flex align-items-center flex-sm-column sidebar">
            <div className="mb-auto me-auto">
                <button onClick={()=>navigate(routes.nav().main())} className="btn bg-transparent text-primary shadow-none border-0 p-2"><MdMenu className="fs-2"/></button>
            </div>
            <div className="dropdown mb-sm-3 me-2 me-sm-0">
                <a href="#" className="d-flex justify-content-center d-block w-100" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQJxKGGpPc9-5g25KWwnsCCy9O_dlS4HWo5A&s" alt="" width="32" height="32" className="rounded-circle"/>
                </a>
                <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser1">
                    <li><button onClick={()=>navigate(routes.susu().newCommunity())} className="btn bg-transparent w-100">New Community...</button></li>
                    <li><button className="btn bg-transparent w-100">Settings</button></li>
                    <li><button onClick={()=>navigate(routes.susu().profile())} className="btn bg-transparent w-100">Profile</button></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><button onClick={signOut} className="btn bg-transparent w-100">Sign out</button></li>
                </ul>
            </div>
        </div>
        </>
    )
}