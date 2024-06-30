import { PiCaretDownLight } from "react-icons/pi";
import { PiCaretRightLight } from "react-icons/pi";
import { GiCondorEmblem } from "react-icons/gi";
import { MdMenu } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import $ from "jquery";

export const Sidebar = () =>{
    const [show, setShow] = useState(false);

    const sidebarRef = useRef();

    let isDragging = false;
    let startX, initialPosition;
    
    const categories = [
        {
            category: 'Dashboard and Overview',
            menus: [
                {title: 'Dashboard/Home'},
                {title: 'Contribution Summary'},
                {title: 'Rotation Schedule Overview'},
                {title: 'Group Management'},
            ],
        },{
            category: 'Groups',
            menus: [
                {title: 'Group Details'},
                {title: 'Group Rules'},
                {title: 'Member List'},
                {title: 'Contribution History'},
                {title: 'User Profile and Settings'},
            ],
        },{
            category: 'Profile',
            menus: [
                {title: 'Account Settings'},
                {title: 'Security Settings'},
                {title: 'Privacy Settings'},
                {title: 'Notification Preferences'},
                {title: 'Financial Management'},
            ],
        },{
            category: 'Contribution Management',
            menus: [
                {title: 'Make Contributions'},
                {title: 'View Contributions'},
                {title: 'Financial Reports'},
                {title: 'Group Financial Summary'},
                {title: 'Member Contribution History'},
                {title: 'Communication and Interaction'},
            ],
        },{
            category: 'Messaging/Chat',
            menus: [
                {title: 'Notifications'},
                {title: 'Community Forum'},
                {title: 'Support and Help'},
            ],
        },{
            category: 'Help/Support',
            menus: [
                {title: 'FAQ'},
                {title: 'Contact Support'},
                {title: 'Information and Management'},
            ],
        },{
            devider: true
        },{
            category: 'Onboarding',
            menus: [
                {title: 'App Settings'},
                {title: 'Legal/Compliance'},
                {title: 'Logout/Exit'},
            ]
        }
    ];

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
                }if (moveX >= $(sidebarRef.current).width() / 2) {
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
            <div className="d-flex flex-column flex-shrink-0 p-3 vh-100">
                <button className="btn d-flex align-items-center pb-3 mb-3 w-100 shadow-none border-0 border-bottom rounded-0">
                    <GiCondorEmblem className="me-2 text-white display-5"/>
                    <span className="fs-5 fw-semibold text-white">Susu App</span>
                </button>
                <ul className="flex-column list-unstyled mb-auto ps-0">
                    {categories.map((cat, key)=>(
                        <li className={cat?.devider ? 'border-top my-3' : 'mb-1'} key={key}>
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
                                            <li key={key2}><button onClick={menu?.onClick} className="btn btn-sm">{menu.title}</button></li>
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
                        <strong>mdo</strong>
                    </a>
                    <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser1">
                        <li><button className="btn btn-sm w-100">New project...</button></li>
                        <li><button className="btn btn-sm w-100">Settings</button></li>
                        <li><button className="btn btn-sm w-100">Profile</button></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><button className="btn btn-sm w-100">Sign out</button></li>
                    </ul>
                </div>
            </div>
            <div className="sidebar-backdrop w-100 vh-100 d-block d-sm-none"></div>
        </div>
        </>
    )
}