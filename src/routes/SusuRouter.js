import { Navigate, Route, Routes } from "react-router-dom";

import { Communities } from "../pages/Communities";
import { Layout } from "../layout/Layout";
import { Community } from "../pages/Community";
import { Profile } from "../pages/Profile";
import { NewCommunity } from "../pages/NewCommunity";
import { MembersList } from "../pages/MembersList";
import { Member } from "../pages/Member";
import { routes } from "../routes/Routes";
import { ViewCommunity } from "../pages/ViewCommunity";
import { useAuth } from "../provider/AuthProvider";
import { Contributors } from "../pages/Contributors";
import { UpdateMemberSusuWallet } from "../pages/UpdateMemberSusuWallet";
import { Schedule } from "../pages/Schedule";
import { MemberSusuHistory } from "../pages/MemberSusuHistory";
import { CommunityMembers } from "../pages/CommunityMembers";
import { SusuMembers } from "../pages/SusuMembers";
import { AssociateCommunities } from "../pages/AssociateCommunities";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { Messangers } from "../pages/Messangers";
import { Messages } from "../pages/Messages";
import { CommunityMessages } from "../pages/CommunityMessages";
import { ContributionRefund } from "../pages/ContributionRefund";
import { AssignSchedule } from "../pages/AssignSchedule";
import { NavRouter } from "./NavRouter";
import { Susu } from "../pages/Susu";
import { Payments } from "../pages/Payments";
import { PaymentSuccess } from "../pages/PaymentSuccess";
import { PaymentRefund } from "../pages/PaymentRefund";

export const SusuRouter = () =>{
  const { isAuthenticated } = useAuth();

  if(!isAuthenticated){
    return <Navigate to={routes.landing()}/>;
  }

  return(
    <Layout>
      <Routes>
        <Route path={routes.susu().communities()} element={<Communities/>} />
        <Route path={routes.susu().community()} element={<Community/>} />
        <Route path={routes.susu().viewCommunity()} element={<ViewCommunity/>} />
        <Route path={routes.susu().profile()} element={<Profile/>} />
        <Route path={routes.susu().newCommunity()} element={<NewCommunity/>} />
        <Route path={routes.susu().memberList()} element={<MembersList/>} />
        <Route path={routes.susu().member()} element={<Member/>} />
        <Route path={routes.susu().contributors()} element={<Contributors/>} />
        <Route path={routes.susu().schedule()} element={<Schedule/>} />
        <Route path={routes.susu().updateMemberSusuWallet()} element={<UpdateMemberSusuWallet/>} />
        <Route path={routes.susu().memberSusuHistory()} element={<MemberSusuHistory/>} />
        <Route path={routes.susu().communityMembers()} element={<CommunityMembers/>} />
        <Route path={routes.susu().susuMembers()} element={<SusuMembers/>} />
        <Route path={routes.susu().associateCommunities()} element={<AssociateCommunities/>} />
        <Route path={routes.susu().dashboard()} element={<Dashboard/>} />
        <Route path={routes.susu().messangers()} element={<Messangers/>} />
        <Route path={routes.susu().messages()} element={<Messages/>} />
        <Route path={routes.susu().communityMessages()} element={<CommunityMessages/>} />
        <Route path={routes.susu().refund()} element={<ContributionRefund/>} />
        <Route path={routes.susu().cardRefund()} element={<PaymentRefund/>} />
        <Route path={routes.susu().assignSchedule()} element={<AssignSchedule/>} />
        <Route path={routes.susu().susu()} element={<Susu/>} />
        <Route path={routes.susu().payment()} element={<Payments/>} />
        <Route path={routes.susu().receipt()} element={<PaymentSuccess/>} />
        <Route path={'*'} element={<Navigate to={routes.nav().nested().main()}/>} />
      </Routes>
    </Layout>
  )
}