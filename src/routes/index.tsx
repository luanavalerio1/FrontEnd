import { Routes, Route } from "react-router-dom";
import {
  AdmPlanetaPage,
  AdmPlanetaStorePage,
  CadastrarPage,
  HomePage,
  LayoutPage,
  LoginPage
} from "pages";
import ProtectedRoute from "./ProtectedRoute";
const Rotas = () => {
  return (
    <Routes>
      <Route element={<LayoutPage />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/cadastrar" element={<CadastrarPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/adm" element={<ProtectedRoute />}>
          <Route path="message" element={<AdmPlanetaPage />} />
          <Route path="message/:id" element={<AdmPlanetaStorePage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Rotas;