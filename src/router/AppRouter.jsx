import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Dashboard from "../pages/Dashboard";
import Somos from "../pages/Somos";
import Usuarios from "../pages/Usuarios";
import UserGenerate from "../pages/userGenerate";
import PrivateRoute from "../router/PrivateRoute"; 
import Layout from "../layouts/Layout";
import UsuarioEdit from "../pages/UsuarioEdit";
import GenerarEvento from "../pages/GenerarEvento";
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<PrivateRoute rolesPermitidos={["ADMIN", "RECEPCIONISTA", "COACH", "ALUMNO"]} />}>
            <Route path="/Dashboard" element={<Layout title="Eventos"><Dashboard /></Layout>} />
            <Route path="/Somos" element={<Layout title="¿Quienes Somos?"><Somos /></Layout>} />
            <Route path="/Usuarios" element={<Layout title="Usuarios"><Usuarios /></Layout>} />  
        </Route>
        <Route element={<PrivateRoute rolesPermitidos={["ADMIN", "RECEPCIONISTA"]} />}>
            <Route path="/Usuarios" element={<Layout title="Usuarios"><Usuarios /></Layout>} />  
            <Route path="/UserGenerate" element={<Layout title="Crear Usuario"><UserGenerate /></Layout>} />
            <Route path="/UsuarioEdit/:userId" element={<Layout title="Editar Usuario"><UsuarioEdit /></Layout>} />
        </Route>
        <Route element={<PrivateRoute rolesPermitidos={["COACH"]} />}>
          
            <Route path="/GenerarEvento" element={<Layout title="Generar Evento"><GenerarEvento /></Layout>} />  
            <Route path="/GenerarEvento/:id" element={<Layout title="Editar Evento"><GenerarEvento /></Layout>} />

        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;