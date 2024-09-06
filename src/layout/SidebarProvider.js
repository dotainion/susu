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
            {
                title: 'Dashboard', 
                onClick: ()=>navigate(routes.susu().nested().dashboard()), 
                icon: MdDashboard,
                description: 'Provides an overview of key metrics and current activity, offering a snapshot of your system’s performance and status.'
            },{
                title: 'Contribution Summary', 
                disabled: true, 
                icon: GiPayMoney,
                description: 'Displays a detailed summary of your contributions, including recent activities, achievements, and metrics.'
            },{
                title: 'Rotation Schedule Overview', 
                disabled: true, 
                icon: GrSchedules,
                description: 'Shows the schedule and details of rotation assignments, including upcoming shifts, changes, and schedules for team members'
            },{
                title: 'community Management', 
                disabled: true, 
                icon: MdManageAccounts,
                description: 'Access tools and features for managing community interactions, including member management, communication tools, and community settings.'
            },
        ],
    }
    const communities ={
        title: 'Communities',
        description: 'Manage and participate in your communities. View community activities, access shared resources, and collaborate with members.',
        list: [
            {
                title: 'Create Community', 
                onClick: ()=>navigate(routes.susu().nested().newCommunity()), 
                icon: LuGroup,
                description: 'Initiate the process of establishing a new community, including setting up its name, purpose, and initial settings.'
            },{
                title: 'Communities', 
                onClick: ()=>navigate(routes.susu().nested().communities()), 
                icon: FaLayerGroup,
                description: 'View and explore all available communities, including public and private groups that you can join or interact with.'
            },{
                title: 'My Communities', 
                onClick: ()=>navigate(routes.susu().nested().associateCommunities()), 
                icon: FaObjectUngroup,
                description: 'Access a list of communities you are a member of or actively involved in, providing quick access to your personal groups.'
            },{
                title: 'Contribution History', 
                disabled: true, 
                icon: GiTakeMyMoney,
                description: 'Review a detailed record of your past contributions, including activities, posts, and engagements within various communities.'
            },
        ],
    }
    const profile = {
        title: 'Profile',
        description: 'View and edit your personal information. Update your contact details, profile picture, and other settings related to your account.',
        list: [
            {
                title: 'Account', 
                onClick: ()=>navigate(routes.susu().nested().profile()), 
                icon: BiSolidUserAccount,
                description: 'Access and manage your personal account details, including your profile information and account status.'
            },{
                title: 'Members', 
                onClick: ()=>navigate(routes.susu().nested().memberList()), 
                icon: FaUsers,
                description: 'View and manage members within a community or group, including adding, removing, or updating member information.'
            },{
                title: 'Account Settings', 
                disabled: true, 
                icon: RiUserSettingsFill,
                description: 'Customize and adjust your account settings, such as login credentials, email preferences, and other personal configurations.'
            },{
                title: 'Privacy Settings', 
                disabled: true, 
                icon: MdPrivacyTip,
                description: 'Configure your privacy preferences to control who can see your information and how your data is handled.'
            },{
                title: 'Notification Preferences', 
                disabled: true, 
                icon: IoMdNotifications,
                description: 'Set your preferences for receiving notifications, including frequency, channels, and types of updates you wish to receive.'
            },{
                title: 'Financial Management', 
                disabled: true, 
                icon: GrMoney,
                description: 'Manage financial aspects related to your account, including payment methods, billing information, and transaction history.'
            },
        ],
    }
    const contributionManagement = {
        title: 'Contribution Management',
        description: 'Track and manage your contributions. Review your recent activities, update records, and manage submissions.',
        list: [
            //need to navigate to a page that may have a list of communities and you choose to then navigate to see a list of contibutions
            // the others may fallow that same structure.
            {
                title: 'Make Contributions', 
                disabled: true, 
                icon: GiPayMoney,
                description: 'Initiate and submit your contributions, such as donations or payments, to support a cause, project, or community.'
            },{
                title: 'View Contributions', 
                disabled: true, 
                icon: HiClipboardDocumentList,
                description: 'Access and review a list of your past contributions, including details on each contribution and its impact.'
            },{
                title: 'Financial Reports', 
                disabled: true, 
                icon: IoDocumentText,
                description: 'Generate and view detailed financial reports, including income, expenses, and other financial summaries related to your account or community.'
            },{
                title: 'Community Financial Summary', 
                disabled: true, 
                icon: FaMoneyCheck,
                description: 'Review an overview of the financial status of a community, including total contributions, expenditures, and current balance.'
            },{
                title: 'Member Contribution History', 
                disabled: true, 
                icon: MdHistory,
                description: 'View the contribution history of individual members, including their past activities, donations, or payments.'
            },{
                title: 'Communication and Interaction', 
                disabled: true, 
                icon: AiFillInteraction,
                description: 'Access tools and features for interacting with other members or communities, including messaging, discussion forums, and announcements.'
            },
        ],
    }
    const messaging ={
        title: 'Messaging/Chat',
        description: 'Send and receive messages. Communicate with team members, communities, or other contacts within the platform.',
        list: [
            {
                title: 'Chats', 
                onClick: ()=>navigate(routes.susu().nested().messangers()), 
                icon: IoChatbubbles,
                description: 'Access your direct messages and ongoing chat conversations with other members or support representatives.'
            },{
                title: 'Notifications', 
                disabled: true, 
                icon: IoMdNotifications,
                description: 'View and manage notifications about updates, alerts, or activities related to your account or community.'
            },{
                title: 'Community Forum', 
                disabled: true, 
                icon: FaForumbee,
                description: 'Participate in discussions, ask questions, and engage with other members in the community forum.'
            },{
                title: 'Support and Help', 
                disabled: true, 
                icon: IoHelpCircleOutline,
                description: 'Access resources and get assistance with any issues or questions you may have, including FAQs, contact support, and troubleshooting guides.'
            },
        ],
    }
    const help ={
        title: 'Help/Support',
        description: 'Access support resources and find answers to your questions. Browse FAQs, contact support, or get guidance on using the platform.',
        list: [
            {
                title: 'FAQ', 
                disabled: true, 
                icon: FaQuora,
                description: 'Access frequently asked questions to find answers and solutions to common queries and issues.'
            },{
                title: 'Contact Support', 
                disabled: true, 
                icon: TiContacts,
                description: 'Reach out to customer support for personalized assistance with any problems or inquiries you may have.'
            },{
                title: 'Information and Management', 
                disabled: true, 
                icon: MdMedicalInformation,
                description: 'View and manage general information related to your account or community, including administrative and organizational details.'
            },
        ],
    }
    const onboarding = {
        title: 'Onboarding',
        description: 'Get started with our platform. Follow step-by-step instructions and tutorials designed to help you become familiar with key features.',
        list: [
            {
                title: 'Share', 
                onClick: ()=>utils.share.url('', 'Susu Application'), 
                icon: IoShareSocial,
                description: 'Share content or information with others through various channels such as social media, email, or messaging.'
            },{
                title: 'App Settings', 
                disabled: true, 
                icon: IoSettings,
                description: 'Customize and adjust settings specific to the app, including preferences, features, and display options.'
            },{
                title: 'Legal/Compliance', 
                disabled: true, 
                icon: GrCompliance,
                description: 'Access information related to legal and compliance matters, including terms of service, privacy policies, and regulatory information.'
            },{
                title: 'Logout/Exit', 
                onClick: ()=>signOut(), 
                icon: GiExitDoor,
                description: 'Sign out of your account or exit the application, ensuring that your session is securely closed.'
            },
        ]
    }
    const settings = {
        title: 'Setting',
        description: 'Customize your preferences and configure your account. Adjust notification settings, privacy options, and other preferences.',
        list: [
            {
                title: 'Appearance', 
                disabled: true, 
                icon: MdStyle,
                description: 'Customize the visual style and layout of the app or website, including themes, colors, fonts, and display settings to suit your preferences.'
            },
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