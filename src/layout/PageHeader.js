import { FaUser, FaSignOutAlt, FaTachometerAlt, FaCreditCard } from "react-icons/fa";
import logo from "../images/logo.png";
import { menu } from "framer-motion/client";
import { routes } from "../routes/Routes";
import { useAuth } from "../provider/AuthProvider";
import { useLocation, useNavigate, useParams, matchPath } from "react-router-dom";
import { IoNotifications } from "react-icons/io5";
import { CgCommunity } from "react-icons/cg";
import { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { MdPeople } from "react-icons/md";
import { useLayout } from "./Layout";
import { MdKeyboardCommandKey } from "react-icons/md";

export const PageHeader = () =>{
    const { user, signOut } = useAuth();
    const { layoutParams } = useLayout();

    const [menuList, setMenuList] = useState([]);

    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();

    useLayoutEffect(()=>{
        const newMenuList = [];
        const communityId = params.communityId || layoutParams?.communityId;

        !matchPath({path: routes.susu().nested().dashboard(), end: false}, location.pathname) && 
        communityId ? 
        newMenuList.push({
            title: 'Dashboard',
            icon: FaTachometerAlt,
            action: ()=>navigate(routes.susu().nested().dashboard(params.susuId, communityId)),
        }) : 
        (!matchPath({path: routes.susu().nested().associateCommunities(user.id), end: false}, location.pathname) && 
        newMenuList.push({
            title: 'Community hub',
            icon: CgCommunity,
            action: ()=>navigate(routes.susu().nested().associateCommunities(user.id)),
        }));

        !matchPath({path: routes.susu().nested().contributors(), end: false}, location.pathname) && 
        communityId && 
        newMenuList.push({
            title: 'Contributors',
            icon: ()=> (
                <Fragment>
                    <MdPeople />
                    <FaCreditCard />
                </Fragment>
            ),
            action: ()=>navigate(routes.susu().nested().contributors(communityId)),
        });

        const isCommunity = () =>{
            if(
                matchPath({path: routes.susu().nested().community(), end: false}, location.pathname) || 
                matchPath({path: routes.susu().nested().viewCommunity(), end: false}, location.pathname)
            ) return true;
            return false;
        }
        !isCommunity() && communityId && 
        newMenuList.push({
            title: 'Community',
            icon: MdKeyboardCommandKey,
            action: ()=>navigate(routes.susu().nested().community(communityId)),
        });

        !matchPath({path: routes.susu().nested().profile(), end: false}, location.pathname) && 
        newMenuList.push({
            title: 'Profile',
            icon: FaUser,
            action: ()=>navigate(routes.susu().nested().profile()),
        });

        newMenuList.push({
            title: 'Logout',
            bg: 'bg-danger',
            icon: FaSignOutAlt,
            action: ()=>signOut(),
        });
        setMenuList(newMenuList);
    }, [location, layoutParams]);

    return(
        <div className="position-sticky top-0 d-none d-sm-block" style={{zIndex: 999}}>
            <header className="d-flex justify-content-between align-items-center bg-light shadow-sm bg-opacity-75 py-3">
                <div className="d-none d-md-flex align-items-center gap-2 ms-3">
                    <img src={logo} alt="SusuSpice Logo" style={{height: 36}} />
                    <h5 className="mb-0 fw-semibold text-primary">SusuSpice</h5>
                </div>

                <div className="d-flex gap-2 align-items-center overflow-auto w-md-100">
                    {menuList.map((menu, key)=>(
                        <button onClick={menu.action} className={`d-flex align-items-center gap-1 btn btn-sm text-nowrap ${menu?.bg || 'btn-outline-primary'} rounded-pill shadow-none px-2 ${menuList.length-1 === key ? 'me-auto' : ''}`} key={key}>
                            <menu.icon /> 
                            <span>{menu.title}</span>
                        </button>
                    ))}
                    <IoNotifications className="mx-3"/>
                </div>
            </header>
        </div>
    )
}