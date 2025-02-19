import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Dashboard from "../pages/Dashboard";
import Somos from "../pages/Somos";
import Usuarios from "../pages/Usuarios";
import UserGenerate from "../pages/userGenerate";
import PrivateRoute from "../router/PrivateRoute"; 
import Layout from "../layouts/Layout";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<PrivateRoute rolesPermitidos={["ADMIN", "SECRET", "PROFE", "ALUMNO"]} />}>
            <Route path="/Dashboard" element={<Layout title="Eventos"><Dashboard /></Layout>} />
            <Route path="/Somos" element={<Layout title="¿Quienes Somos?"><Somos /></Layout>} />
        </Route>
        <Route element={<PrivateRoute rolesPermitidos={["ADMIN", "SECRET"]} />}>
            <Route path="/Usuarios" element={<Layout title="Usuarios"><Usuarios /></Layout>} />  
            <Route path="/UserGenerate" element={<Layout title="Crear Usuario"><UserGenerate /></Layout>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;