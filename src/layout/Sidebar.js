import { PiCaretDownLight } from "react-icons/pi";
import { PiCaretRightLight } from "react-icons/pi";
import { GiCondorEmblem } from "react-icons/gi";
import { MdMenu } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import $ from "jquery";
import { routes } from "../routes/Routes";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { api } from "../request/Api";

export const Sidebar = () =>{
    const { user, signOut } = useAuth();

    const [show, setShow] = useState(false);

    const categories = [
        {
            category: 'Dashboard and Overview',
            menus: [
                {title: 'Dashboard', onClick: ()=>navigate(routes.susu().dashboard())},
                {title: 'Contribution Summary', disabled: true},
                {title: 'Rotation Schedule Overview', disabled: true},
                {title: 'Group Management', disabled: true},
            ],
        },{
            category: 'Groups',
            menus: [
                {title: 'Create Group', onClick: ()=>navigate(routes.susu().newGroup())},
                {title: 'Group List', onClick: ()=>navigate(routes.susu().groupList())},
                {title: 'Member List', onClick: ()=>navigate(routes.susu().memberList())},
                {title: 'My Groups', onClick: ()=>navigate(routes.susu().ownerGroups())},
                {title: 'Contribution History', disabled: true},
                //{title: 'User Profile and Settings', disabled: true},
            ],
        },{
            category: 'Profile',
            menus: [
                {title: 'Account', onClick: ()=>navigate(routes.susu().profile())},
                {title: 'Account Settings', disabled: true},
                {title: 'Privacy Settings', disabled: true},
                {title: 'Notification Preferences', disabled: true},
                {title: 'Financial Management', disabled: true},
            ],
        },{
            category: 'Contribution Management',
            menus: [
                //need to navigate to a page that may have a list of groups and you choose to then navigate to see a list of contibutions
                // the others may fallow that same structure.
                {title: 'Make Contributions', disabled: true},
                {title: 'View Contributions', disabled: true},
                {title: 'Financial Reports', disabled: true},
                {title: 'Group Financial Summary', disabled: true},
                {title: 'Member Contribution History', disabled: true},
                {title: 'Communication and Interaction', disabled: true},
            ],
        },{
            category: 'Messaging/Chat',
            menus: [
                {title: 'Chats', onClick: ()=>navigate(routes.susu().messangers())},
                {title: 'Notifications', disabled: true},
                {title: 'Community Forum', disabled: true},
                {title: 'Support and Help', disabled: true},
            ],
        },{
            category: 'Help/Support',
            menus: [
                {title: 'FAQ', disabled: true},
                {title: 'Contact Support', disabled: true},
                {title: 'Information and Management', disabled: true},
            ],
        },{
            devider: true
        },{
            category: 'Onboarding',
            menus: [
                {title: 'App Settings', disabled: true},
                {title: 'Legal/Compliance', disabled: true},
                {title: 'Logout/Exit', disabled: true},
            ]
        }
    ];

    const navigate = useNavigate();

    const sidebarRef = useRef();

    let isDragging = false;
    let startX, initialPosition;

    useEffect(()=>{
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
            <div className="d-flex flex-column flex-shrink-0 overflow-hidden p-3 vh-100">
                <button className="btn d-flex align-items-center pb-3 mb-3 w-100 shadow-none border-0 border-bottom rounded-0">
                    <GiCondorEmblem className="me-2 text-white display-5"/>
                    <span className="fs-5 fw-semibold text-white">Susu App</span>
                </button>
                <ul className="flex-column list-unstyled mb-auto ps-0 overflow-auto">
                    {categories.map((cat, key)=>(
                        <li className={`${cat?.devider ? 'border-top my-3' : 'mb-1'}`} key={key}>
                            {!cat?.devider?
                                <>
                                <button className="btn btn-toggle align-items-center rounded collapsed shadow-none ps-1" data-bs-toggle="collapse" data-bs-target={`#collapse-sidebar-menu-id${key}`} aria-expanded="false">
                                    <PiCaretDownLight className="caret-down"/>
                                    <PiCaretRightLight className="caret-right"/>
                                    {cat.category}
                                </button>
                                <div className="collapse" id={`collapse-sidebar-menu-id${key}`}>
                                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                        {cat.menus.map((menu, key2)=>(
                                            <li key={key2}>
                                                <button onClick={menu?.onClick} className={`btn btn-sm text-start ${menu?.disabled ? 'text-secondary border-0' : ''}`} disabled={menu?.disabled}>{menu.title}</button>
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
                        <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2"/>
                        <strong className="text-truncate">{user.attributes.firstName} {user.attributes.lastName}</strong>
                    </a>
                    <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser1">
                        <li><button onClick={()=>navigate(routes.susu().newGroup())} className="btn btn-sm w-100">New Group...</button></li>
                        <li><button className="btn btn-sm w-100">Settings</button></li>
                        <li><button onClick={()=>navigate(routes.susu().profile())} className="btn btn-sm w-100">Profile</button></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><button onClick={signOut} className="btn btn-sm w-100">Sign out</button></li>
                    </ul>
                </div>
            </div>
            <div className="sidebar-backdrop w-100 vh-100 d-block d-sm-none"></div>
        </div>
        </>
    )
}