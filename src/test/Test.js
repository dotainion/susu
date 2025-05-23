import React, { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { Messangers } from "../pages/Messangers";
import { NewCommunity } from "../pages/NewCommunity";
import { Community } from "../pages/Community";
import { Profile } from "../pages/Profile";
import { ViewCommunity } from "../pages/ViewCommunity";
import { UpdateMemberSusuWallet } from "../pages/UpdateMemberSusuWallet";
import { CommenceSusuOverlay } from "../components/CommenceSusuOverlay";
import { api } from "../request/Api";
import { ContributionRefund } from "../pages/ContributionRefund";
import { ModalOverlay } from "../container/ModalOverlay";
import { InviteOption } from "../components/InviteOption";
import { Invited } from "../pages/Invited";
import { AssignSchedule } from "../pages/AssignSchedule";
import { Appearance } from "../pages/Appearance";
import { CommunityDashboard } from "../pages/dashboard/CommunityDashboard";
import { ShareSocialMediaOverlay } from "../components/ShareSocialMediaOverlay";
import { Susu } from "../pages/Susu";
import { NavMain } from "../layout/navigator/NavMain";
import { Payments } from "../pages/Payments";
import { PaymentSuccess } from "../pages/PaymentSuccess";
import { SiTruenas } from "react-icons/si";
import { PaymentRefund } from "../pages/PaymentRefund";
import { Schedule } from "../pages/Schedule";
import { CommunityHeader } from "../components/CommunityHeader";
import { CommunityFeeds } from "../components/CommunityFeeds";
import { LikesAndComment } from "../components/LikesAndComment";
import { utils } from "../utils/Utils";
import { Draggable, Droppable } from "../components/DragAndDropUtils";
import { SusuSchedules } from "../components/SusuSchedules";
import { FaCalendarAlt, FaGenderless, FaPhone, FaRegCopy, FaUserCircle } from 'react-icons/fa';
import { CommunityMembers } from "../pages/CommunityMembers";
import { Member } from "../pages/Member";
import { mockData } from "../contents/MockData";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";
import { FiPhone, FiMapPin, FiHome } from 'react-icons/fi';
import { HiOutlineUser } from 'react-icons/hi';
import { MembersList } from "../pages/MembersList";
import { OwnerJoinSusuAlert } from "../components/OwnerJoinSusuAlert";
import { TiMessages } from "react-icons/ti";
import { MdDateRange, MdEmail, MdGroups } from "react-icons/md";
import { AiOutlineFileProtect } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { RiProfileLine } from "react-icons/ri";
import { IoPeopleSharp } from "react-icons/io5";
import { AssociateCommunities } from "../pages/AssociateCommunities";
import { Messages } from "../pages/Messages";
import { Search } from "../widgets/Search";
import { InfiniteScrollContainer } from "../components/InfiniteScrollContainer";
import { MessageBox } from "../components/MessageBox";
import { FaMoneyBillWave } from 'react-icons/fa';
import img from "../images/group-bg-profile.png";
import $ from "jquery";

export const Test = () =>{
    const [member, setMember] = useState();
    const [members, setMembers] = useState([]);
    const [communities, setCommunities] = useState([]);

    const navigate = useNavigate();

    useEffect(()=>{
        //example of designs
        //https://trello.com/
        //form this: Workflows for any project, big or small

        setMember(mockData.user());
        setCommunities(mockData.communities());
    }, []);

    if(!member) return null;

    return(
        <div className="container">
            
        </div>
    )
}
