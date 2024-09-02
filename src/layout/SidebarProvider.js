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

const Context = createContext();
export const useSidebar = () => useContext(Context);

export const SidebarProvider = ({children}) =>{
    const { signOut } = useAuth();

    const navigate = useNavigate();

    const categories = [
        {
            category: 'Dashboard and Overview',
            menus: [
                {title: 'Dashboard', onClick: ()=>navigate(routes.susu().dashboard()), icon: MdDashboard},
                {title: 'Contribution Summary', disabled: true, icon: GiPayMoney},
                {title: 'Rotation Schedule Overview', disabled: true, icon: GrSchedules},
                {title: 'Group Management', disabled: true, icon: MdManageAccounts},
            ],
        },{
            category: 'Groups',
            menus: [
                {title: 'Create Group', onClick: ()=>navigate(routes.susu().newGroup()), icon: LuGroup},
                {title: 'Groups', onClick: ()=>navigate(routes.susu().groupList()), icon: FaLayerGroup},
                {title: 'My Groups', onClick: ()=>navigate(routes.susu().associateGroups()), icon: FaObjectUngroup},
                {title: 'Contribution History', disabled: true, icon: GiTakeMyMoney},
                //{title: 'User Profile and Settings', disabled: true},
            ],
        },{
            category: 'Profile',
            menus: [
                {title: 'Account', onClick: ()=>navigate(routes.susu().profile()), icon: BiSolidUserAccount},
                {title: 'Members', onClick: ()=>navigate(routes.susu().memberList()), icon: FaUsers},
                {title: 'Account Settings', disabled: true, icon: RiUserSettingsFill},
                {title: 'Privacy Settings', disabled: true, icon: MdPrivacyTip},
                {title: 'Notification Preferences', disabled: true, icon: IoMdNotifications},
                {title: 'Financial Management', disabled: true, icon: GrMoney},
            ],
        },{
            category: 'Contribution Management',
            menus: [
                //need to navigate to a page that may have a list of groups and you choose to then navigate to see a list of contibutions
                // the others may fallow that same structure.
                {title: 'Make Contributions', disabled: true, icon: GiPayMoney},
                {title: 'View Contributions', disabled: true, icon: HiClipboardDocumentList},
                {title: 'Financial Reports', disabled: true, icon: IoDocumentText},
                {title: 'Group Financial Summary', disabled: true, icon: FaMoneyCheck},
                {title: 'Member Contribution History', disabled: true, icon: MdHistory},
                {title: 'Communication and Interaction', disabled: true, icon: AiFillInteraction},
            ],
        },{
            category: 'Messaging/Chat',
            menus: [
                {title: 'Chats', onClick: ()=>navigate(routes.susu().messangers()), icon: IoChatbubbles},
                {title: 'Notifications', disabled: true, icon: IoMdNotifications},
                {title: 'Community Forum', disabled: true, icon: FaForumbee},
                {title: 'Support and Help', disabled: true, icon: IoHelpCircleOutline},
            ],
        },{
            category: 'Help/Support',
            menus: [
                {title: 'FAQ', disabled: true, icon: FaQuora},
                {title: 'Contact Support', disabled: true, icon: TiContacts},
                {title: 'Information and Management', disabled: true, icon: MdMedicalInformation},
            ],
        },{
            devider: true
        },{
            category: 'Onboarding',
            menus: [
                {title: 'App Settings', disabled: true, icon: IoSettings},
                {title: 'Legal/Compliance', disabled: true, icon: GrCompliance},
                {title: 'Logout/Exit', onClick: ()=>signOut(), icon: GiExitDoor},
            ]
        },{
            category: 'Setting',
            menus: [
                {title: 'Appearance', disabled: true, icon: MdStyle},
            ]
        }
    ];

    const value = {
        categories
    }
    return(
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}