import { Navigate, Route, Routes } from "react-router-dom";

import { GroupList } from "../pages/GroupList";
import { Layout } from "../layout/Layout";
import { Group } from "../pages/Group";
import { Profile } from "../pages/Profile";
import { NewGroup } from "../pages/NewGroup";
import { MembersList } from "../pages/MembersList";
import { Member } from "../pages/Member";
import { routes } from "../routes/Routes";
import { ViewGroup } from "../pages/ViewGroup";
import { useAuth } from "../provider/AuthProvider";
import { Welcome } from "../pages/Welcome";
import { GroupSusuWallet } from "../pages/GroupSusuWallet";
import { UpdateMemberSusuWallet } from "../pages/UpdateMemberSusuWallet";
import { Schedule } from "../pages/Schedule";
import { MemberSusuHistory } from "../pages/MemberSusuHistory";
import { GroupMembers } from "../pages/GroupMembers";
import { SusuMembers } from "../pages/SusuMembers";
import { OwnerGroupList } from "../pages/OwnerGroupList";
import { Dashboard } from "../pages/Dashboard";
import { MemberMessages } from "../pages/MemberMessages";
import { Messages } from "../pages/Messages";
import { GroupMessages } from "../pages/GroupMessages";

export const SusuRouter = () =>{
  const { isAuthenticated } = useAuth();

  if(!isAuthenticated){
    return <Navigate to={routes.onboarding()}/>;
  }
  return(
    <Layout>
      <Routes>
        <Route path={routes.susu().groupList()} element={<GroupList/>} />
        <Route path={routes.susu().group()} element={<Group/>} />
        <Route path={routes.susu().viewGroup()} element={<ViewGroup/>} />
        <Route path={routes.susu().profile()} element={<Profile/>} />
        <Route path={routes.susu().newGroup()} element={<NewGroup/>} />
        <Route path={routes.susu().memberList()} element={<MembersList/>} />
        <Route path={routes.susu().member()} element={<Member/>} />
        <Route path={routes.susu().groupSusuWallet()} element={<GroupSusuWallet/>} />
        <Route path={routes.susu().schedule()} element={<Schedule/>} />
        <Route path={routes.susu().updateMemberSusuWallet()} element={<UpdateMemberSusuWallet/>} />
        <Route path={routes.susu().memberSusuHistory()} element={<MemberSusuHistory/>} />
        <Route path={routes.susu().groupMembers()} element={<GroupMembers/>} />
        <Route path={routes.susu().susuMembers()} element={<SusuMembers/>} />
        <Route path={routes.susu().ownerGroups()} element={<OwnerGroupList/>} />
        <Route path={routes.susu().dashboard()} element={<Dashboard/>} />
        <Route path={routes.susu().memberMessages()} element={<MemberMessages/>} />
        <Route path={routes.susu().messages()} element={<Messages/>} />
        <Route path={routes.susu().groupMessages()} element={<GroupMessages/>} />
        <Route path={'*'} element={<Welcome/>} />
      </Routes>
    </Layout>
  )
}