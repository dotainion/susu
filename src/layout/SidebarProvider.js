import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { routes } from "../routes/Routes";
import { MdDashboard } from "react-icons/md";
import { GiPayMoney } from "react-icons/gi";
import { GrSchedules } from "react-icons/gr";
import { MdManageAccounts } from "react-icons/md";
import { LuGroup } from "react-icons/lu";
import { FaLayerGroup } from "react-icons/fa";
import { FaObjectUngroup } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { BiSolidUserAccount } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { RiUserSettingsFill } from "react-icons/ri";
import { MdPrivacyTip } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { GrMoney } from "react-icons/gr";
import { IoChatbubbles } from "react-icons/io5";
import { FaForumbee } from "react-icons/fa";
import { IoHelpCircleOutline } from "react-icons/io5";
import { FaQuora } from "react-icons/fa";
import { TiContacts } from "react-icons/ti";
import { MdMedicalInformation } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { GrCompliance } from "react-icons/gr";
import { GiExitDoor } from "react-icons/gi";
import { MdStyle } from "react-icons/md";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { IoDocumentText } from "react-icons/io5";
import { MdHistory } from "react-icons/md";
import { AiFillInteraction } from "react-icons/ai";
import { FaMoneyCheck } from "react-icons/fa";
import { IoShareSocial } from "react-icons/io5";
import { utils } from "../utils/Utils";

const Context = createContext();
export const useSidebar = () => useContext(Context);

export const SidebarProvider = ({children}) =>{
    const { signOut } = useAuth();

    const navigate = useNavigate();

    const dashboardAndOverview =    {
        title: 'Dashboard and Overview',
        description: 'Get a snapshot of your key metrics and current activities. Monitor performance, track progress, and stay updated with important notifications.',
        list: [
            {title: 'Dashboard', onClick: ()=>navigate(routes.susu().nested().dashboard()), icon: MdDashboard},
            {title: 'Contribution Summary', disabled: true, icon: GiPayMoney},
            {title: 'Rotation Schedule Overview', disabled: true, icon: GrSchedules},
            {title: 'community Management', disabled: true, icon: MdManageAccounts},
        ],
    }
    const communities ={
        title: 'Communities',
        description: 'Manage and participate in your communities. View community activities, access shared resources, and collaborate with members.',
        list: [
            {title: 'Create Community', onClick: ()=>navigate(routes.susu().newCommunity()), icon: LuGroup},
            {title: 'Communities', onClick: ()=>navigate(routes.susu().communities()), icon: FaLayerGroup},
            {title: 'My Communities', onClick: ()=>navigate(routes.susu().associateCommunities()), icon: FaObjectUngroup},
            {title: 'Contribution History', disabled: true, icon: GiTakeMyMoney},
        ],
    }
    const profile = {
        title: 'Profile',
        description: 'View and edit your personal information. Update your contact details, profile picture, and other settings related to your account.',
        list: [
            {title: 'Account', onClick: ()=>navigate(routes.susu().profile()), icon: BiSolidUserAccount},
            {title: 'Members', onClick: ()=>navigate(routes.susu().memberList()), icon: FaUsers},
            {title: 'Account Settings', disabled: true, icon: RiUserSettingsFill},
            {title: 'Privacy Settings', disabled: true, icon: MdPrivacyTip},
            {title: 'Notification Preferences', disabled: true, icon: IoMdNotifications},
            {title: 'Financial Management', disabled: true, icon: GrMoney},
        ],
    }
    const contributionManagement = {
        title: 'Contribution Management',
        description: 'Track and manage your contributions. Review your recent activities, update records, and manage submissions.',
        list: [
            //need to navigate to a page that may have a list of communities and you choose to then navigate to see a list of contibutions
            // the others may fallow that same structure.
            {title: 'Make Contributions', disabled: true, icon: GiPayMoney},
            {title: 'View Contributions', disabled: true, icon: HiClipboardDocumentList},
            {title: 'Financial Reports', disabled: true, icon: IoDocumentText},
            {title: 'Community Financial Summary', disabled: true, icon: FaMoneyCheck},
            {title: 'Member Contribution History', disabled: true, icon: MdHistory},
            {title: 'Communication and Interaction', disabled: true, icon: AiFillInteraction},
        ],
    }
    const messaging ={
        title: 'Messaging/Chat',
        description: 'Send and receive messages. Communicate with team members, communities, or other contacts within the platform.',
        list: [
            {title: 'Chats', onClick: ()=>navigate(routes.susu().messangers()), icon: IoChatbubbles},
            {title: 'Notifications', disabled: true, icon: IoMdNotifications},
            {title: 'Community Forum', disabled: true, icon: FaForumbee},
            {title: 'Support and Help', disabled: true, icon: IoHelpCircleOutline},
        ],
    }
    const help ={
        title: 'Help/Support',
        description: 'Access support resources and find answers to your questions. Browse FAQs, contact support, or get guidance on using the platform.',
        list: [
            {title: 'FAQ', disabled: true, icon: FaQuora},
            {title: 'Contact Support', disabled: true, icon: TiContacts},
            {title: 'Information and Management', disabled: true, icon: MdMedicalInformation},
        ],
    }
    const onboarding = {
        title: 'Onboarding',
        description: 'Get started with our platform. Follow step-by-step instructions and tutorials designed to help you become familiar with key features.',
        list: [
            {title: 'Share', onClick: ()=>utils.share.url('', 'Susu Application'), icon: IoShareSocial},
            {title: 'App Settings', disabled: true, icon: IoSettings},
            {title: 'Legal/Compliance', disabled: true, icon: GrCompliance},
            {title: 'Logout/Exit', onClick: ()=>signOut(), icon: GiExitDoor},
        ]
    }
    const settings = {
        title: 'Setting',
        description: 'Customize your preferences and configure your account. Adjust notification settings, privacy options, and other preferences.',
        list: [
            {title: 'Appearance', disabled: true, icon: MdStyle},
        ]
    }

    const value = {
        dashboardAndOverview,
        communities,
        profile,
        contributionManagement,
        messaging,
        help,
        onboarding,
        settings
    }
    return(
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}