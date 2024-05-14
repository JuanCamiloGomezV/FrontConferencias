import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthContext } from "./context/authContext/AuthContext";
import "./index.css";
import SignUpScreen from "./pages/authentication/signUp/SignUpScreen";
import SignInScreen from "./pages/authentication/signIn/SignInScreen";
import AppBarResponsive from "./components/AppBarResponsive";
import EventScreen from "./pages/home/events/EventScreen";
import useCheckAuthenticationViewController from "./pages/authentication/checkAuthentication/useCheckAuthenticationViewController";
import SponsorScreen from "./pages/home/sponsors/SponsorScreen";
import LocationScreen from "./pages/home/locations/LocationScreen";

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
            <Route path="/" element={<EventScreen />} />
            <Route path="/sponsors" element={<SponsorScreen />} />
            <Route path="/locations" element={<LocationScreen />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
