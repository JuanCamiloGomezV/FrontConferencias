import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthContext } from "./context/authContext/AuthContext";
import "./index.css";
import SignUpScreen from "./pages/authentication/signUp/SignUpScreen";
import CheckAuthenticationScreen from "./pages/authentication/checkAuthentication/CheckAuthenticationScreen";
import DashboardScreen from "./pages/home/dashboard/DashboardScreen";
import SignInScreen from "./pages/authentication/signIn/SignInScreen";
import AppBarResponsive from "./components/AppBarResponsive";
import EventScreen from "./pages/home/events/EventScreen";
import useCheckAuthenticationViewController from "./pages/authentication/checkAuthentication/useCheckAuthenticationViewController";
import PersonsScreen from "./pages/home/persons/PersonsScreen";
import LocationScreen from "./pages/home/locations/LocationScreen";
import SponsorScreen from "./pages/home/sponsors/SponsorScreen";

function App() {
  const {
    authState: { status },
  } = useContext(AuthContext);

  useCheckAuthenticationViewController();

  return (
    <BrowserRouter>
      {status === "authenticated" && <AppBarResponsive />}
      <Routes>
        {status === "not-authenticated" ? (
          <>
            <Route path="/" element={<SignInScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
          </>
        ) : (
          <>
            <Route path="/" element={<DashboardScreen />} />
            <Route path="/events" element={<EventScreen />} />
            <Route path="/persons" element={<PersonsScreen />} />
            {/* <Route path="/locations" element={<LocationScreen />} /> */}
            <Route path="/sponsors" element={<SponsorScreen />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
