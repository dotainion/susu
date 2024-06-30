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

//https://fastsusu.com/

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Onboarding/>} />
          <Route path="/groups" element={<GroupList/>} />
          <Route path="/group" element={<Group/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/new/group" element={<NewGroup/>} />
          <Route path="/members" element={<MembersList/>} />
          <Route path="/member" element={<Member/>} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
