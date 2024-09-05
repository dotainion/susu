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
    const { user, signOut } = useAuth();
    const { dashboardAndOverview, communities, profile, contributionManagement, messaging, help, onboarding, settings } = useSidebar();

    const categories = [dashboardAndOverview, communities, profile, contributionManagement, messaging, help, onboarding, settings];

    const [show, setShow] = useState(false);

    const navigate = useNavigate();

    const sidebarRef = useRef();
    const backdropRef = useRef();

    let isDragging = false;
    let startX, initialPosition;

    useEffect(()=>{
        $(backdropRef.current).on('click', ()=>{
            if(isDragging) return;
            setShow(false);
        });
        $(sidebarRef.current).on('touchstart mousedown', function(e) {
            if(window.innerWidth > 576) return;
            isDragging = true;
            startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
            initialPosition = $(this).position().left;
        });
        $(document).on('touchmove mousemove', function(e) {
            if (isDragging) {
                const moveX = startX - (e.type === 'touchmove' ? e.touches[0].clientX : e.clientX);
                const newPosition = initialPosition - moveX;
                if (newPosition <= initialPosition) {
                    $(sidebarRef.current).css('transform', `translateX(-${moveX}px)`);
                }
                if (moveX >= $(sidebarRef.current).width() / 2) {
                    setShow(false);
                }
            }
        });
        $(document).on('touchend mouseup', function() {
            if (isDragging) {
                isDragging = false;
                $(sidebarRef.current).css('transform', '');
            }
        });
    }, []);

    return(
        <>
        <div className="sidebar-menu position-fixed top-0 left-0 w-100 d-block d-sm-none">
            <button onClick={()=>setShow(!show)} className="btn bg-transparent shadow-none border-0 p-2"><MdMenu className="fs-1"/></button>
        </div>
        <div ref={sidebarRef} className={`sidebar ${show ? 'show' : ''}`}>
            <div onClick={(e)=>e.stopPropagation()} className="d-flex flex-column flex-shrink-0 overflow-hidden p-3 vh-100">
                <button onClick={()=>{
                    setShow(false);
                    navigate(routes.susu().home());
                }} className="btn d-flex align-items-center mb-3 px-0 shadow-none border-0 border-bottom rounded-0">
                    <GiCondorEmblem className="text-white display-5 d-none"/>
                    <img className="w-25" src={logo} alt="Susu Application"/>
                    <span className="fs-5 fw-semibold text-white text-decoration-underline">Susu App</span>
                </button>
                <ul className="flex-column list-unstyled mb-auto ps-0 overflow-auto">
                    {categories.map((cat, key)=>(
                        <li className={`${cat?.devider ? 'border-top my-3' : 'mb-1'}`} key={key}>
                            {!cat?.devider?
                                <>
                                <button className="btn btn-toggle align-items-center rounded collapsed shadow-none ps-1" data-bs-toggle="collapse" data-bs-target={`#collapse-sidebar-menu-id${key}`} aria-expanded="false">
                                    <PiCaretDownLight className="caret-down"/>
                                    <PiCaretRightLight className="caret-right"/>
                                    {cat.title}
                                </button>
                                <div className="collapse" id={`collapse-sidebar-menu-id${key}`}>
                                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                        {cat.list.map((menu, key2)=>(
                                            <li key={key2}>
                                                <button 
                                                    onClick={(e)=>{
                                                        menu?.onClick(e);
                                                        setShow(false);
                                                    }} className={`btn btn-sm text-start ${menu?.disabled ? 'text-secondary border-0' : ''}`} 
                                                    disabled={menu?.disabled}
                                                >{menu.title}</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                </>
                            :null}
                        </li>
                    ))}
                </ul>
                <div className="border-top my-3"></div>
                <div className="dropdown">
                    <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQJxKGGpPc9-5g25KWwnsCCy9O_dlS4HWo5A&s" alt="" width="32" height="32" className="rounded-circle me-2"/>
                        <strong className="text-truncate">{user.attributes.firstName} {user.attributes.lastName}</strong>
                    </a>
                    <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser1">
                        <li><button onClick={()=>navigate(routes.susu().newCommunity())} className="btn btn-sm w-100">New Community...</button></li>
                        <li><button className="btn btn-sm w-100">Settings</button></li>
                        <li><button onClick={()=>navigate(routes.susu().profile())} className="btn btn-sm w-100">Profile</button></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><button onClick={signOut} className="btn btn-sm w-100">Sign out</button></li>
                    </ul>
                </div>
            </div>
            <div ref={backdropRef} className="sidebar-backdrop w-100 vh-100 d-block d-sm-none"></div>
        </div>
        </>
    )
}