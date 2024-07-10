import { HashRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./themes/theme.css"

import { Onboarding } from "./pages/Onboarding";
import { GroupList } from "./pages/GroupList";
import { Layout } from "./layout/Layout";
import { Group } from "./pages/Group";
import { Profile } from "./pages/Profile";
import { NewGroup } from "./pages/NewGroup";
import { MembersList } from "./pages/MembersList";
import { Member } from "./pages/Member";
import { routes } from "./routes/Routes";
import { ViewGroup } from "./pages/ViewGroup";

//https://fastsusu.com/

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path={routes.onboarding()} element={<Onboarding/>} />
          <Route path={routes.groupList()} element={<GroupList/>} />
          <Route path={routes.group()} element={<Group/>} />
          <Route path={routes.viewGroup()} element={<ViewGroup/>} />
          <Route path={routes.profile()} element={<Profile/>} />
          <Route path={routes.newGroup()} element={<NewGroup/>} />
          <Route path={routes.memberList()} element={<MembersList/>} />
          <Route path={routes.member()} element={<Member/>} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
