import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AppBarResponsive from "./components/AppBarResponsive";
import { AuthContext } from "./context/authContext/AuthContext";
import "./index.css";
import useCheckAuthenticationViewController from "./pages/authentication/checkAuthentication/useCheckAuthenticationViewController";
import SignInScreen from "./pages/authentication/signIn/SignInScreen";
import SignUpScreen from "./pages/authentication/signUp/SignUpScreen";
import ConferenceScreen from "./pages/home/conferences/ConferenceScreen";
import DashboardScreen from "./pages/home/dashboard/DashboardScreen";
import EventScreen from "./pages/home/events/EventScreen";
import LocationScreen from "./pages/home/locations/LocationScreen";
import PersonsScreen from "./pages/home/persons/PersonsScreen";
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
            <Route path="/conferences" element={<ConferenceScreen />} />
            <Route path="/persons" element={<PersonsScreen />} />
            <Route path="/locations" element={<LocationScreen />} />
            <Route path="/sponsors" element={<SponsorScreen />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
