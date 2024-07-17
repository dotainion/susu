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
      </Routes>
    </Layout>
  )
}