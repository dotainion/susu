import { Navigate, Route, Routes } from "react-router-dom"
import { SidebarProvider } from "../layout/SidebarProvider"
import { routes } from "./Routes"
import { DashboardAndOverview } from "../layout/navigator/DashboardAndOverview"
import { Communities } from "../layout/navigator/Communities"
import { Profile } from "../layout/navigator/Profile"
import { Messaging } from "../layout/navigator/Messaging"
import { Help } from "../layout/navigator/Help"
import { Onboarding } from "../layout/navigator/Onboarding"
import { Settings } from "../layout/navigator/Settings"
import { ContributionManagement } from "../layout/navigator/ContributionManagement"
import { NavMain } from "../layout/navigator/NavMain"
import { useAuth } from "../provider/AuthProvider"

export const NavRouter = () =>{
    const { isAuthenticated } = useAuth();
  
    if(!isAuthenticated){
      return <Navigate to={routes.onboarding()}/>;
    }

    return(
        <SidebarProvider>
            <Routes>
                <Route path={routes.nav().dashboardAndOverview()} element={<DashboardAndOverview/>} />
                <Route path={routes.nav().communities()} element={<Communities/>} />
                <Route path={routes.nav().profile()} element={<Profile/>} />
                <Route path={routes.nav().contributionManagement()} element={<ContributionManagement/>} />
                <Route path={routes.nav().messaging()} element={<Messaging/>} />
                <Route path={routes.nav().help()} element={<Help/>} />
                <Route path={routes.nav().onboarding()} element={<Onboarding/>} />
                <Route path={routes.nav().settings()} element={<Settings/>} />
                <Route path={routes.nav().main()} element={<NavMain/>} />
                <Route path={'*'} element={<Navigate to={routes.nav().main()}/>} />
            </Routes>
        </SidebarProvider>
    )
}