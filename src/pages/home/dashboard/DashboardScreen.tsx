import { Button } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext/AuthContext";
import useDashboardViewModel from "./useDashboardViewModel";

const DashboardScreen = () => {
  const { signOut } = useContext(AuthContext);
  useDashboardViewModel();
  return (
    <div>
      <Button variant="outlined" className="text-primary" onClick={signOut}>
        Cerrar sesión
      </Button>
    </div>
  );
};

export default DashboardScreen;
