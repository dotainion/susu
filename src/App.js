import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./themes/theme.css"

import { routes } from "./routes/Routes";
import { SusuRouter } from "./routes/SusuRouter";
import { Onboarding } from "./pages/Onboarding";
import { Signin } from "./pages/Signin";
import { Register } from "./pages/Register";
import { AuthProvider } from "./provider/AuthProvider";

//https://fastsusu.com/

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path={routes.signIn()} element={<Signin/>} />
          <Route path={routes.register()} element={<Register/>} />
          <Route path={routes.onboarding()} element={<Onboarding/>} />
          <Route path={routes.default()} element={<Navigate to={routes.onboarding()}/>} />
          <Route path={routes.susu().default()} element={<SusuRouter/>} />
        </Routes>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
