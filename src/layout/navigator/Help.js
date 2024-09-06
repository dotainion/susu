import { useNavigate } from "react-router-dom";
import { NavGrid } from "../../components/NavGrid";
import { routes } from "../../routes/Routes";
import { GiPayMoney } from "react-icons/gi";
import { GrSchedules } from "react-icons/gr";
import { MdDashboard, MdManageAccounts } from "react-icons/md";
import { useSidebar } from "../SidebarProvider";
import { NavToMain } from "./NavToMain";

export const Help = () =>{
    const { help } = useSidebar();

    return(
        <div>
            <NavToMain/>
            <NavGrid nav={help}/>
        </div>
    )
}