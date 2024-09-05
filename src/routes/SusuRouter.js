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
import { CommunitySusuWallet } from "../pages/CommunitySusuWallet";
import { UpdateMemberSusuWallet } from "../pages/UpdateMemberSusuWallet";
import { Schedule } from "../pages/Schedule";
import { MemberSusuHistory } from "../pages/MemberSusuHistory";
import { CommunityMembers } from "../pages/CommunityMembers";
import { SusuMembers } from "../pages/SusuMembers";
import { AssociateCommunities } from "../pages/AssociateCommunities";
import { Dashboard } from "../pages/Dashboard";
import { Messangers } from "../pages/Messangers";
import { Messages } from "../pages/Messages";
import { CommunityMessages } from "../pages/CommunityMessages";
import { CommunityMembersInvite } from "../pages/CommunityMembersInvite";
import { SusuMembersInvite } from "../pages/SusuMembersInvite";
import { ContributionRefund } from "../pages/ContributionRefund";
import { AssignSchedule } from "../pages/AssignSchedule";
import { NavRouter } from "./NavRouter";

export const SusuRouter = () =>{
  const { isAuthenticated } = useAuth();

  if(!isAuthenticated){
    return <Navigate to={routes.onboarding()}/>;
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
        <Route path={routes.susu().communitySusuWallet()} element={<CommunitySusuWallet/>} />
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
        <Route path={routes.susu().communityInvites()} element={<CommunityMembersInvite/>} />
        <Route path={routes.susu().susuInvites()} element={<SusuMembersInvite/>} />
        <Route path={routes.susu().refund()} element={<ContributionRefund/>} />
        <Route path={routes.susu().assignSchedule()} element={<AssignSchedule/>} />
        <Route path={'*'} element={<Navigate to={routes.nav().nested().main()}/>} />
      </Routes>
    </Layout>
  )
}