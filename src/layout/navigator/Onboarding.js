import { useNavigate } from "react-router-dom";
import { NavGrid } from "../../components/NavGrid";
import { routes } from "../../routes/Routes";
import { GiPayMoney } from "react-icons/gi";
import { GrSchedules } from "react-icons/gr";
import { MdDashboard, MdManageAccounts } from "react-icons/md";
import { useSidebar } from "../SidebarProvider";
import { NavToMain } from "./NavToMain";
import { Page } from "../../animation/Page";

export const Onboarding = () =>{
    const { onboarding } = useSidebar();

    return(
        <Page>
            <NavToMain/>
            <NavGrid nav={onboarding}/>
        </Page>
    )
}