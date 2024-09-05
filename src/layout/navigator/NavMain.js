import { useEffect, useState } from "react";
import { MdDashboard } from "react-icons/md";
import { FaLayerGroup } from "react-icons/fa";
import { RiProfileLine } from "react-icons/ri";
import { GiPayMoney } from "react-icons/gi";
import { TiMessages } from "react-icons/ti";
import { IoMdHelpCircle } from "react-icons/io";
import { MdManageAccounts } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { routes } from "../../routes/Routes";
import { useSidebar } from "../SidebarProvider";
import { useNavigate } from "react-router-dom";
import { NavGrid } from "../../components/NavGrid";

export const NavMain = () =>{
    const { dashboardAndOverview, communities, profile, contributionManagement, messaging, help, onboarding, settings } = useSidebar();

    const navigate = useNavigate();

    const categories = {
        title: 'Navigation Bar',
        list: [
            {
                title: dashboardAndOverview.title,
                onClick: ()=>navigate(routes.nav().nested().dashboardAndOverview()),
                icon: MdDashboard,
                description: dashboardAndOverview.description
            },{
                title: communities.title,
                onClick: ()=>navigate(routes.nav().nested().communities()),
                icon: FaLayerGroup,
                description: communities.description
            },{
                title: profile.title,
                onClick: ()=>navigate(routes.nav().nested().profile()),
                icon: RiProfileLine,
                description: profile.description
            },{
                title: contributionManagement.title,
                onClick: ()=>navigate(routes.nav().nested().contributionManagement()),
                icon: GiPayMoney,
                description: contributionManagement.description
            },{
                title: messaging.title,
                onClick: ()=>navigate(routes.nav().nested().messaging()),
                icon: TiMessages,
                description: messaging.description
            },{
                title: help.title,
                onClick: ()=>navigate(routes.nav().nested().help()),
                icon: IoMdHelpCircle,
                description: help.description
            },{
                title: onboarding.title,
                onClick: ()=>navigate(routes.nav().nested().onboarding()),
                icon: MdManageAccounts,
                description: onboarding.description
            },{
                title: settings.title,
                onClick: ()=>navigate(routes.nav().nested().settings()),
                icon: IoSettings,
                description: settings.description
            },
        ],
    }

    return(
        <NavGrid nav={categories}/>
    )
}