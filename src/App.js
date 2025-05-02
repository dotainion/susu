import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./routes/Routes";
import { SusuRouter } from "./routes/SusuRouter";
import { Signin } from "./pages/Signin";
import { Register } from "./pages/Register";
import { AuthProvider } from "./provider/AuthProvider";
import { Test } from "./test/Test";
import { Invited } from "./pages/Invited";
import { NavRouter } from "./routes/NavRouter";
import { Home } from "./pages/landing/Home";
import { AboutUs } from "./pages/landing/AboutUs";
import { ReasonForUs } from "./pages/landing/ReasonForUs";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./themes/theme.css";
import "./themes/index.css";
import { FAQ } from "./pages/landing/FAQ";
import { ContactUs } from "./pages/landing/ContactUs";

//https://fastsusu.com/

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path={routes.signIn()} element={<Signin/>} />
          <Route path={routes.register()} element={<Register/>} />
          <Route path={routes.landing()} element={<Home/>} />
          <Route path={routes.about()} element={<AboutUs/>} />
          <Route path={routes.reason()} element={<ReasonForUs/>} />
          <Route path={routes.contact()} element={<ContactUs/>} />
          <Route path={routes.faq()} element={<FAQ/>} />
          <Route path={routes.invited()} element={<Invited/>} />
          <Route path={routes.default()} element={<Navigate to={routes.landing()}/>} />
          <Route path={routes.susu().default()} element={<SusuRouter/>} />
          <Route path={routes.nav().default()} element={<NavRouter/>} />
          <Route path={'/test/:communityId'} element={<Test/>} />
        </Routes>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
