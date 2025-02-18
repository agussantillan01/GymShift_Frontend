import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Dashboard from "../pages/Dashboard";
import Somos from "../pages/Somos";
import UserGenerate from "../pages/userGenerate";
import PrivateRoute from "../router/PrivateRoute"; 
import Layout from "../layouts/Layout"


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<PrivateRoute rolesPermitidos={["ADMIN", "SECRET", "PROFE", "ALUMNO"]} />}>
            <Route path="/Dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/Somos" element={<Layout><Somos /></Layout>} />
        </Route>
        <Route element={<PrivateRoute rolesPermitidos={["ADMIN", "SECRET"]} />}>
            <Route path="/UserGenerate" element={<Layout><UserGenerate /></Layout>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
